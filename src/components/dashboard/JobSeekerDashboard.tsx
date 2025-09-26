import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bell, FileText, Search, Heart, MessageSquare, Star, MapPin, Building2, Clock, Edit } from "lucide-react";

const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const matchedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Global",
      location: "Remote",
      salary: "$80k - $120k",
      match: 92,
      type: "Full-time",
      posted: "2 days ago",
      saved: false
    },
    {
      id: 2,
      title: "React Developer",
      company: "StartupHub",
      location: "San Francisco, CA",
      salary: "$70k - $100k",
      match: 87,
      type: "Full-time",
      posted: "1 week ago",
      saved: true
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "InnovateLab",
      location: "London, UK",
      salary: "£60k - £90k",
      match: 78,
      type: "Contract",
      posted: "3 days ago",
      saved: false
    }
  ];

  const notifications = [
    { id: 1, type: "match", message: "New job match found: Senior React Developer at TechFlow", time: "2 hours ago" },
    { id: 2, type: "message", message: "Employer requested to connect from GlobalCorp", time: "1 day ago" },
    { id: 3, type: "application", message: "Your application for Frontend Lead was viewed", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Job Seeker Dashboard</h1>
            <p className="text-muted-foreground">Manage your profile and discover global opportunities</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications (3)
            </Button>
            <Button variant="hero" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="jobs">Matched Jobs</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Profile Views</p>
                      <p className="text-2xl font-bold text-foreground">127</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Job Matches</p>
                      <p className="text-2xl font-bold text-foreground">23</p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Notifications */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card className="p-6 text-center">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Update Resume</h3>
                <p className="text-sm text-muted-foreground mb-4">Keep your profile current</p>
                <Button variant="outline" size="sm" className="w-full">Edit Resume</Button>
              </Card>
              
              <Card className="p-6 text-center">
                <Search className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Browse Jobs</h3>
                <p className="text-sm text-muted-foreground mb-4">Discover new opportunities</p>
                <Button variant="outline" size="sm" className="w-full">Search Jobs</Button>
              </Card>
              
              <Card className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Messages</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect with employers</p>
                <Button variant="outline" size="sm" className="w-full">View Messages</Button>
              </Card>
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Resume Creation Wizard</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="w-full" />
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Basic Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm">Personal Details ✓</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm">Contact Information ✓</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span className="text-sm text-muted-foreground">Professional Summary</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Experience & Skills</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm">Work Experience ✓</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span className="text-sm text-muted-foreground">Skills & Certifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span className="text-sm text-muted-foreground">Languages</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <Button variant="hero" size="lg">Continue Building Resume</Button>
                  <Button variant="outline" size="lg">Preview Resume</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Matched Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Matched Jobs ({matchedJobs.length})</h2>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search More
                </Button>
              </div>
              
              <div className="space-y-4">
                {matchedJobs.map((job) => (
                  <Card key={job.id} className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            {job.match}% Match
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{job.type}</Badge>
                          <span className="text-sm font-medium text-foreground">{job.salary}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Heart className={`w-4 h-4 ${job.saved ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                        <Button variant="hero" size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Notification Center</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-foreground">{notification.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">Mark as Read</Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;