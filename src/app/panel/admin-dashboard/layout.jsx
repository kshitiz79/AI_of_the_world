"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaImage, FaCheckCircle, FaTag, FaSignOutAlt } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { authAPI } from "@/api";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authAPI.logout();
    router.push('/signin');
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/panel/admin-dashboard",
      icon: <FaHome />,
    },
    {
      name: "All Users",
      href: "/panel/admin-dashboard/all-users",
      icon: <FaUsers />,
    },
    {
      name: "Verify Prompts",
      href: "/panel/admin-dashboard/verify-creator-promt",
      icon: <FaCheckCircle />,
    },
    {
      name: "Image Prompts",
      href: "/panel/admin-dashboard/image-promt-window",
      icon: <FaImage />,
    },
    {
      name: "GIF Prompts",
      href: "/panel/admin-dashboard/gif-promt-window",
      icon: <MdGif />,
    },
    {
      name: "Video Prompts",
      href: "/panel/admin-dashboard/video-promt-window",
      icon: <FaVideo />,
    },
    {
      name: "Manage Tags",
      href: "/panel/admin-dashboard/manage-tags",
      icon: <FaTag />,
    },
  ];

  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-black py-20">
        <div className="flex py-20">
          <aside className="w-72 h-fit bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-8 m-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Admin Dashboard</h2>
              <p className="text-xs text-gray-400">Manage platform</p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 mt-4"
              >
                <span className="text-lg"><FaSignOutAlt /></span>
                <span className="font-medium text-sm">Logout</span>
              </button>
            </nav>
          </aside>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}

