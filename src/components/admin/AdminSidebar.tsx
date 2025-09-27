import { NavLink, useLocation } from 'react-router-dom';
import { Users, Briefcase, Hash, MessageSquare, BarChart3, Settings, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Users', url: '/admin/users', icon: Users, description: 'Manage job seekers and employers' },
  { title: 'Jobs', url: '/admin/jobs', icon: Briefcase, description: 'Manage job postings and resumes' },
  { title: 'Keywords', url: '/admin/keywords', icon: Hash, description: 'Manage matching keywords' },
  { title: 'Chats', url: '/admin/chats', icon: MessageSquare, description: 'Monitor communications' },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart3, description: 'View platform statistics' },
  { title: 'Settings', url: '/admin/settings', icon: Settings, description: 'System configuration' },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { admin, logout } = useAdminAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Portal</h2>
            <p className="text-sm text-muted-foreground">Platform Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-4">
          <div className="text-sm">
            <div className="font-medium">{admin?.username}</div>
            <div className="text-muted-foreground">{admin?.email}</div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};