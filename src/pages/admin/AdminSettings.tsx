import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Globe, Shield, Bell, Database, Mail, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platform: {
      name: 'Global Job Platform',
      description: 'Multilingual job and freelancer matching platform',
      timezone: 'UTC',
      default_language: 'en',
      auto_translation: true,
      max_keywords_per_posting: 10,
      max_keywords_per_resume: 15,
    },
    security: {
      require_email_verification: false,
      session_timeout: 24,
      max_login_attempts: 5,
      password_min_length: 8,
      two_factor_auth: false,
    },
    notifications: {
      email_notifications: true,
      push_notifications: false,
      admin_alerts: true,
      daily_reports: true,
      weekly_summaries: true,
    },
    moderation: {
      auto_flag_content: true,
      keyword_filtering: true,
      manual_approval: false,
      retention_days: 90,
    },
  });

  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `${section} settings have been saved successfully.`,
    });
  };

  const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ar', name: 'Arabic' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>

        <Tabs defaultValue="platform" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="platform" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Platform</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Languages</span>
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Moderation</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platform" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>Basic platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input
                      id="platform-name"
                      value={settings.platform.name}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select value={settings.platform.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Platform Description</Label>
                  <Textarea
                    id="description"
                    value={settings.platform.description}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      platform: { ...prev.platform, description: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-keywords-posting">Max Keywords per Job Posting</Label>
                    <Input
                      id="max-keywords-posting"
                      type="number"
                      value={settings.platform.max_keywords_per_posting}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, max_keywords_per_posting: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-keywords-resume">Max Keywords per Resume</Label>
                    <Input
                      id="max-keywords-resume"
                      type="number"
                      value={settings.platform.max_keywords_per_resume}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        platform: { ...prev.platform, max_keywords_per_resume: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Translation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically translate content into supported languages
                    </p>
                  </div>
                  <Switch
                    checked={settings.platform.auto_translation}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      platform: { ...prev.platform, auto_translation: checked }
                    }))}
                  />
                </div>

                <Separator />
                <Button onClick={() => handleSave('Platform')}>Save Platform Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Authentication and security configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={settings.security.session_timeout}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, session_timeout: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input
                      id="max-attempts"
                      type="number"
                      value={settings.security.max_login_attempts}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, max_login_attempts: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Verification Required</Label>
                      <p className="text-sm text-muted-foreground">
                        Require users to verify their email before accessing the platform
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.require_email_verification}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, require_email_verification: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable 2FA for enhanced account security
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.two_factor_auth}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, two_factor_auth: checked }
                      }))}
                    />
                  </div>
                </div>

                <Separator />
                <Button onClick={() => handleSave('Security')}>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.email_notifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email_notifications: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Admin Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Immediate alerts for critical events
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.admin_alerts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, admin_alerts: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Daily Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Daily platform activity summaries
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.daily_reports}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, daily_reports: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Summaries</Label>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive weekly analytics reports
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.weekly_summaries}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, weekly_summaries: checked }
                      }))}
                    />
                  </div>
                </div>

                <Separator />
                <Button onClick={() => handleSave('Notifications')}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language Configuration</CardTitle>
                <CardDescription>Manage supported languages and translation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select value={settings.platform.default_language}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Supported Languages</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {supportedLanguages.map((lang) => (
                      <Badge key={lang.code} variant="secondary" className="justify-center p-2">
                        {lang.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Translation Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Job Postings Translated:</span>
                      <span className="font-medium">2,341</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resumes Translated:</span>
                      <span className="font-medium">4,567</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Keywords Localized:</span>
                      <span className="font-medium">1,234</span>
                    </div>
                  </div>
                </div>

                <Separator />
                <Button onClick={() => handleSave('Languages')}>Save Language Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Configure automatic and manual moderation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-flag Inappropriate Content</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically flag potentially inappropriate content
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.auto_flag_content}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        moderation: { ...prev.moderation, auto_flag_content: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Keyword Filtering</Label>
                      <p className="text-sm text-muted-foreground">
                        Filter content based on prohibited keywords
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.keyword_filtering}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        moderation: { ...prev.moderation, keyword_filtering: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Manual Approval Required</Label>
                      <p className="text-sm text-muted-foreground">
                        Require manual approval for all new content
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.manual_approval}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        moderation: { ...prev.moderation, manual_approval: checked }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention">Data Retention Period (days)</Label>
                  <Input
                    id="retention"
                    type="number"
                    value={settings.moderation.retention_days}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      moderation: { ...prev.moderation, retention_days: parseInt(e.target.value) }
                    }))}
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to keep flagged content before automatic deletion
                  </p>
                </div>

                <Separator />
                <Button onClick={() => handleSave('Moderation')}>Save Moderation Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}