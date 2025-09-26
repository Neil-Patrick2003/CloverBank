import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        occupation: '',
        income_source: '',
        email: '',
        phone_number: '',
        username: '',
        account_type: '',
        password: '',
        password_confirmation: '',
        'initial_deposit': '',
        status: 'inactive',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/customers'); // adjust backend route if needed
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Create New Customer</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Personal Info */}
                    <div className="border rounded-2xl shadow p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
                        <div className="space-y-3">
                            <div>
                                <InputLabel value="First Name" />
                                <TextInput
                                    type="text"
                                    value={data.first_name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div>
                                <InputLabel value="Last Name" />
                                <TextInput
                                    type="text"
                                    value={data.last_name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                <InputError message={errors.last_name} />
                            </div>
                            <div>
                                <InputLabel value="Birthdate" />
                                <TextInput
                                    type="date"
                                    value={data.date_of_birth}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                />
                                <InputError message={errors.date_of_birth} />
                            </div>
                            <div>
                                <InputLabel value="Gender" />
                                <select
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-600 focus:ring-emerald-500 focus:ring-1"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <InputError message={errors.gender} />
                            </div>
                            <div>
                                <InputLabel value="Occupation" />
                                <TextInput
                                    type="text"
                                    value={data.occupation}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('occupation', e.target.value)}
                                />
                                <InputError message={errors.occupation} />
                            </div>
                            <div>
                                <InputLabel value="Source of Income" />
                                <TextInput
                                    type="text"
                                    value={data.income_source}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('income_source', e.target.value)}
                                />
                                <InputError message={errors.income_source} />
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="border rounded-2xl shadow p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Contact</h2>
                        <div className="space-y-3">
                            <div>
                                <InputLabel value="Email" />
                                <TextInput
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <InputLabel value="Phone Number" />
                                <TextInput
                                    type="text"
                                    value={data.phone_number}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                                <InputError message={errors.phone_number} />
                            </div>
                            <div>
                                <InputLabel value="Address" />
                                <TextInput
                                    type="text"
                                    value={data.address}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address} />
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div className="border rounded-2xl shadow p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Account</h2>
                        <div className="space-y-3">
                            <div>
                                <InputLabel value="Username" />
                                <TextInput
                                    type="text"
                                    value={data.username}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                                <InputError message={errors.username} />
                            </div>
                            
                            <div>
                                <InputLabel value="Account Type" />
                                <select
                                    value={data.account_type}
                                    onChange={(e) => setData('account_type', e.target.value)}
                                    className="block w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-600 focus:ring-emerald-500 focus:ring-1"
                                >
                                    <option value="">Select Type</option>
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                </select>
                                <InputError message={errors.account_type} />
                            </div>

                            <div>
                                <InputLabel value="Initial Deposit" />
                                <TextInput
                                    type="number"
                                    value={data.initial_deposit}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('initial_deposit', e.target.value)}
                                />
                                <InputError message={errors.initial_deposit} />
                            </div>
                            <div>
                                <InputLabel value="Status" />
                                <div className="flex items-center mt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData('status', data.status === 'active' ? 'inactive' : 'active')
                                        }
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            data.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                data.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                    <span className="ml-3 text-sm text-gray-700">
                                        {data.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <InputError message={errors.status} />
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="border rounded-2xl shadow p-5 bg-white">
                        <h2 className="text-lg font-semibold mb-4">Security</h2>
                        <div className="space-y-3">
                            <div>
                                <InputLabel value="Password" />
                                <TextInput
                                    type="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div>
                                <InputLabel value="Confirm Password" />
                                <TextInput
                                    type="password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Create Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
