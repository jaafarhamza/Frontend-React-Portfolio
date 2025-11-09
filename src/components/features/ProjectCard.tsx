import type { Project } from "@/types/portfolio.types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative border border-green-400/30 bg-black/70 backdrop-blur-sm overflow-hidden hover:border-green-400 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-black">
        {project.imageUrls?.[0] ? (
          <img 
            src={project.imageUrls[0]} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-green-400/30 font-mono text-6xl">
            {'</>'}
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-green-400 text-black text-xs font-mono font-bold">
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white font-mono mb-2 group-hover:text-green-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm font-mono line-clamp-3">
            <span className="text-green-400">// </span>{project.description}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {project.skills?.slice(0, 4).map((skill) => (
            <span 
              key={skill.id}
              className="px-2 py-1 text-xs border border-cyan-400/30 text-cyan-400 font-mono"
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center border border-green-400 text-green-400 font-mono text-sm hover:bg-green-400 hover:text-black transition-all"
            >
              LIVE
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center border border-green-400 text-green-400 font-mono text-sm hover:bg-green-400 hover:text-black transition-all"
            >
              CODE
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
