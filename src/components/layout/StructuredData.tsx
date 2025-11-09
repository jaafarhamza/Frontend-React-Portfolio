import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useSkills } from "@/hooks/useSkills";

interface StructuredDataProps {
  type?: "Person" | "WebSite" | "Organization";
  data?: Record<string, unknown>;
}

export const StructuredData = ({ type = "Person", data }: StructuredDataProps) => {
  const { data: profileData } = useProfile();
  const { data: skillsData } = useSkills();
  const profile = profileData?.profile;
  const skills = skillsData?.skills;
  
  useEffect(() => {
    const defaultPersonData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile?.fullName || "Portfolio Developer",
      jobTitle: profile?.title || "Full Stack Developer",
      email: profile?.email,
      telephone: profile?.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile?.location
      },
      url: window.location.origin,
      image: profile?.avatarUrl,
      sameAs: profile?.socialLinks?.map(link => link?.url).filter(Boolean) || [],
      knowsAbout: skills?.map(skill => skill?.name).filter(Boolean) || ["Web Development", "React", "TypeScript"],
      description: profile?.bio || "Professional full stack developer specializing in modern web technologies"
    };

    const defaultWebSiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Portfolio",
      url: window.location.origin,
      description: "Professional portfolio showcasing web development projects and skills",
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    const structuredData = data || (type === "Person" ? defaultPersonData : defaultWebSiteData);

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type, data, profile, skills]);

  return null;
};
