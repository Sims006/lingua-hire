import { Globe, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "For Job Seekers",
      links: [
        "Browse Jobs",
        "Create Resume",
        "Career Advice",
        "Salary Guide",
        "Interview Tips"
      ]
    },
    {
      title: "For Employers",
      links: [
        "Post Jobs",
        "Browse Resumes",
        "Pricing Plans",
        "Recruitment Tools",
        "Company Profiles"
      ]
    },
    {
      title: "Global Support",
      links: [
        "Help Center",
        "Contact Support",
        "Language Settings",
        "Local Guidelines",
        "Community Forum"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Press Room",
        "Partner Program",
        "Affiliate Program"
      ]
    }
  ];

  const languages = [
    "English", "Español", "Français", "Deutsch", "中文", 
    "日本語", "العربية", "Português", "Русский", "हिंदी"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">GlobalJobs</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 text-sm">
                Connecting global talent across 50+ languages. 
                Find your dream job or hire the perfect candidate anywhere in the world.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Language Selection & Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Language Selector */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-primary-foreground/80">Available in:</span>
              {languages.slice(0, 5).map((lang, index) => (
                <a key={index} href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  {lang}
                </a>
              ))}
              <span className="text-primary-foreground/60">+ 45 more</span>
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-primary-foreground/80">
              <span>© {currentYear} GlobalJobs. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;