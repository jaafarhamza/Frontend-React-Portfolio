import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/skills", label: "Skills" },
    { path: "/experience", label: "Experience" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md border-b border-green-400/30" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold font-mono text-green-400 hover:text-cyan-400 transition-colors"
            aria-label="Home - Portfolio"
          >
            <span className="text-white">&lt;</span>
            Portfolio
            <span className="text-white">/&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`font-mono text-sm transition-colors relative group ${
                    isActive(path) ? "text-green-400" : "text-gray-400 hover:text-white"
                  }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <span className="text-green-400">//</span> {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all ${
                    isActive(path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin/login"
                className="px-4 py-2 border border-green-400 text-green-400 font-mono text-sm hover:bg-green-400 hover:text-black transition-all"
                aria-label="Admin Login"
              >
                ADMIN
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-3 border-t border-green-400/30 pt-4 bg-black/90 backdrop-blur-md">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-mono text-sm transition-colors ${
                    isActive(path) ? "text-green-400" : "text-gray-400 hover:text-white"
                  }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <span className="text-green-400">//</span> {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 border border-green-400 text-green-400 font-mono text-sm text-center hover:bg-green-400 hover:text-black transition-all"
              >
                ADMIN
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
    
    {/* Developer Note */}
    <div className="fixed top-20 right-6 z-40 bg-black/90 border border-green-400/30 px-4 py-2 font-mono text-xs text-gray-400 backdrop-blur-sm">
      <span className="text-green-400">// </span>I'm a developer, 
      <svg className="inline w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      /
      <svg className="inline w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      mode doesn't work
    </div>
    </>
  );
};
