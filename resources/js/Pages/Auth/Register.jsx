import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Mail, User, Lock, CircleCheck, CircleCheckBig } from 'lucide-react';
import InputWithIcon from '@/Components/InputWithIcon';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [rules, setRules] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        const pwd = data.password;
        setRules({
            length: /.{8,}/.test(pwd),
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[^A-Za-z0-9]/.test(pwd),
        });
    }, [data.password]);

    const submit = (e) => {
        e.preventDefault();
        const allValid = Object.values(rules).every(Boolean);
        if (!allValid) return;

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form
                onSubmit={submit}
                className="max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg px-8 py-10 w-full"
            >
                {/* Title */}
                <h1 className="text-3xl font-bold text-emerald-600 text-center mb-8">
                    Create an Account
                </h1>

                {/* Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Full Name" className="text-gray-700" />
                    <InputWithIcon
                        icon={<User className="text-gray-400" />}
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={data.name}
                        className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-red-500" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-gray-700" />
                    <InputWithIcon
                        icon={<Mail className="text-gray-400" />}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-red-500" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700" />

                    <div className="relative">
                        <InputWithIcon
                            icon={<Lock className="text-gray-400" />}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            aria-label="Toggle password visibility"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-emerald-600 transition"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2 text-red-500" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700" />

                    <div className="relative">
                        <InputWithIcon
                            icon={<Lock className="text-gray-400" />}
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            placeholder="Re-enter password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            aria-label="Toggle confirm password visibility"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-emerald-600 transition"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                </div>

                {/* Password rules */}
                <ul className="mt-6 text-sm space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                        {rules.length ? (
                            <CircleCheckBig className="text-emerald-600 w-4 h-4" />
                        ) : (
                            <CircleCheck className="text-gray-400 w-4 h-4" />
                        )}
                        At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                        {rules.uppercase ? (
                            <CircleCheckBig className="text-emerald-600 w-4 h-4" />
                        ) : (
                            <CircleCheck className="text-gray-400 w-4 h-4" />
                        )}
                        One uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                        {rules.lowercase ? (
                            <CircleCheckBig className="text-emerald-600 w-4 h-4" />
                        ) : (
                            <CircleCheck className="text-gray-400 w-4 h-4" />
                        )}
                        One lowercase letter
                    </li>
                    <li className="flex items-center gap-2">
                        {rules.number ? (
                            <CircleCheckBig className="text-emerald-600 w-4 h-4" />
                        ) : (
                            <CircleCheck className="text-gray-400 w-4 h-4" />
                        )}
                        One number
                    </li>
                    <li className="flex items-center gap-2">
                        {rules.special ? (
                            <CircleCheckBig className="text-emerald-600 w-4 h-4" />
                        ) : (
                            <CircleCheck className="text-gray-400 w-4 h-4" />
                        )}
                        One special character
                    </li>
                </ul>

                {/* Submit */}
                <div className="mt-8 flex flex-col">
                    <PrimaryButton
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg py-2"
                        disabled={processing || !Object.values(rules).every(Boolean)}
                    >
                        Register
                    </PrimaryButton>
                    <Link
                        href={route('login')}
                        className="rounded-md text-center mt-4 text-sm text-gray-500 hover:text-emerald-600 transition"
                    >
                        Already registered? Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
