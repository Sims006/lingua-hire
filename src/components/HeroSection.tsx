import { Button } from "@/components/ui/button";
import { Users, Building, Zap, Target, Globe } from "lucide-react";
import heroImage from "@/assets/hero-recruitment.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Zap, label: "Automatic Matching" },
    { icon: Target, label: "Skill-Based Pairing" },
    { icon: Globe, label: "50+ Languages" },
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
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              No More Job Hunting.
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                We Match You Automatically
              </span>
            </h1>

            {/* Service Explanation */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12 max-w-3xl mx-auto">
              <p className="text-lg text-foreground mb-4 font-medium">
                Our AI-powered platform automatically connects job seekers with the perfect opportunities.
              </p>
              <p className="text-muted-foreground">
                <strong>Job Seekers:</strong> Upload your resume once. Our system analyzes your skills and experience, then automatically matches you with relevant positions across 50+ languages.
              </p>
              <p className="text-muted-foreground mt-3">
                <strong>Employers:</strong> Post your job requirements. We instantly match you with qualified candidates based on skills, experience, and language proficiency.
              </p>
              <p className="text-sm text-primary font-semibold mt-4">
                No manual searching. No endless applications. Just smart, automated matching.
              </p>
            </div>
          </div>

          {/* Two Main Action Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Job Seeker Card */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">I'm a Job Seeker</h2>
                <p className="text-muted-foreground mb-6">
                  Upload your resume and let our AI find the perfect job matches for you automatically
                </p>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => navigate('/resume-builder')}
                >
                  Register My Resume
                </Button>
              </div>
            </div>

            {/* Employer Card */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">I'm an Employer</h2>
                <p className="text-muted-foreground mb-6">
                  Post your job requirements and receive matched candidates instantly
                </p>
                <Button 
                  variant="professional" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => navigate('/post-job')}
                >
                  Post a Job
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature.label}</span>
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