import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: 'active' | 'flagged' | 'suspended';
  created_at: string;
  applications: number;
}

interface Resume {
  id: string;
  user_email: string;
  title: string;
  keywords: string[];
  status: 'active' | 'flagged' | 'suspended';
  created_at: string;
  matches: number;
}

export default function AdminJobs() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockJobPostings: JobPosting[] = [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        type: 'Full-time',
        status: 'active',
        created_at: '2024-01-15',
        applications: 12
      },
      {
        id: '2',
        title: 'UX Designer',
        company: 'Design Studio',
        location: 'New York',
        type: 'Contract',
        status: 'flagged',
        created_at: '2024-01-10',
        applications: 8
      }
    ];

    const mockResumes: Resume[] = [
      {
        id: '1',
        user_email: 'john@example.com',
        title: 'Senior Frontend Developer',
        keywords: ['React', 'TypeScript', 'Node.js'],
        status: 'active',
        created_at: '2024-01-12',
        matches: 5
      },
      {
        id: '2',
        user_email: 'jane@example.com',
        title: 'UI/UX Designer',
        keywords: ['Figma', 'Sketch', 'Prototyping'],
        status: 'active',
        created_at: '2024-01-08',
        matches: 3
      }
    ];

    setTimeout(() => {
      setJobPostings(mockJobPostings);
      setResumes(mockResumes);
      setLoading(false);
    }, 1000);
  }, []);

  const handleJobAction = (id: string, action: 'suspend' | 'activate' | 'delete', type: 'job' | 'resume') => {
    if (type === 'job') {
      if (action === 'delete') {
        setJobPostings(prev => prev.filter(job => job.id !== id));
      } else {
        setJobPostings(prev => prev.map(job => 
          job.id === id 
            ? { ...job, status: action === 'activate' ? 'active' : 'suspended' }
            : job
        ));
      }
    } else {
      if (action === 'delete') {
        setResumes(prev => prev.filter(resume => resume.id !== id));
      } else {
        setResumes(prev => prev.map(resume => 
          resume.id === id 
            ? { ...resume, status: action === 'activate' ? 'active' : 'suspended' }
            : resume
        ));
      }
    }
    
    toast({
      title: "Content Action",
      description: `${type === 'job' ? 'Job posting' : 'Resume'} has been ${action}d successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'flagged':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Flagged</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredJobs = jobPostings.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResumes = resumes.filter(resume =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage job postings and resumes on the platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobPostings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {[...jobPostings, ...resumes].filter(item => item.status === 'flagged').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {[...jobPostings, ...resumes].filter(item => item.status === 'active').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Monitor and moderate job postings and resumes</CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="jobs" className="space-y-4">
              <TabsList>
                <TabsTrigger value="jobs">Job Postings</TabsTrigger>
                <TabsTrigger value="resumes">Resumes</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs">
                {loading ? (
                  <div className="text-center py-8">Loading job postings...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{job.type}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(job.status)}</TableCell>
                          <TableCell>{job.applications}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleJobAction(job.id, 'delete', 'job')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="resumes">
                {loading ? (
                  <div className="text-center py-8">Loading resumes...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Keywords</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Matches</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResumes.map((resume) => (
                        <TableRow key={resume.id}>
                          <TableCell className="font-medium">{resume.title}</TableCell>
                          <TableCell>{resume.user_email}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {resume.keywords.slice(0, 3).map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                              {resume.keywords.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{resume.keywords.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(resume.status)}</TableCell>
                          <TableCell>{resume.matches}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleJobAction(resume.id, 'delete', 'resume')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}