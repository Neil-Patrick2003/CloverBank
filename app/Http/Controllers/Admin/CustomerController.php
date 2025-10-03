<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Customer;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->get('perPage', 15);
        $sort    = strtolower($request->get('sort', 'asc')) === 'desc' ? 'desc' : 'asc';
        $search  = trim($request->get('search', ''));
        $status  = $request->get('status');

        $users = User::with(['customer', 'customer.accounts'])
            ->where('role', 'customer')
            ->when($status, fn ($q) => $q->where('status', $status))
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                })->orWhereHas('customer', function ($qq) use ($search) {
                    $qq->where('first_name', 'like', "%{$search}%")
                       ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', $sort)
            ->paginate($perPage)
            ->appends($request->all());

        return Inertia::render('Admin/Customer/Index', [
            'users'   => $users,
            'filters' => [
                'perPage' => $perPage,
                'sort'    => $sort,
                'search'  => $search,
                'status'  => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Customer/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Customer
            'first_name'        => ['required', 'string', 'max:100'],
            'last_name'         => ['required', 'string', 'max:100'],
            'date_of_birth'     => ['required', 'date', 'before:today'],
            'gender'            => ['required', Rule::in(['male','female','other'])],
            'address'           => ['required', 'string', 'max:255'],
            'occupation'        => ['nullable', 'string', 'max:100'],
            'income_source'     => ['nullable', 'string', 'max:100'],

            // User
            'email'             => ['required', 'email', 'unique:users,email'],
            'phone_number'      => ['required', 'regex:/^[0-9]{10,15}$/', 'unique:users,phone_number'],
            'username'          => ['required', 'string', 'min:4', 'max:50', 'unique:users,username'],
            'password'          => ['required', 'string', 'min:8', 'confirmed'],
            'status'            => ['nullable', Rule::in(['inactive','active'])],

            // Account
            'account_type'      => ['required', Rule::in(['savings','current'])],
            'initial_deposit'   => ['required', 'numeric', 'min:100'],
        ]);

        // inside store()
        DB::transaction(function () use ($validated) {
            $user = User::create([
                'email'        => $validated['email'],
                'phone_number' => $validated['phone_number'],
                'username'     => $validated['username'],
                'role'         => 'customer',
                'status'       => $validated['status'] ?? 'inactive',
                'password'     => bcrypt($validated['password']),
            ]);

            $customer = Customer::create([
                'user_id'       => $user->id,
                'first_name'    => $validated['first_name'],
                'last_name'     => $validated['last_name'],
                'date_of_birth' => $validated['date_of_birth'],
                'gender'        => $validated['gender'],
                'address'       => $validated['address'],
                'occupation'    => $validated['occupation'] ?? null,
                'source_of_funds' => $validated['income_source'] ?? null,
            ]);

            Account::create([
                'customer_id'     => $customer->id,
                'account_number'  => 'ACCT-' . strtoupper(uniqid()), // generate unique number
                'account_type'    => $validated['account_type'],
                'initial_deposit' => $validated['initial_deposit'],
                'balance'         => $validated['initial_deposit'],
                'status'          => 'active',
            ]);
        });


        return redirect()->route('admin.customers.index')->with('success', 'Customer created successfully.');
    }

    public function edit($id)
    {
        $user = User::with(['customer', 'customer.accounts'])->findOrFail($id);

        return Inertia::render('Admin/Customer/Edit', [
            'user' => [
                'id'           => $user->id,
                'email'        => $user->email,
                'phone_number' => $user->phone_number,
                'username'     => $user->username,
                'status'       => $user->status,
                'customer'     => $user->customer,
                'account'      => $user->account,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::with(['customer', 'customer.accounts'])->findOrFail($id);

        $validated = $request->validate([
            'first_name'        => ['required', 'string', 'max:100'],
            'last_name'         => ['required', 'string', 'max:100'],
            'date_of_birth'     => ['required', 'date', 'before:today'],
            'gender'            => ['required', Rule::in(['male','female','other'])],
            'address'           => ['required', 'string', 'max:255'],
            'occupation'        => ['nullable', 'string', 'max:100'],
            'income_source'     => ['nullable', 'string', 'max:100'],

            'email'             => ['required', 'email', Rule::unique('users','email')->ignore($user->id)],
            'phone_number'      => ['required', 'regex:/^[0-9]{10,15}$/', Rule::unique('users','phone_number')->ignore($user->id)],
            'username'          => ['required', 'string', 'min:4', 'max:50', Rule::unique('users','username')->ignore($user->id)],
            'password'          => ['nullable', 'string', 'min:8', 'confirmed'],
            'status'            => ['nullable', Rule::in(['inactive','active'])],

            'account_type'      => ['required', Rule::in(['savings','current'])],
            'initial_deposit'   => ['required', 'numeric', 'min:0'],
        ]);

        DB::transaction(function () use ($user, $validated) {
            $user->update([
                'email'        => $validated['email'],
                'phone_number' => $validated['phone_number'],
                'username'     => $validated['username'],
                'status'       => $validated['status'] ?? $user->status,
            ]);

            if (!empty($validated['password'])) {
                $user->update(['password' => bcrypt($validated['password'])]);
            }

            $user->customer->update([
                'first_name'    => $validated['first_name'],
                'last_name'     => $validated['last_name'],
                'date_of_birth' => $validated['date_of_birth'],
                'gender'        => $validated['gender'],
                'address'       => $validated['address'],
                'occupation'    => $validated['occupation'] ?? null,
                'source_of_funds' => $validated['income_source'] ?? null,
            ]);

        
        });

        return redirect()->route('admin.customers.index')->with('success', 'Customer updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::with(['customer','customer.accounts'])->findOrFail($id);

        DB::transaction(function () use ($user) {
            $user->account?->delete();
            $user->customer?->delete();
            $user->delete();
        });

        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }
}
