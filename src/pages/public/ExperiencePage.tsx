import { useExperiences } from "@/hooks/useExperiences";
import { LoadingSpinner } from "@/components/common";

const ExperiencePage = () => {
  const { data, loading } = useExperiences();
  const experiences = data?.experiences || [];

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    const d = new Date(parseInt(date));
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getEmploymentTypeLabel = (type: string | undefined) => {
    if (!type) return 'N/A';
    const labels: Record<string, string> = {
      full_time: 'Full-time',
      part_time: 'Part-time',
      contract: 'Contract',
      freelance: 'Freelance',
      internship: 'Internship'
    };
    return labels[type] || type;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-mono mb-4">
              <span className="text-green-400">&lt;</span>experience<span className="text-green-400">/&gt;</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm sm:text-base">
              <span className="text-green-400">// </span>My professional journey
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-green-400/30 transform -translate-x-1/2"></div>

            {/* Experiences */}
            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => {
                if (!exp) return null;
                const isLeft = index % 2 === 0;
                
                return (
                  <div key={exp.id || index} className="relative">
                    {/* Timeline Node */}
                    <div className="hidden lg:flex absolute left-1/2 top-8 w-4 h-4 bg-green-400 border-4 border-black rounded-full transform -translate-x-1/2 z-10">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse-ring"></div>
                    </div>

                    {/* Content Card */}
                    <div className={`lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                      <div className="group border border-green-400/30 bg-black/70 backdrop-blur-sm p-4 sm:p-6 hover:border-green-400 transition-all duration-300">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {exp.current && (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-400/20 border border-green-400">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-green-400 text-xs font-mono font-bold">CURRENT</span>
                                </div>
                              )}
                              <span className="text-cyan-400 text-xs font-mono px-2 py-1 border border-cyan-400/30">
                                {getEmploymentTypeLabel(exp.employmentType)}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                              {exp.position}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2 text-gray-400 font-mono text-sm">
                              {exp.companyUrl ? (
                                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                                  {exp.company}
                                  <span className="text-xs">↗</span>
                                </a>
                              ) : (
                                <span className="text-cyan-400">{exp.company}</span>
                              )}
                              <span className="hidden sm:inline text-green-400">•</span>
                              <span>{exp.location}</span>
                            </div>
                          </div>
                          <div className="text-gray-400 font-mono text-xs sm:text-sm">
                            <span className="text-yellow-400">[</span>
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            <span className="text-yellow-400">]</span>
                            {/* Debug: {exp.startDate} | {exp.endDate} */}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 font-mono text-sm mb-4">
                          <span className="text-green-400">// </span>{exp.description}
                        </p>

                        {/* Responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white font-mono text-sm mb-2 flex items-center gap-2">
                              <span className="text-green-400">{'>'}</span> Responsibilities
                            </h4>
                            <ul className="space-y-1.5 ml-4">
                              {exp.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-gray-400 font-mono text-xs sm:text-sm flex items-start gap-2">
                                  <span className="text-green-400 mt-1">-</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white font-mono text-sm mb-2 flex items-center gap-2">
                              <span className="text-cyan-400">{'>'}</span> Achievements
                            </h4>
                            <ul className="space-y-1.5 ml-4">
                              {exp.achievements.map((ach, idx) => (
                                <li key={idx} className="text-gray-400 font-mono text-xs sm:text-sm flex items-start gap-2">
                                  <span className="text-cyan-400 mt-1">★</span>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.skills.map((skill) => (
                              <span key={skill?.id} className="px-2 py-1 text-xs border border-purple-400/30 text-purple-400 font-mono">
                                {skill?.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-mono text-lg">
                <span className="text-green-400">// </span>No experience data available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
