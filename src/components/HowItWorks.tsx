import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, MessageSquare, CheckCircle, Briefcase, FileText, Users, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const jobSeekerSteps = [
    {
      icon: FileText,
      title: "Upload Your Resume",
      description: "Register once by uploading your resume in any of 50+ languages. Our AI extracts your skills, experience, and qualifications.",
    },
    {
      icon: TrendingUp,
      title: "AI Analysis",
      description: "Our system analyzes your profile and automatically categorizes your skills, experience level, and job preferences.",
    },
    {
      icon: CheckCircle,
      title: "Auto-Match",
      description: "You're instantly matched with relevant job postings based on keywords, skills, and experience - no manual searching needed.",
    },
    {
      icon: MessageSquare,
      title: "Get Contacted",
      description: "Employers see your match and reach out directly. All communication is translated automatically to your language.",
    },
  ];

  const employerSteps = [
    {
      icon: Briefcase,
      title: "Post Your Job",
      description: "Submit your job requirements, including skills needed, experience level, and responsibilities. Posted in your language, translated automatically.",
    },
    {
      icon: TrendingUp,
      title: "AI Matching",
      description: "Our system instantly analyzes your job posting and matches it with qualified candidates based on keywords and skill compatibility.",
    },
    {
      icon: Users,
      title: "Receive Matches",
      description: "Get a curated list of matched candidates who meet your requirements - no need to browse thousands of resumes.",
    },
    {
      icon: CheckCircle,
      title: "Contact & Hire",
      description: "Review matched profiles and contact candidates directly. All communication is automatically translated to both languages.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Automatic Matching Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI does the work for you - no manual searching required
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Job Seekers Process */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              For Job Seekers
            </h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-all">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                          <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Employers Process */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              For Employers
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-accent hover:shadow-md transition-all">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold text-accent">Step {index + 1}</span>
                          <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
