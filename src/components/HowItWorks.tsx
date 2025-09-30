import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, MessageSquare, CheckCircle, Briefcase, FileText, Users, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const jobSeekerSteps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up and build your profile in your native language. Our platform automatically translates it to 50+ languages.",
    },
    {
      icon: Search,
      title: "Search & Match",
      description: "Browse jobs from around the world. Smart matching connects you with opportunities that fit your skills.",
    },
    {
      icon: MessageSquare,
      title: "Apply & Chat",
      description: "Apply to jobs with one click. Communicate with employers in your language with automatic translation.",
    },
    {
      icon: CheckCircle,
      title: "Get Hired",
      description: "Land your dream job with companies from around the globe, no language barriers.",
    },
  ];

  const employerSteps = [
    {
      icon: Briefcase,
      title: "Post a Job",
      description: "Create a job posting in your language. It's automatically translated and published globally.",
    },
    {
      icon: Users,
      title: "Find Candidates",
      description: "Our AI matches your job with qualified candidates from 50+ countries, all in real-time.",
    },
    {
      icon: FileText,
      title: "Review Applications",
      description: "View translated resumes and profiles. Communicate seamlessly with candidates worldwide.",
    },
    {
      icon: TrendingUp,
      title: "Hire Top Talent",
      description: "Select the best candidate and grow your team with global talent.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect globally in four simple steps, regardless of your language
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
