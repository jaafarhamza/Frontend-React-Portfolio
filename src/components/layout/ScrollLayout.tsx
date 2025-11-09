import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface ScrollLayoutProps {
  children: React.ReactNode;
}

export const ScrollLayout = ({ children }: ScrollLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        const { offsetTop, offsetHeight } = section;
        const sectionId = section.getAttribute("data-route");
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (location.pathname !== sectionId) {
            isScrollingRef.current = true;
            navigate(sectionId || "/", { replace: true });
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, navigate]);

  useEffect(() => {
    const section = sectionsRef.current.find(
      (s) => s?.getAttribute("data-route") === location.pathname
    );
    
    if (section && !isScrollingRef.current) {
      isScrollingRef.current = true;
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { isScrollingRef.current = false; }, 1000);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        {Array.isArray(children) ? children.map((child, index) => (
          <div
            key={index}
            ref={(el) => { if (el) sectionsRef.current[index] = el; }}
            data-route={child.props["data-route"]}
          >
            {child}
          </div>
        )) : children}
      </main>
      <Footer />
    </>
  );
};
