import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  type = "website",
  author
}: SEOHeadProps) => {
  const location = useLocation();
  const { data } = useProfile();
  const profile = data?.profile;
  
  const finalTitle = title || `${profile?.fullName || "Portfolio"} - ${profile?.title || "Full Stack Developer"}`;
  const finalDescription = description || profile?.bio || "Professional portfolio showcasing innovative web development projects, technical skills, and professional experience.";
  const finalKeywords = keywords || "portfolio, web developer, full stack developer, react developer, typescript, javascript, node.js, software engineer, frontend developer, backend developer";
  const finalAuthor = author || profile?.fullName || "Portfolio Developer";
  const siteUrl = window.location.origin;
  const currentUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", finalDescription);
    updateMetaTag("keywords", finalKeywords);
    updateMetaTag("author", finalAuthor);
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "English");
    updateMetaTag("revisit-after", "7 days");

    // Open Graph meta tags
    updateMetaTag("og:title", finalTitle, true);
    updateMetaTag("og:description", finalDescription, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:image", `${siteUrl}${image}`, true);
    updateMetaTag("og:site_name", "Portfolio", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", finalTitle);
    updateMetaTag("twitter:description", finalDescription);
    updateMetaTag("twitter:image", `${siteUrl}${image}`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);
  }, [finalTitle, finalDescription, finalKeywords, image, type, finalAuthor, currentUrl, siteUrl]);

  return null;
};
