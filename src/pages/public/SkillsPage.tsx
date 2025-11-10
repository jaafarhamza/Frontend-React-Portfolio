import { useState } from "react";
import { useSkills } from "@/hooks/useSkills";
import { LoadingSpinner, DevBackground, DevCursor } from "@/components/common";
import { SEOHead } from "@/components/layout";

const SkillsPage = () => {
  const { data, loading } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const skills = data?.skills || [];

  const categories = [...new Set(skills.map((s) => s?.category).filter(Boolean))];

  const filteredSkills = selectedCategory
    ? skills.filter((s) => s?.category === selectedCategory)
    : skills;

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead
        title="Skills - Portfolio | Technical Expertise"
        description="Comprehensive overview of my technical skills including React, TypeScript, Node.js, AWS, and modern web development technologies with proficiency levels."
        keywords="skills, technical skills, react, typescript, node.js, javascript, web development, programming languages"
      />
      <div className="dev-cursor min-h-screen bg-black relative overflow-hidden pt-20">
      <DevCursor />
      <DevBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white font-mono mb-4">
              <span className="text-green-400">&lt;</span>skills<span className="text-green-400">/&gt;</span>
            </h1>
            <p className="text-gray-400 font-mono">
              <span className="text-green-400">// </span>Technologies and tools I work with
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 font-mono text-sm border transition-all ${
                !selectedCategory
                  ? "border-green-400 bg-green-400 text-black"
                  : "border-green-400/30 text-green-400 hover:border-green-400"
              }`}
            >
              ALL
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category || null)}
                className={`px-4 py-2 font-mono text-sm border transition-all ${
                  selectedCategory === category
                    ? "border-cyan-400 bg-cyan-400 text-black"
                    : "border-cyan-400/30 text-cyan-400 hover:border-cyan-400"
                }`}
              >
                {category?.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((skill) => (
              skill && <div
                key={skill.id}
                className="border border-green-400/30 bg-black/70 backdrop-blur-sm p-6 hover:border-green-400 transition-all"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-mono font-bold">{skill.name}</span>
                  <span className="text-green-400 font-mono text-sm">{skill.level}/5</span>
                </div>
                <div className="h-2 bg-gray-800 relative overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-400 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${((skill.level || 0) / 5) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SkillsPage;
