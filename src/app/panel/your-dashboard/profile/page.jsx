"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarBorder from "@/components/CreativeImages/StarBorder";
import filterData from "@/components/CreativeImages/filterData.json";
import { authAPI } from "@/api";
import { API_ENDPOINTS } from "@/api/config";

export default function ProfilePage() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [savingInterests, setSavingInterests] = useState(false);
  const [interestsSaved, setInterestsSaved] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success && response.data) {
        setUser(response.data);
        
        // Load interests from user profile
        if (response.data.interests) {
          try {
            const interests = JSON.parse(response.data.interests);
            setSelectedInterests(interests);
          } catch (err) {
            console.error("Failed to parse interests:", err);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  const handleSaveInterests = async () => {
    try {
      setSavingInterests(true);
      
      // Save to backend
      const token = localStorage.getItem('authToken');
      const response = await fetch(API_ENDPOINTS.UPDATE_INTERESTS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          interests: JSON.stringify(selectedInterests)
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setInterestsSaved(true);
        
        setTimeout(() => {
          setInterestsSaved(false);
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to save interests');
      }
    } catch (err) {
      console.error("Failed to save interests:", err);
      alert("Failed to save interests. Please try again.");
    } finally {
      setSavingInterests(false);
    }
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  // Combine all filter categories into one interests list
  const allInterests = [
    ...filterData.artisticStyles,
    ...filterData.corporateProfessional,
    ...filterData.genreThemes,
    ...filterData.moodTone,
    ...filterData.optionalAddOns,
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-black rounded-full text-xs font-semibold text-gray-300 mb-4">
            ACCOUNT SETTINGS
          </div>
          <h1 className="text-4xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-gray-400">
            Manage your account information, subscription, and appearance preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6">
            <div className="mb-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                SIGNED IN AS
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                {getInitials(user?.full_name || user?.username)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.full_name || user?.username || "User"}</h2>
                <p className="text-gray-400 text-sm">{user?.email || "email@example.com"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Member Since</p>
                <p className="font-semibold">{formatDate(user?.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Prompts</p>
                <p className="font-semibold">{user?.total_creations || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Last Update</p>
                <p className="font-semibold">{formatDate(user?.updated_at)}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <span className="text-red-500 text-sm">❤️ {user?.total_likes || 0} total likes</span>
              <span className="text-gray-500 text-sm">{user?.total_creations || 0} published prompts</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => router.push('/panel/your-dashboard/share-your-promt')}
                className="bg-black border border-gray-800 hover:bg-gray-950 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Submit new prompt
              </button>
              <button 
                onClick={handleSignOut}
                className="bg-black hover:bg-gray-950 border border-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">No Active Subscription</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to a plan to access the Studio and generate AI images and videos.
            </p>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View pricing plans
            </button>
          </div>
        </div>

        {/* Your Interests Card */}
        <div className="mt-6 bg-black border border-gray-800 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Your Interests</h3>
            <p className="text-gray-400 text-sm">
              Select your interests to personalize your feed and get better recommendations.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {allInterests.map((interest) => (
              <StarBorder
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`transition-all duration-300 transform ${
                  selectedInterests.includes(interest.id)
                    ? "scale-105 shadow-2xl shadow-cyan-500/50"
                    : "opacity-70 hover:opacity-100 hover:scale-102"
                }`}
                color={selectedInterests.includes(interest.id) ? "cyan" : "white"}
                speed={selectedInterests.includes(interest.id) ? "3s" : "5s"}
                thickness={selectedInterests.includes(interest.id) ? 2 : 1}
              >
                <div
                  className={`flex items-center gap-2 ${
                    selectedInterests.includes(interest.id) ? "font-bold" : "font-medium"
                  }`}
                >
                  <span
                    className={selectedInterests.includes(interest.id) ? "text-xl" : ""}
                  >
                    {interest.icon}
                  </span>
                  <span>{interest.label}</span>
                </div>
              </StarBorder>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            {interestsSaved && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Interests saved!</span>
              </div>
            )}
            <button 
              onClick={handleSaveInterests}
              disabled={savingInterests || selectedInterests.length === 0}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {savingInterests ? "Saving..." : `Save Interests (${selectedInterests.length} selected)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
