"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaShare, FaFileAlt, FaUser } from "react-icons/fa";
import AuthGuard from "@/components/AuthGuard";

export default function YourDashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/panel/your-dashboard",
      icon: <FaHome />,
    },
    {
      name: "Your Contributions",
      href: "/panel/your-dashboard/your-contributions",
      icon: <FaFileAlt />,
    },
    {
      name: "Share Your Prompt",
      href: "/panel/your-dashboard/share-your-promt",
      icon: <FaShare />,
    },
    {
      name: "Profile",
      href: "/panel/your-dashboard/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen py-40 bg-black p-8">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Sidebar Card */}
          <aside className="w-72  h-fit bg-gray-950 border border-gray-800 rounded-2xl p-6 sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Your Dashboard</h2>
              <p className="text-xs text-gray-400">Manage your content</p>
            </div>

            <nav className="space-y-2 ">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-black  text-white shadow-md shadow-cyan-500/50"
                        : "bg-gray-950 border border-cyan-950 text-gray-300 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
