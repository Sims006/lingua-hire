import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Building, Globe } from "lucide-react";
import heroImage from "@/assets/hero-recruitment.jpg";

const HeroSection = () => {
  const stats = [
    { number: "10M+", label: "Job Seekers", icon: Users },
    { number: "500K+", label: "Employers", icon: Building },
    { number: "50+", label: "Languages", icon: Globe },
  ];

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={heroImage}
          alt="Global recruitment platform"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Connect Global Talent
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Across 50 Languages
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The world's first truly global recruitment platform. Find jobs or hire talent 
            with automatic translation and localized matching.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-strong mb-12 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Job title or skills"
                  className="pl-10 h-12 border-0 bg-secondary/50 focus:bg-white transition-colors"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Location or remote"
                  className="pl-10 h-12 border-0 bg-secondary/50 focus:bg-white transition-colors"
                />
              </div>
              <Button variant="hero" size="lg" className="h-12 w-full">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="px-8">
              I'm Looking for Work
            </Button>
            <Button variant="professional" size="lg" className="px-8">
              I'm Hiring Talent
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;