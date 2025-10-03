<?php

namespace App\Http\Controllers\Admin;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;



class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
   public function index(Request $request)
    {
        $perPage = $request->get('perPage', 15); // default to 15 if not provided

        $users = User::with('customer')
            ->where('role', 'customer')
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('username', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone_number', 'like', '%' . $search . '%');
                })
                ->orWhereHas('customer', function ($q) use ($search) {
                    $q->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%');
                });
            })
            ->latest()
            ->paginate($perPage)
            ->appends($request->all()); // keeps query params in pagination links

        return Inertia::render('Admin/Customer/Index', [
            'users' => $users,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Customer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:255',
            'occupation' => 'nullable|string|max:100',
            'income_source' => 'nullable|string|max:100',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|string|regex:/^[0-9]{10,15}$/|unique:users,phone_number',
            'username' => 'required|string|min:4|max:50|unique:users,username',
            'account_type' => 'required|in:savings,current,fixed',
            'password' => 'required|string|min:8|confirmed',
            'initial_deposit' => 'required|numeric|min:100',
            'status' => 'in:inactive,active',
        ]);


        // Create the user
        $user = User::create([
            
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'username' => $validatedData['username'],
            'role' => 'customer',
            'status' => 'active', // or however you want to set the initial status
            'password' => bcrypt($validatedData['password']),
        ]);

        // Create the customer profile
        $customer = Customer::create([
            'user_id' => $user->id,
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'date_of_birth' => $request->input('date_of_birth'), 
                        'gender' => $request->input['gender'],

            'address' => $request->input('address'),
            'id_type' => $request->input('id_type'),
            'id_number' => $request->input('id_number'),
            'occcupation' => $request->input('occupation'),
            'income_source' => $request->input('source_of_funds'),
            
            // Add other customer-specific fields here
        ]);

        

        return redirect()->route('customers')->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
