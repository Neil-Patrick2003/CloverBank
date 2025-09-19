import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Mail,
  User,
  Lock,
  CircleCheck,
  CreditCard,
  Briefcase,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CircleX,
} from 'lucide-react';
import InputWithIcon from '@/Components/InputWithIcon';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    id_type: '',
    id_number: '',
    occupation: '',
    income_source: '',
    username: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

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

  const steps = [
    { label: 'Personal', icon: <User size={20} /> },
    { label: 'Account', icon: <Mail size={20} /> },
    { label: 'Security', icon: <Lock size={20} /> },
  ];

  return (
    <GuestLayout>
      <Head title="Register" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-emerald-600 text-center py-10 px-4 sm:px-0">
        Create an Account
      </h1>

      {/* Stepper */}
      <div className="overflow-x-auto max-w-full mb-6">
        <ul className="flex justify-center space-x-6 min-w-[320px] sm:min-w-auto px-4 sm:px-0">
          {steps.map(({ label, icon }, index) => {
            const step = index + 1;
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            return (
              <li
                key={label}
                aria-current={isActive ? 'step' : undefined}
                className="flex flex-col md:flex-row items-center space-x-3 cursor-pointer select-none flex-shrink-0"
                onClick={() => setCurrentStep(step)}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600'
                      : isActive
                      ? 'bg-emerald-400'
                      : 'bg-gray-300'
                  }`}
                >
                  {isCompleted ? <CircleCheck size={20} /> : icon}
                </div>
                <span
                  className={`font-semibold ${
                    isActive ? 'text-emerald-600' : 'text-gray-500'
                  } whitespace-nowrap`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Progress Bar */}
      <div className="w-4/5 bg-gray-200 rounded-full h-2 mb-8 max-w-5xl mx-auto px-4 sm:px-0">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      <form onSubmit={submit} className="max-w-5xl mx-auto px-4 sm:px-0">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* First Name */}
            <div>
              <InputLabel htmlFor="first_name" value="First Name" />
              <InputWithIcon
                icon={<User className="text-gray-400" />}
                id="first_name"
                type="text"
                name="first_name"
                value={data.first_name}
                autoComplete="given-name"
                onChange={(e) => setData('first_name', e.target.value)}
                placeholder="Enter your first name"
                required
                className="w-full"
              />
              <InputError message={errors.first_name} />
            </div>

            {/* Last Name */}
            <div>
              <InputLabel htmlFor="last_name" value="Last Name" />
              <InputWithIcon
                icon={<User className="text-gray-400" />}
                id="last_name"
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                placeholder="Enter your last name"
                required
                className="w-full"
              />
              <InputError message={errors.last_name} />
            </div>

            {/* Date of Birth */}
            <div>
              <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
              <InputWithIcon
                icon={<User className="text-gray-400" />}
                id="date_of_birth"
                type="date"
                name="date_of_birth"
                value={data.date_of_birth}
                onChange={(e) => setData('date_of_birth', e.target.value)}
                required
                className="w-full"
              />
              <InputError message={errors.date_of_birth} />
            </div>

            {/* Gender */}
            <div>
              <InputLabel htmlFor="gender" value="Gender" />
              <select
                id="gender"
                name="gender"
                value={data.gender}
                onChange={(e) => setData('gender', e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-600 focus:ring-emerald-400 focus:ring-2 transition"
                required
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <InputError message={errors.gender} />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <InputLabel htmlFor="address" value="Address" />
              <InputWithIcon
                icon={<MapPin className="text-gray-400" />}
                id="address"
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                autoComplete="street-address"
                placeholder="Enter your address"
                required
                className="w-full"
              />
              <InputError message={errors.address} />
            </div>

            <div className="md:col-span-2">
              <InputLabel htmlFor="occupation" value="Occupation" />
              <InputWithIcon
                icon={<Briefcase className="text-gray-400" />}
                id="occupation"
                type="text"
                name="occupation"
                value={data.occupation}
                onChange={(e) => setData('occupation', e.target.value)}
                autoComplete="job-title"
                placeholder="Enter your occupation"
                required
                className="w-full"
              />
              <InputError message={errors.occupation} />
            </div>
          </div>
        )}

        {/* Step 2: Account Info */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Username */}
            <div>
              <InputLabel htmlFor="username" value="Username" />
              <InputWithIcon
                icon={<User className="text-gray-400" />}
                id="username"
                type="text"
                name="username"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
                placeholder="Choose a username"
                required
                className="w-full"
              />
              <InputError message={errors.username} />
            </div>

            {/* Email */}
            <div>
              <InputLabel htmlFor="email" value="Email" />
              <InputWithIcon
                icon={<Mail className="text-gray-400" />}
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
              <InputError message={errors.email} />
            </div>

            {/* Phone */}
            <div>
              <InputLabel htmlFor="phone_number" value="Phone Number" />
              <InputWithIcon
                icon={<Phone className="text-gray-400" />}
                id="phone_number"
                type="tel"
                name="phone_number"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full"
              />
              <InputError message={errors.phone_number} />
            </div>

            {/* income */}
            <div>
              <InputLabel htmlFor="income_source" value="Source of Income" />
              <InputWithIcon
                icon={<Briefcase className="text-gray-400" />}
                id="income_source"
                type="text"
                name="income_source"
                value={data.income_source}
                onChange={(e) => setData('income_source', e.target.value)}
                placeholder="Enter your source of income"
                required
                className="w-full"
              />
              <InputError message={errors.income_source} />
            </div>

            {/* ID Type */}
            <div>
              <InputLabel htmlFor="id_type" value="ID Type" />
              <select
                id="id_type"
                name="id_type"
                value={data.id_type}
                onChange={(e) => setData('id_type', e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-600 focus:ring-emerald-400 focus:ring-2 transition"
                required
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver’s License</option>
                <option value="national_id">National ID</option>
              </select>
              <InputError message={errors.id_type} />
            </div>

            {/* ID Number */}
            <div>
              <InputLabel htmlFor="id_number" value="ID Number" />
              <InputWithIcon
                icon={<CreditCard className="text-gray-400" />}
                id="id_number"
                type="text"
                name="id_number"
                value={data.id_number}
                onChange={(e) => setData('id_number', e.target.value)}
                placeholder="Enter your ID number"
                required
                className="w-full"
              />
              <InputError message={errors.id_number} />
            </div>
          </div>
        )}

        {/* Step 3: Security */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-md mx-auto">
            {/* Password */}
            <div className="relative">
              <InputLabel htmlFor="password" value="Password" />
              <InputWithIcon
                icon={<Lock className="text-gray-400" />}
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Create a password"
                required
                className="w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform text-gray-500 hover:text-emerald-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <InputError message={errors.password} />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
              <InputWithIcon
                icon={<Lock className="text-gray-400" />}
                id="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform  text-gray-500 hover:text-emerald-600 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <InputError message={errors.password_confirmation} />
            </div>

            {/* Password Rules */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Password must include:</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  {rules.length ? (
                    <CircleCheck className="text-green-500" size={18} />
                  ) : (
                    <CircleX className="text-red-500" size={18} />
                  )}
                  <span>At least 8 characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  {rules.uppercase ? (
                    <CircleCheck className="text-green-500" size={18} />
                  ) : (
                    <CircleX className="text-red-500" size={18} />
                  )}
                  <span>One uppercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  {rules.lowercase ? (
                    <CircleCheck className="text-green-500" size={18} />
                  ) : (
                    <CircleX className="text-red-500" size={18} />
                  )}
                  <span>One lowercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  {rules.number ? (
                    <CircleCheck className="text-green-500" size={18} />
                  ) : (
                    <CircleX className="text-red-500" size={18} />
                  )}
                  <span>One number</span>
                </li>
                <li className="flex items-center space-x-2">
                  {rules.special ? (
                    <CircleCheck className="text-green-500" size={18} />
                  ) : (
                    <CircleX className="text-red-500" size={18} />
                  )}
                  <span>One special character</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between mt-10 space-y-4 md:space-y-0">
          {currentStep > 1 && (
            <button
              type="button"
              className="w-full md:w-auto px-6 py-2 rounded-md border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              Back
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              className="w-full md:w-auto ml-0 md:ml-auto px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              onClick={() => setCurrentStep((s) => s + 1)}
            >
              Next
            </button>
          ) : (
            <PrimaryButton
              className="w-full md:w-auto ml-0 md:ml-auto px-6 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              disabled={processing || !Object.values(rules).every(Boolean)}
            >
              {processing ? 'Registering…' : 'Register'}
            </PrimaryButton>
          )}
        </div>

        {/* Already registered */}
        {currentStep === 3 && (
          <div className="text-center mt-6">
            <Link
              href={route('login')}
              className="text-sm text-gray-500 hover:text-emerald-600 transition"
            >
              Already registered? Login
            </Link>
          </div>
        )}
      </form>
    </GuestLayout>
  );
}