import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Home, User, Bell, Settings, Menu, X } from "lucide-react";
import Sidebar, { SidebarItem } from "@/Components/Navbar/Navbar";


export default function AuthenticatedLayout({ children, header }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex flex-row h-screen">
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <Sidebar>
            <SidebarItem icon={<Home />} text="Home" active />
            <SidebarItem icon={<User />} text="Profile" />
          </Sidebar>
        </div>

        {/* Mobile sidebar overlay (click to close) */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile sidebar (drawer) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-semibold">Menu</h1>
            <button
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sidebar>
            <SidebarItem icon={<Home />} text="Home" active />
            <SidebarItem icon={<User />} text="Profile"  />
          </Sidebar>
        </div>

        {/* Main content */}
        <main className="flex flex-col flex-1">
          {/* Top Navbar */}
          <div className="flex w-full px-6 py-4 justify-between items-center border-b">
            {/* Mobile hamburger button */}
            <button
              className="md:hidden p-2 rounded-md border text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search bar */}
            <input
              type="text"
              placeholder="Search..."
              className="hidden sm:block flex-1 mx-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />

            {/* Actions */}
            <div className="flex space-x-4 text-gray-600">
              <Bell className="cursor-pointer" />
              <Settings className="cursor-pointer" />
            </div>
          </div>

          {/* Page Content */}
            <div className="p-6">
                {children}
            </div>

        </main>
      </div>
    </>
  );
}
