import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import React, { useCallback, useEffect } from "react";
import { Download, SquarePen } from "lucide-react";
import { debounce } from "lodash";

export default function Index({ users }) {
    const [selectedSort, setSelectedSort] = React.useState("asc");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    // Debounced search
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(
                "/admin/customers",
                {
                    page: 1,
                    search: value,
                    perPage: itemsPerPage,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500),
        [selectedSort, itemsPerPage]
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSortChange = (value) => {
        setSelectedSort(value);
        router.get(
            "/admin/customers",
            {
                page: 1,
                search: searchTerm,
                perPage: itemsPerPage,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handlePerPageChange = (value) => {
        setItemsPerPage(value);
        router.get(
            "/admin/customers",
            {
                page: 1,
                search: searchTerm,
                perPage: value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <Link
                    href="/admin/customers/create"
                    className="bg-emerald-500 rounded-md text-white px-4 py-2 hover:bg-emerald-600 transition"
                >
                    Add New Customer
                </Link>
            </div>
            <p className="text-gray-500 mb-6">
                View, manage, and update all registered customer accounts.
            </p>

            {/* Filters */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <select
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={selectedSort}
                    className="border border-gray-300 rounded-md text-sm px-4 py-2"
                >
                    <option value="asc">Sort: Ascending</option>
                    <option value="desc">Sort: Descending</option>
                </select>

                <div className="flex items-center gap-2">
                    <input
                        id="search"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                        placeholder="Search by name, email, or username..."
                        className="border border-gray-300 rounded-md text-sm px-4 py-2"
                    />
                    <button className="border border-gray-300 py-2 px-2.5 rounded-md text-gray-500 hover:bg-gray-200 transition cursor-not-allowed">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto overflow-y-auto max-h-[60vh] bg-white scrollbar-thumb-gray-300 scrollbar-track-transparent rounded-t-lg">
                <table className="min-w-full divide-y border-b divide-gray-200 text-gray-700">
                    <thead className="bg-gray-100 text-sm text-gray-500 uppercase tracking-wide hidden md:table-header-group sticky top-0 z-20">
                        <tr>
                            <th className="p-3 text-start rounded-tl-lg">Id</th>
                            <th className="p-3 text-start">Last Name</th>
                            <th className="p-3 text-start">First Name</th>
                            <th className="p-3 text-start">Username</th>
                            <th className="p-3 text-start">Email</th>
                            <th className="p-3 text-start">Phone Number</th>
                            <th className="p-3 text-start">Role</th>
                            <th className="p-3 text-start">Status</th>
                            <th className="p-3 text-start">Joined at</th>
                            <th className="p-3 text-start">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-dashed">
                        {users?.data?.length > 0 ? (
                            users.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="flex flex-col md:table-row hover:bg-gray-50"
                                >
                                    <td className="p-3 md:table-cell">{user?.id}</td>
                                    <td className="p-3 md:table-cell">
                                        {user?.customer?.last_name}
                                    </td>
                                    <td className="p-3 md:table-cell">
                                        {user?.customer?.first_name}
                                    </td>
                                    <td className="p-3 md:table-cell">{user.username}</td>
                                    <td className="p-3 md:table-cell">{user.email}</td>
                                    <td className="p-3 md:table-cell">{user.phone_number}</td>
                                    <td className="p-3 md:table-cell">{user.role}</td>
                                    <td className="p-3 md:table-cell">{user.status}</td>
                                    <td className="p-3 md:table-cell">{user.created_at}</td>
                                    <td className="p-3 md:table-cell">
                                        <Link
                                            href={`/admin/customers/${user.id}/edit`}
                                            className="inline-flex"
                                        >
                                            <SquarePen className="w-4 h-4 text-blue-500 hover:text-blue-600 cursor-pointer" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="p-6 text-center text-gray-500"
                                    colSpan="10"
                                >
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center flex-wrap gap-4 mt-4">
                <div className="text-sm text-gray-600">
                    Showing <strong>{users?.to}</strong> of{" "}
                    <strong>{users?.total}</strong>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        {users?.links.map((link, idx) =>
                            link.url ? (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    className={`px-3 py-2 rounded-md text-sm border transition ${
                                        link.active
                                            ? "bg-primary text-white font-semibold"
                                            : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={idx}
                                    className="px-3 py-2 text-sm text-gray-400 bg-white border rounded-md cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        Per Page:
                        <select
                            id="page_item"
                            value={itemsPerPage}
                            onChange={(e) => handlePerPageChange(e.target.value)}
                            className="border border-gray-300 rounded-md text-sm px-4 py-2"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
