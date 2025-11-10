import { useState } from "react";
import { useSkills } from "@/hooks/useSkills";
import { LoadingSpinner } from "@/components/common";
import { SkillModal } from "@/components/admin/SkillModal";
import { useNavigate } from "react-router-dom";
import type { Skill } from "@/types/portfolio.types";

const SkillsManagementPage = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useSkills();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const skills = data?.skills || [];
  const categories = [...new Set(skills.map(s => s?.category).filter(Boolean))];
  const filteredSkills = filterCategory
    ? skills.filter(s => s?.category === filterCategory)
    : skills;

  const handleCreate = () => {
    setSelectedSkill(null);
    setIsModalOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Skills Management
                </h1>
                <p className="text-gray-400">⚡ Manage your technical skills</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-purple-300 rounded-xl transition-all border border-purple-500/20"
                >
                  ← Dashboard
                </button>
                <button
                  onClick={handleCreate}
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/20"
                >
                  + New Skill
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              !filterCategory
                ? "bg-purple-500 text-white"
                : "bg-slate-800/50 text-gray-400 border border-purple-500/20 hover:border-purple-500/40"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category || null)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filterCategory === category
                  ? "bg-purple-500 text-white"
                  : "bg-slate-800/50 text-gray-400 border border-purple-500/20 hover:border-purple-500/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            skill && (
              <div
                key={skill.id}
                className="relative group bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{skill.name}</h3>
                    <span className="inline-block px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{skill.level}/5</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                      style={{ width: `${((skill.level || 0) / 5) * 100}%` }}
                    >
                      <div className="h-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(skill as Skill)}
                  className="w-full px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl hover:bg-purple-500/20 transition-colors border border-purple-500/30"
                >
                  Edit Skill
                </button>
              </div>
            )
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              {filterCategory ? `No skills in ${filterCategory}` : "No skills yet"}
            </p>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Create Your First Skill
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default SkillsManagementPage;
