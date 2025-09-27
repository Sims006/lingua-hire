import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, MessageSquare, AlertTriangle, TrendingUp, Globe, Activity, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!admin) {
    return <AdminLogin />;
  }

  const quickStats = [
    { label: 'Total Users', value: '589', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Jobs', value: '234', change: '+8%', icon: Briefcase, color: 'text-green-600' },
    { label: 'Daily Matches', value: '47', change: '+15%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Flagged Content', value: '3', change: '-2', icon: Flag, color: 'text-red-600' },
  ];

  const recentActivity = [
    { type: 'user_registered', description: 'New job seeker registered', time: '2 minutes ago', status: 'info' },
    { type: 'content_flagged', description: 'Job posting flagged for review', time: '15 minutes ago', status: 'warning' },
    { type: 'match_made', description: '5 new matches created', time: '1 hour ago', status: 'success' },
    { type: 'user_suspended', description: 'User account suspended', time: '2 hours ago', status: 'error' },
  ];

  const pendingTasks = [
    { title: 'Review flagged job posting', priority: 'high', category: 'Content Moderation' },
    { title: 'Update keyword translations', priority: 'medium', category: 'Keywords' },
    { title: 'Process user appeal', priority: 'high', category: 'User Management' },
    { title: 'Weekly analytics report', priority: 'low', category: 'Analytics' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
          <h1 className="text-3xl font-bold">Welcome back, {admin.username}!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your multilingual job platform today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') && stat.label === 'Flagged Content' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform events and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' :
                        task.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.category}</span>
                    </div>
                    <p className="text-sm font-medium">{task.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/admin/users">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Users</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/admin/jobs">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm">Review Jobs</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/admin/keywords">
                  <Globe className="h-6 w-6" />
                  <span className="text-sm">Keywords</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/admin/chats">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Monitor Chats</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/admin/analytics">
                  <Activity className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">Moderation</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}