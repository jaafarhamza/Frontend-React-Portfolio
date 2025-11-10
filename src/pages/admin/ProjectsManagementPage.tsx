import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { LoadingSpinner } from "@/components/common";
import { ProjectModal } from "@/components/admin/ProjectModal";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/portfolio.types";

const ProjectsManagementPage = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = data?.projects || [];

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Projects Management
                </h1>
                <p className="text-gray-400">🚀 Manage your portfolio projects</p>
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/20"
                >
                  + New Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            project && (
              <div
                key={project.id}
                className="relative group bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  {project.imageUrls?.[0] ? (
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-400/30 text-6xl">
                      {'</>'}
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-lg">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills?.slice(0, 3).map((skill) => (
                      <span
                        key={skill?.id}
                        className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30"
                      >
                        {skill?.name}
                      </span>
                    ))}
                    {(project.skills?.length || 0) > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-400">+{(project.skills?.length || 0) - 3}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleEdit(project as Project)}
                    className="w-full px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl hover:bg-purple-500/20 transition-colors border border-purple-500/30"
                  >
                    Edit Project
                  </button>
                </div>
              </div>
            )
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No projects yet</p>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ProjectsManagementPage;
