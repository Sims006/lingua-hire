import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building, Users, Bookmark } from "lucide-react";

const JobListings = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechGlobal Inc.",
      location: "Remote • Global",
      type: "Full-time",
      salary: "$80k - $120k",
      posted: "2 days ago",
      skills: ["React", "Node.js", "TypeScript"],
      applicants: 47,
      isUrgent: true,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Design Studios",
      location: "London, UK",
      type: "Contract",
      salary: "£45k - £65k",
      posted: "1 day ago",
      skills: ["Figma", "Sketch", "Prototyping"],
      applicants: 23,
      isUrgent: false,
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "Global Marketing Co.",
      location: "New York, NY",
      type: "Full-time",
      salary: "$70k - $90k",
      posted: "3 days ago",
      skills: ["Digital Marketing", "SEO", "Analytics"],
      applicants: 34,
      isUrgent: false,
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Remote • Europe",
      type: "Full-time",
      salary: "€60k - €85k",
      posted: "1 day ago",
      skills: ["Python", "Machine Learning", "SQL"],
      applicants: 56,
      isUrgent: true,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities from companies worldwide, automatically translated 
            and matched to your skills.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.isUrgent && (
                    <Badge className="bg-accent text-accent-foreground text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{job.posted}</span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Jobs Button */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="px-8">
            View All Jobs ({(Math.random() * 50000 + 10000).toFixed(0).toLocaleString()})
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;