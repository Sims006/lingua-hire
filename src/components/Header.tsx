import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Users, Briefcase, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  const languages = ["EN", "ES", "FR", "DE", "ZH", "JA", "AR", "PT"];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">GlobalJobs</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#jobs" className="text-foreground hover:text-primary transition-colors">
              Find Jobs
            </a>
            <a href="#talent" className="text-foreground hover:text-primary transition-colors">
              Find Talent
            </a>
            <a href="#companies" className="text-foreground hover:text-primary transition-colors">
              Companies
            </a>
            <a href="#resources" className="text-foreground hover:text-primary transition-colors">
              Resources
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="appearance-none bg-transparent border border-border rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            {/* Role Selection Buttons */}
            <Button variant="ghost" size="sm" className="space-x-2">
              <User className="w-4 h-4" />
              <span>Job Seeker</span>
            </Button>
            <Button variant="professional" size="sm" className="space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Employer</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="#jobs" className="text-foreground hover:text-primary transition-colors">
                Find Jobs
              </a>
              <a href="#talent" className="text-foreground hover:text-primary transition-colors">
                Find Talent
              </a>
              <a href="#companies" className="text-foreground hover:text-primary transition-colors">
                Companies
              </a>
              <a href="#resources" className="text-foreground hover:text-primary transition-colors">
                Resources
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm" className="justify-start space-x-2">
                  <User className="w-4 h-4" />
                  <span>Job Seeker Login</span>
                </Button>
                <Button variant="professional" size="sm" className="justify-start space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Employer Login</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;