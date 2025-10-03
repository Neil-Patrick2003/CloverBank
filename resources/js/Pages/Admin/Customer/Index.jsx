import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, SquarePen, Loader2 } from "lucide-react";
import { debounce } from "lodash";

/* ------------------------------ Small Utils ------------------------------ */
const toNumber = (v, fallback = 10) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};
const fmtDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-PH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};
const Badge = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
    green: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    red: "bg-rose-100 text-rose-700 ring-rose-200",
    blue: "bg-blue-100 text-blue-700 ring-blue-200",
    amber: "bg-amber-100 text-amber-800 ring-amber-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${tones[tone] || tones.gray}`}>
      {children}
    </span>
  );
};

export default function Index({ users, filters = {} }) {
  // Hydrate initial from server (if you pass them back as props)
  const initialSort = (filters.sort ?? "asc").toLowerCase() === "desc" ? "desc" : "asc";
  const initialSearch = filters.search ?? "";
  const initialPerPage = toNumber(filters.perPage ?? 10, 10);

  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Build a shared query object so all navigations are consistent
  const query = useMemo(
    () => ({
      page: 1,
      search: searchTerm || undefined,
      perPage: itemsPerPage || undefined,
      sort: selectedSort || undefined,
    }),
    [searchTerm, itemsPerPage, selectedSort]
  );

  // Debounced search that respects sort/perPage
  const debouncedSearch = useRef(
    debounce((nextValue, nextQuery) => {
      router.get("/admin/customers", nextQuery, {
        preserveState: true,
        replace: true,
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
        preserveScroll: true,
      });
    }, 450)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchTermChange = useCallback(
    (value) => {
      setSearchTerm(value);
      debouncedSearch(value, { ...query, search: value || undefined });
    },
    [debouncedSearch, query]
  );

  const navigateWith = useCallback(
    (next) => {
      const merged = { ...query, ...next };
      router.get("/admin/customers", merged, {
        preserveState: true,
        replace: true,
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
        preserveScroll: true,
      });
    },
    [query]
  );

  const handleSortChange = (value) => {
    const v = value === "desc" ? "desc" : "asc";
    setSelectedSort(v);
    navigateWith({ sort: v });
  };

  const handlePerPageChange = (value) => {
    const v = toNumber(value, itemsPerPage);
    setItemsPerPage(v);
    navigateWith({ perPage: v });
  };

  // Compute export URL (server should stream CSV)
  const exportUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedSort) params.set("sort", selectedSort);
    if (itemsPerPage) params.set("perPage", String(itemsPerPage));
    return `/admin/customers/export?${params.toString()}`;
  }, [searchTerm, selectedSort, itemsPerPage]);

  return (
    <AuthenticatedLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-gray-500">View, manage, and update all registered customer accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={exportUrl}
            className="inline-flex items-center gap-2 border rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition"
            aria-label="Export customers to CSV"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </a>
          <Link
            href="/admin/customers/create"
            className="inline-flex items-center rounded-md bg-emerald-600 text-white px-3 py-2 text-sm hover:bg-emerald-700 transition"
          >
            Add New Customer
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">Sort</label>
          <select
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={selectedSort}
            className="border border-gray-300 rounded-md text-sm px-3 py-2"
          >
            <option value="asc">Sort: Ascending (A→Z)</option>
            <option value="desc">Sort: Descending (Z→A)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="search" className="sr-only">Search customers</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            placeholder="Search by name, email, or username…"
            className="w-full md:w-[300px] border border-gray-300 rounded-md text-sm px-3 py-2"
            autoComplete="off"
          />
          {isLoading ? (
            <span className="inline-flex items-center justify-center border border-gray-300 py-2 px-2.5 rounded-md text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
            </span>
          ) : (
            <span className="inline-flex items-center justify-center border border-gray-200 py-2 px-2.5 rounded-md text-gray-400">
              <Download className="w-4 h-4 opacity-0" /> {/* spacer to keep layout steady */}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[60vh] bg-white rounded-lg ring-1 ring-gray-200">
        <table className="min-w-full text-gray-800">
          <thead className="bg-gray-50 text-sm text-gray-600 uppercase tracking-wide sticky top-0 z-10">
            <tr className="[&>th]:p-3 [&>th]:text-left">
              <th className="min-w-[60px]">ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users?.data?.length ? (
              users.data.map((user) => {
                const roleTone =
                  user?.role?.toLowerCase() === "admin" ? "blue" :
                  user?.role?.toLowerCase() === "agent" ? "amber" : "gray";
                const statusTone =
                  user?.status?.toLowerCase() === "active" ? "green" :
                  user?.status?.toLowerCase() === "banned" ? "red" : "gray";

                return (
                  <tr key={user.id} className="hover:bg-gray-50/70">
                    <td className="p-3">{user?.id ?? "—"}</td>
                    <td className="p-3">{user?.customer?.last_name ?? "—"}</td>
                    <td className="p-3">{user?.customer?.first_name ?? "—"}</td>
                    <td className="p-3">{user?.username ?? "—"}</td>
                    <td className="p-3">{user?.email ?? "—"}</td>
                    <td className="p-3">{user?.phone_number ?? "—"}</td>
                    <td className="p-3">
                      <Badge tone={roleTone}>{user?.role ?? "—"}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge tone={statusTone}>{user?.status ?? "—"}</Badge>
                    </td>
                    <td className="p-3 whitespace-nowrap">{fmtDate(user?.created_at)}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        <Link
                          href={`/admin/customers/${user.id}/edit`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-2 py-1"
                          aria-label={`Edit customer ${user?.username || user?.id}`}
                        >
                          <SquarePen className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-8 text-center text-gray-500" colSpan={10}>
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-medium">No customers found</p>
                    <p className="text-sm">Try adjusting filters or add a new customer.</p>
                    <Link
                      href="/admin/customers/create"
                      className="mt-2 inline-flex items-center rounded-md bg-emerald-600 text-white px-3 py-2 text-sm hover:bg-emerald-700 transition"
                    >
                      Add New Customer
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + Per Page */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
        <div className="text-sm text-gray-600">
          Showing <strong>{users?.to ?? 0}</strong> of <strong>{users?.total ?? 0}</strong>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {users?.links?.map((link, idx) =>
              link.url ? (
                <Link
                  key={idx}
                  href={link.url}
                  className={`px-3 py-2 rounded-md text-sm border transition ${link.active ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  preserveScroll
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

          {/* Per page */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <label htmlFor="page_item">Per Page:</label>
            <select
              id="page_item"
              value={itemsPerPage}
              onChange={(e) => handlePerPageChange(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2"
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
