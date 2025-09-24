import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Award, User, MessageCircle } from "lucide-react";

const ResumesSection = () => {
  const featuredTalent = [
    {
      id: 1,
      name: "Maria Rodriguez",
      title: "Senior Frontend Developer",
      location: "Barcelona, Spain",
      experience: "8 years",
      rate: "€45/hour",
      rating: 4.9,
      completedProjects: 127,
      skills: ["React", "Vue.js", "TypeScript", "UI/UX"],
      isAvailable: true,
      languages: ["Spanish", "English", "French"],
    },
    {
      id: 2,
      name: "Hiroshi Tanaka",
      title: "Full Stack Engineer",
      location: "Tokyo, Japan",
      experience: "6 years",
      rate: "¥5,500/hour",
      rating: 4.8,
      completedProjects: 89,
      skills: ["Node.js", "Python", "AWS", "Docker"],
      isAvailable: false,
      languages: ["Japanese", "English"],
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "Marketing Strategist",
      location: "New York, USA",
      experience: "10 years",
      rate: "$65/hour",
      rating: 5.0,
      completedProjects: 203,
      skills: ["Digital Marketing", "SEO", "Analytics", "Content"],
      isAvailable: true,
      languages: ["English", "Spanish"],
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      title: "Data Scientist",
      location: "Cairo, Egypt",
      experience: "5 years",
      rate: "$40/hour",
      rating: 4.7,
      completedProjects: 67,
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      isAvailable: true,
      languages: ["Arabic", "English", "French"],
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Global Talent
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with top professionals from around the world. All profiles 
            automatically translated and verified.
          </p>
        </div>

        {/* Talent Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {featuredTalent.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-all duration-300 bg-white border-l-4 border-l-accent/20 hover:border-l-accent">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {person.name}
                      </h3>
                      <p className="text-muted-foreground">{person.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{person.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {person.completedProjects} projects
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{person.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{person.experience} exp</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{person.rate}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">Languages: </span>
                  {person.languages.join(", ")}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {person.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {person.isAvailable && (
                    <Badge className="bg-accent text-accent-foreground text-xs">
                      Available Now
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Response time: 2-4 hours
                  </span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="default" size="sm">
                      Hire Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Talent Button */}
        <div className="text-center">
          <Button variant="professional" size="lg" className="px-8">
            Browse All Talent ({(Math.random() * 100000 + 50000).toFixed(0).toLocaleString()})
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumesSection;