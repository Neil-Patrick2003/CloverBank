import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export const Dashboard = () => {

    const authUser = usePage().props.auth.user;

  return (
    <AuthenticatedLayout>
        <h1 className="text-2xl font-semibold text-gray-800">Hello, {authUser.username}</h1>
        <p className="mt-2 text-gray-600">Welcome to your dashboard!</p> haha
    </AuthenticatedLayout>
  );
};
export default Dashboard;