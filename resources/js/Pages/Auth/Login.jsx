import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Lock } from 'lucide-react';
import { useState } from 'react';

import InputWithIcon from '@/Components/InputWithIcon';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 border">
                <h1 className="text-2xl font-bold text-center text-emerald-600 mb-2">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Log in to access your account
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <InputWithIcon
                            icon={<User className="text-gray-400" />}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg focus:ring-emerald-500"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="relative">
                            <InputWithIcon
                                icon={<Lock className="text-gray-400" />}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg focus:ring-emerald-500"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-emerald-600 transition"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ml-2 text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-emerald-600 hover:text-emerald-700 underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    {/* Submit */}
                    <PrimaryButton
                        className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </form>

                {/* Extra: Sign up link */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Don’t have an account?{' '}
                    <Link
                        href={route('register')}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}

