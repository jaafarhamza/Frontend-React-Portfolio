import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { useProfile } from "@/hooks/useProfile";
import { UPDATE_PROFILE } from "@/graphql/mutations/profile";
import { LoadingSpinner } from "@/components/common";
import { useNavigate } from "react-router-dom";

const ProfileManagementPage = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useProfile();
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const profile = data?.profile;

  const [formData, setFormData] = useState<{
    fullName: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
    resumeUrl: string;
    socialLinks: Array<{ platform?: string; url?: string }>;
  }>({
    fullName: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    avatarUrl: "",
    resumeUrl: "",
    socialLinks: []
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        title: profile.title || "",
        bio: profile.bio || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        avatarUrl: profile.avatarUrl || "",
        resumeUrl: profile.resumeUrl || "",
        socialLinks: (profile.socialLinks || []).filter(Boolean).map(link => ({
          platform: link?.platform || "",
          url: link?.url || ""
        }))
      });
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await updateProfile({
        variables: { input: formData }
      });
      setSuccess(true);
      await refetch();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "", url: "" }]
    });
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index)
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Profile Management
                </h1>
                <p className="text-gray-400">✨ Customize your digital presence</p>
              </div>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-purple-300 rounded-xl transition-all border border-purple-500/20 hover:border-purple-500/40"
              >
                ← Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl backdrop-blur-sm">
            ✓ Profile updated successfully!
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-10"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-purple-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-10"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* URLs */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-amber-600 rounded-2xl blur-xl opacity-10"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🔗</span>
                </div>
                <h2 className="text-2xl font-bold text-white">URLs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Avatar URL</label>
                  <input
                    type="url"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Resume URL</label>
                  <input
                    type="url"
                    value={formData.resumeUrl}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-rose-600 rounded-2xl blur-xl opacity-10"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Social Links</h2>
                </div>
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="px-4 py-2 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/20"
                >
                  + Add Link
                </button>
              </div>
              <div className="space-y-4">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-4 items-center bg-slate-900/30 p-4 rounded-xl border border-pink-500/10">
                    <input
                      type="text"
                      value={link?.platform}
                      onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                      placeholder="Platform (e.g., GitHub)"
                      className="w-1/3 px-4 py-3 bg-slate-900/50 border border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                    <input
                      type="url"
                      value={link?.url}
                      onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-4 py-3 bg-slate-900/50 border border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className="relative group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30"
            >
              <span className="relative z-10">{updating ? "💾 Saving..." : "💾 Save Changes"}</span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagementPage;
