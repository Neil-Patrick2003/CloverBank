import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import CustomerForm from "./Partials/CustomerForm";

/**
 * Props shape suggestion (from controller):
 * {
 *   user: {
 *     id, username, email, phone_number, status, account_type, created_at,
 *     customer: { first_name, last_name, date_of_birth, gender, address, occupation, income_source },
 *     initial_deposit
 *   }
 * }
 */
export default function Edit({ user }) {
  const initialValues = {
    first_name: user?.customer?.first_name ?? "",
    last_name: user?.customer?.last_name ?? "",
    date_of_birth: user?.customer?.date_of_birth ?? "",
    gender: user?.customer?.gender ?? "",
    address: user?.customer?.address ?? "",
    occupation: user?.customer?.occupation ?? "",
    income_source: user?.customer?.income_source ?? "",
    email: user?.email ?? "",
    phone_number: user?.phone_number ?? "",
    username: user?.username ?? "",
    account_type: user?.account_type ?? "",
    initial_deposit: user?.initial_deposit ?? "",
    status: user?.status ?? "inactive",
    // password fields intentionally blank on edit
    password: "",
    password_confirmation: "",
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Customer</h1>
        </div>

        <CustomerForm
          mode="edit"
          action={`/admin/customers/${user.id}`} // PUT
          initialValues={initialValues}
        />
      </div>
    </AuthenticatedLayout>
  );
}
