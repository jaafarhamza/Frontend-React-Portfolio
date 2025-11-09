import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";
import { ProjectCard } from "@/components/features/ProjectCard";
import { LoadingSpinner } from "@/components/common";
import type { Project } from "@/types/portfolio.types";

const ProjectsPage = () => {
  const { data, loading } = useProjects();
  const { data: skillsData } = useSkills();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const projects = data?.projects || [];
  const skills = skillsData?.skills || [];

  const filteredProjects = selectedTech
    ? projects.filter((p) => p?.skills?.some((s) => s?.id === selectedTech))
    : projects;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white font-mono mb-4">
              <span className="text-green-400">&lt;</span>projects<span className="text-green-400">/&gt;</span>
            </h1>
            <p className="text-gray-400 font-mono">
              <span className="text-green-400">// </span>Explore my work and creations
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTech(null)}
              className={`px-4 py-2 font-mono text-sm border transition-all ${
                !selectedTech
                  ? "border-green-400 bg-green-400 text-black"
                  : "border-green-400/30 text-green-400 hover:border-green-400"
              }`}
            >
              ALL
            </button>
            {skills.map((skill) => (
              skill && <button
                key={skill.id}
                onClick={() => setSelectedTech(skill.id || null)}
                className={`px-4 py-2 font-mono text-sm border transition-all ${
                  selectedTech === skill.id
                    ? "border-cyan-400 bg-cyan-400 text-black"
                    : "border-cyan-400/30 text-cyan-400 hover:border-cyan-400"
                }`}
              >
                {skill.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              project && <ProjectCard key={project.id} project={project as Project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-mono text-lg">
                <span className="text-green-400">// </span>No projects found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
