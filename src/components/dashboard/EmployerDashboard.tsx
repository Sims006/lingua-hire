import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bell, Plus, Search, Users, MessageSquare, Star, MapPin, Calendar, Eye, Edit } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      salary: "$80k - $120k",
      applications: 23,
      views: 156,
      status: "Active",
      posted: "3 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      salary: "$90k - $130k",
      applications: 45,
      views: 289,
      status: "Active",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      salary: "$70k - $100k",
      applications: 67,
      views: 234,
      status: "Closed",
      posted: "2 weeks ago"
    }
  ];

  const matchedCandidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "6 years",
      match: 94,
      skills: ["React", "TypeScript", "Node.js"],
      availability: "Available now",
      matchedKeywords: ["React", "TypeScript", "Frontend Developer"],
      candidateKeywords: ["React", "TypeScript", "Frontend Developer", "JavaScript", "CSS"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Full Stack Engineer",
      location: "Remote",
      experience: "5 years",
      match: 87,
      skills: ["React", "Python", "AWS"],
      availability: "2 weeks notice",
      matchedKeywords: ["React", "Python"],
      candidateKeywords: ["React", "Python", "AWS", "Docker", "PostgreSQL"]
    },
    {
      id: 3,
      name: "Ana Rodriguez",
      title: "Frontend Developer",
      location: "Madrid, Spain",
      experience: "4 years",
      match: 82,
      skills: ["Vue.js", "JavaScript", "CSS"],
      availability: "Available now",
      matchedKeywords: ["JavaScript", "Frontend Developer"],
      candidateKeywords: ["Vue.js", "JavaScript", "CSS", "HTML", "Sass"]
    }
  ];

  const notifications = [
    { id: 1, type: "application", message: "New application for Senior Frontend Developer position", time: "1 hour ago" },
    { id: 2, type: "match", message: "High match candidate found for Product Manager role", time: "3 hours ago" },
    { id: 3, type: "message", message: "Candidate Sarah Chen sent a message", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-secondary/30 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage job postings and discover global talent</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications (3)
            </Button>
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="postings">Job Postings</TabsTrigger>
            <TabsTrigger value="candidates">Matched Candidates</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Applications</p>
                    <p className="text-2xl font-bold text-foreground">89</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                    <p className="text-2xl font-bold text-foreground">1.2k</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Messages</p>
                    <p className="text-2xl font-bold text-foreground">15</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {matchedCandidates.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.title}</p>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        {candidate.match}% Match
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Job Performance</h3>
                <div className="space-y-4">
                  {jobPostings.slice(0, 3).map((job) => (
                    <div key={job.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-foreground">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.applications} applications</p>
                      </div>
                      <Progress value={(job.applications / 50) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card className="p-6 text-center">
                <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Create Job Posting</h3>
                <p className="text-sm text-muted-foreground mb-4">Start hiring global talent</p>
                <Button variant="hero" size="sm" className="w-full">Create Posting</Button>
              </Card>
              
              <Card className="p-6 text-center">
                <Search className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Search Candidates</h3>
                <p className="text-sm text-muted-foreground mb-4">Find perfect matches</p>
                <Button variant="outline" size="sm" className="w-full">Browse Resumes</Button>
              </Card>
              
              <Card className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Messages</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect with candidates</p>
                <Button variant="outline" size="sm" className="w-full">View Messages</Button>
              </Card>
            </div>
          </TabsContent>

          {/* Job Postings Tab */}
          <TabsContent value="postings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Job Postings ({jobPostings.length})</h2>
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Job
                </Button>
              </div>
              
              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <Card key={job.id} className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {job.posted}
                          </div>
                          <span>{job.salary}</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-sm">
                            <span className="font-medium text-foreground">{job.applications}</span>
                            <span className="text-muted-foreground"> applications</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-foreground">{job.views}</span>
                            <span className="text-muted-foreground"> views</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="hero" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Applications
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Matched Candidates Tab */}
          <TabsContent value="candidates">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Matched Candidates ({matchedCandidates.length})</h2>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search More
                </Button>
              </div>
              
              <div className="space-y-4">
                {matchedCandidates.map((candidate) => (
                  <Card key={candidate.id} className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{candidate.name}</h3>
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            {candidate.match}% Match
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{candidate.title}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {candidate.location}
                          </div>
                          <span>{candidate.experience} experience</span>
                          <span className="text-accent">{candidate.availability}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Keyword Match Display */}
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs text-muted-foreground">Matched:</span>
                            {candidate.matchedKeywords.map((keyword, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-muted-foreground">Additional skills:</span>
                            {candidate.candidateKeywords.filter(k => !candidate.matchedKeywords.includes(k)).map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        {candidate.match >= 80 ? (
                          <Button variant="hero" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message Request
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Low Match ({candidate.match}%)
                          </Button>
                        )}
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
      <Footer />
    </div>
  );
};

export default EmployerDashboard;