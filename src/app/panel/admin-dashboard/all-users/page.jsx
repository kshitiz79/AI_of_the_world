"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaUserShield, FaUserCheck, FaUserTimes, FaTrash, FaSearch } from "react-icons/fa";
import { usersAPI } from "@/api";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await usersAPI.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await usersAPI.getUserStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      // Don't show error for stats, just log it
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const response = await usersAPI.updateUserStatus(userId, !currentStatus);
      if (response.success) {
        setSuccess(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
        fetchUsers();
        fetchStats();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await usersAPI.deleteUser(userId);
      if (response.success) {
        setSuccess("User deleted successfully!");
        fetchUsers();
        fetchStats();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = filterRole === "All" || user.role === filterRole.toLowerCase();
    const matchesStatus = 
      filterStatus === "All" || 
      (filterStatus === "Active" && user.is_active) ||
      (filterStatus === "Inactive" && !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaUsers className="text-cyan-500" />
            User Management
          </h1>
          <p className="text-gray-400">
            Manage all registered users and their permissions
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 bg-green-950/50 border border-green-800 rounded-lg p-4">
            <p className="text-green-400">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-950/50 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-cyan-500">{stats.total_users}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-green-500">{stats.active_users}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Admins</p>
              <p className="text-3xl font-bold text-purple-500">{stats.total_admins}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Regular Users</p>
              <p className="text-3xl font-bold text-blue-500">{stats.regular_users}</p>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <FaSearch className="inline mr-2" />
                Search Users
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or username..."
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Filter by Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-600"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-600"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">
            All Users ({filteredUsers.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="text-gray-400 mt-4">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <FaUsers className="text-6xl text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{user.username}</p>
                          {user.full_name && (
                            <p className="text-sm text-gray-400">{user.full_name}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-purple-900/50 text-purple-300"
                              : "bg-blue-900/50 text-blue-300"
                          }`}
                        >
                          {user.role === "admin" ? (
                            <FaUserShield />
                          ) : (
                            <FaUserCheck />
                          )}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            user.is_active
                              ? "bg-green-900/50 text-green-300"
                              : "bg-red-900/50 text-red-300"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(user.id, user.is_active)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.is_active
                                ? "bg-yellow-600 hover:bg-yellow-500"
                                : "bg-green-600 hover:bg-green-500"
                            } text-white`}
                            title={user.is_active ? "Deactivate" : "Activate"}
                          >
                            {user.is_active ? <FaUserTimes /> : <FaUserCheck />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-800/50 rounded-xl p-4">
          <h3 className="font-semibold mb-2 text-cyan-400">💡 User Management Tips</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Deactivate users instead of deleting to preserve their content</li>
            <li>• Admin users have full access to all dashboard features</li>
            <li>• Regular users can only upload and manage their own content</li>
            <li>• You cannot delete your own admin account</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
