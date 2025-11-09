import { useProfile } from "@/hooks/useProfile";
import { useSkills } from "@/hooks/useSkills";
import { LoadingSpinner, DevBackground, DevCursor } from "@/components/common";
import { SEOHead, StructuredData } from "@/components/layout";

const HomePage = () => {
  const { data, loading } = useProfile();
  const { data: skillsData, loading: skillsLoading } = useSkills();

  const profile = data?.profile || {
    fullName: "John Doe",
    title: "Full Stack Developer",
    bio: "Crafting elegant code solutions. Building the future, one commit at a time.",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    phone: "",
    avatarUrl: "https://via.placeholder.com/200",
    socialLinks: []
  };

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, { icon: string; color: string }> = {
      GitHub: { icon: "</>", color: "#00ff41" },
      LinkedIn: { icon: "in", color: "#00d9ff" },
      Twitter: { icon: "@", color: "#ff00ff" },
      Facebook: { icon: "f", color: "#1877f2" },
      Instagram: { icon: "ig", color: "#e4405f" }
    };
    return icons[platform] || { icon: "#", color: "#00ff41" };
  };

  const skills = skillsData?.skills || [];

  if (loading || skillsLoading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead
        title={`${profile.fullName} - ${profile.title} | Portfolio`}
        description={profile.bio}
        keywords="portfolio, web developer, full stack developer, react, typescript, javascript"
      />
      <StructuredData type="Person" />
      <div className="dev-cursor min-h-screen bg-black relative overflow-hidden pt-20">
      <DevCursor />
      <DevBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Terminal Style Profile */}
            <div className="space-y-8">
              {/* Terminal Header */}
              <div className="border border-green-400/30 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-green-400/30">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-green-400 text-xs font-mono">~/portfolio</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">$</span>
                    <span className="text-gray-400">cat profile.json</span>
                  </div>
                  <div className="pl-4 text-green-400 space-y-1">
                    <div><span className="text-cyan-400">"name"</span>: <span className="text-yellow-400">"{profile.fullName}"</span>,</div>
                    <div><span className="text-cyan-400">"role"</span>: <span className="text-yellow-400">"{profile.title}"</span>,</div>
                    <div><span className="text-cyan-400">"email"</span>: <span className="text-yellow-400">"{profile.email}"</span>,</div>
                    <div><span className="text-cyan-400">"phone"</span>: <span className="text-yellow-400">"{profile.phone}"</span>,</div>
                    <div><span className="text-cyan-400">"location"</span>: <span className="text-yellow-400">"{profile.location}"</span>,</div>
                    <div><span className="text-cyan-400">"status"</span>: <span className="text-green-400">"available"</span></div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white font-mono tracking-tight">
                  <span className="text-green-400">&lt;</span>
                  {profile?.fullName?.toLowerCase().replace(/ /g, "_")}
                  <span className="text-green-400">/&gt;</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xl text-gray-400 font-mono">{profile.title}</p>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed font-mono">
                  <span className="text-green-400">// </span>{profile.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {profile.socialLinks?.map((link) => {
                  const { color } = getSocialIcon(link?.platform || "");
                  return (
                    <a
                      key={link?.platform}
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-4 py-3 border border-green-400/30 bg-black/50 flex items-center justify-center font-mono font-bold hover:border-green-400 transition-all duration-300"
                      style={{ color }}
                    >
                      <span className="relative z-10 text-sm">{link?.platform}</span>
                      <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/10 transition-all"></div>
                    </a>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="group relative px-8 py-4 border-2 border-green-400 text-green-400 font-mono font-bold overflow-hidden transition-all duration-300 hover:text-black"
                >
                  <span className="relative z-10">CONTACT()</span>
                  <div className="absolute inset-0 bg-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </a>
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 border-2 border-green-400 text-green-400 font-mono font-bold overflow-hidden transition-all duration-300 hover:text-black"
                  >
                    <span className="relative z-10">RESUME()</span>
                    <div className="absolute inset-0 bg-green-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                )}
              </div>
            </div>

            {/* Right - Code Editor Style */}
            <div className="relative">
              {/* Avatar */}
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-52 h-65 rounded-xl border border-white bg-black/70 backdrop-blur-sm overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(92% - 24px) 0, 100% 24px, 100% 100%, 0 100%)' }}>
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.fullName} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-l-3 border-b border-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
                </div>
              </div>

              {/* Floating Code Blocks */}
              <div className="space-y-4">
                <div className="border border-cyan-400/30 bg-black/70 backdrop-blur-sm p-6 animate-float">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-cyan-400 text-xs font-mono">skills.ts</span>
                  </div>
                  <pre className="text-sm font-mono">
                    <code className="text-gray-400">
                      <span className="text-purple-400">const</span> <span className="text-cyan-400">skills</span> = [<br/>
                      {skills.length > 0 ? skills.map((skill, idx) => (
                        <span key={skill?.id}>
                          {'  '}<span className="text-yellow-400">"{skill?.name}"</span>{idx < skills.length - 1 ? ',' : ''}<br/>
                        </span>
                      )) : (
                        <>
                          {'  '}<span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"Node.js"</span>,<br/>
                          {'  '}<span className="text-yellow-400">"TypeScript"</span>, <span className="text-yellow-400">"AWS"</span><br/>
                        </>
                      )}
                      ];
                    </code>
                  </pre>
                </div>

                <div className="border border-purple-400/30 bg-black/70 backdrop-blur-sm p-6 animate-float animation-delay-4000">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400 text-xs font-mono">status.json</span>
                  </div>
                  <pre className="text-sm font-mono text-gray-400">
                    {'{'}"availability": <span className="text-green-400">true</span>{'}'}
                  </pre>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-green-400/20 animate-spin-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-cyan-400/20 animate-spin-slow-reverse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
