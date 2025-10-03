import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import CustomerForm from "./Partials/CustomerForm";

export default function Create() {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create New Customer</h1>
        </div>

        <CustomerForm
          mode="create"
          action="/admin/customers" // POST
          initialValues={{
            status: "inactive",
          }}
        />
      </div>
    </AuthenticatedLayout>
  );
}
