import { useState } from "react";
import { useExperiences } from "@/hooks/useExperiences";
import { LoadingSpinner } from "@/components/common";
import { ExperienceModal } from "@/components/admin/ExperienceModal";
import { useNavigate } from "react-router-dom";
import type { Experience } from "@/types/portfolio.types";

const ExperienceManagementPage = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useExperiences();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const experiences = data?.experiences || [];

  const handleCreate = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    const d = new Date(parseInt(date));
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
                  Experience Management
                </h1>
                <p className="text-gray-400">💼 Manage your work experience</p>
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
                  + New Experience
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            exp && (
              <div
                key={exp.id}
                className="relative group bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/30">
                          CURRENT
                        </span>
                      )}
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30">
                        {exp.employmentType?.replace('_', '-').toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                    <p className="text-purple-300 mb-1">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-3">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    <button
                      onClick={() => handleEdit(exp as Experience)}
                      className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl hover:bg-purple-500/20 transition-colors border border-purple-500/30"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{exp.description}</p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">Responsibilities:</h4>
                    <ul className="space-y-1">
                      {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                      {exp.responsibilities.length > 3 && (
                        <li className="text-gray-500 text-sm">+{exp.responsibilities.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill?.id}
                        className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30"
                      >
                        {skill?.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No experience yet</p>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ExperienceModal
        experience={selectedExperience}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ExperienceManagementPage;
