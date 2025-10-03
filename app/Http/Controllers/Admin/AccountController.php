<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AccountController extends Controller
{
    /** List with search/filters/pagination */
    public function index(Request $request)
    {
        $perPage = (int) $request->get('perPage', 15);
        $search  = trim((string) $request->get('search', ''));
        $type    = $request->get('account_type');
        $status  = $request->get('status');

        $accounts = Account::with(['customer.user'])
            ->when($search !== '', function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('account_number', 'like', "%{$search}%")
                       ->orWhereHas('customer', function ($qc) use ($search) {
                           $qc->where('first_name', 'like', "%{$search}%")
                              ->orWhere('last_name', 'like', "%{$search}%")
                              ->orWhereHas('user', function ($qu) use ($search) {
                                  $qu->where('username', 'like', "%{$search}%");
                              });
                       });
                });
            })
            ->when($type, fn ($q) => $q->where('account_type', $type))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderByDesc('id')
            ->paginate($perPage)
            ->appends($request->all());

            dd($accounts->toArray());

        return Inertia::render('Admin/Account/Index', [
            'accounts' => $accounts,
            'filters'  => [
                'search'       => $search,
                'account_type' => $type,
                'status'       => $status,
                'perPage'      => $perPage,
            ],
            'accountTypes' => ['savings', 'current'],
            'statuses'     => ['active', 'inactive'],
        ]);
    }

    /** CSV export honoring current filters */
    public function export(Request $request): StreamedResponse
    {
        $search = trim((string) $request->get('search', ''));
        $type   = $request->get('account_type');
        $status = $request->get('status');

        $query = Account::with(['customer.user'])
            ->when($search !== '', function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('account_number', 'like', "%{$search}%")
                       ->orWhereHas('customer', function ($qc) use ($search) {
                           $qc->where('first_name', 'like', "%{$search}%")
                              ->orWhere('last_name', 'like', "%{$search}%")
                              ->orWhereHas('user', function ($qu) use ($search) {
                                  $qu->where('username', 'like', "%{$search}%");
                              });
                       });
                });
            })
            ->when($type, fn ($q) => $q->where('account_type', $type))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderByDesc('id');

        $filename = 'accounts_' . now()->format('Ymd_His') . '.csv';

        return response()->streamDownload(function () use ($query) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['Account #', 'Type', 'Initial Deposit', 'Balance', 'Status', 'Customer', 'Username', 'Created At']);

            $query->chunk(200, function ($chunk) use ($out) {
                foreach ($chunk as $a) {
                    $cust  = $a->customer;
                    $usern = $cust?->user?->username;
                    fputcsv($out, [
                        $a->account_number,
                        $a->account_type,
                        $a->initial_deposit,
                        $a->balance,
                        $a->status,
                        trim(($cust->first_name ?? '') . ' ' . ($cust->last_name ?? '')),
                        $usern,
                        optional($a->created_at)->toDateTimeString(),
                    ]);
                }
            });

            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv']);
    }

    /** Create page (supplies customers list) */
    public function create()
    {
        $customers = Customer::with('user')
            ->orderBy('last_name')
            ->get()
            ->map(fn ($c) => [
                'id'    => $c->id,
                'label' => trim("{$c->first_name} {$c->last_name}") . ' (' . ($c->user->username ?? '') . ')',
            ]);

        return Inertia::render('Admin/Account/Create', [
            'customers'    => $customers,
            'accountTypes' => ['savings', 'current'],
        ]);
    }

    /** Store new account */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id'     => ['required', 'exists:customers,id'],
            'account_number'  => ['nullable', 'string', 'max:100', 'unique:accounts,account_number'],
            'account_type'    => ['required', Rule::in(['savings', 'current'])],
            'initial_deposit' => ['required', 'numeric', 'min:0'],
            'balance'         => ['nullable', 'numeric', 'min:0'],
            'status'          => ['nullable', Rule::in(['active', 'inactive'])],
        ]);

        DB::transaction(function () use ($validated) {
            $accountNumber = $validated['account_number'] ?? ('ACCT-' . strtoupper(uniqid()));
            Account::create([
                'customer_id'     => $validated['customer_id'],
                'account_number'  => $accountNumber,
                'account_type'    => $validated['account_type'],
                'initial_deposit' => $validated['initial_deposit'],
                'balance'         => $validated['balance'] ?? $validated['initial_deposit'],
                'status'          => $validated['status'] ?? 'active',
            ]);
        });

        return redirect()->route('admin.accounts.index')->with('success', 'Account created successfully.');
    }

    /** Edit page */
    public function edit($id)
    {
        $account = Account::with(['customer.user'])->findOrFail($id);

        return Inertia::render('Admin/Account/Edit', [
            'account'      => $account,
            'accountTypes' => ['savings', 'current'],
        ]);
    }

    /** Update account */
    public function update(Request $request, $id)
    {
        $account = Account::findOrFail($id);

        $validated = $request->validate([
            'customer_id'     => ['required', 'exists:customers,id'], // usually unchanged, but validated
            'account_number'  => ['required', 'string', 'max:100', Rule::unique('accounts', 'account_number')->ignore($account->id)],
            'account_type'    => ['required', Rule::in(['savings', 'current'])],
            'initial_deposit' => ['required', 'numeric', 'min:0'],
            'balance'         => ['required', 'numeric', 'min:0'],
            'status'          => ['required', Rule::in(['active', 'inactive'])],
        ]);

        DB::transaction(function () use ($account, $validated) {
            $account->update([
                'customer_id'     => $validated['customer_id'],
                'account_number'  => $validated['account_number'],
                'account_type'    => $validated['account_type'],
                'initial_deposit' => $validated['initial_deposit'],
                'balance'         => $validated['balance'],
                'status'          => $validated['status'],
            ]);
        });

        return redirect()->route('admin.accounts.index')->with('success', 'Account updated successfully.');
    }

    /** Delete account */
    public function destroy($id)
    {
        $account = Account::findOrFail($id);
        $account->delete();

        return redirect()->back()->with('success', 'Account deleted successfully.');
    }
}
