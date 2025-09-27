import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageSquare, Eye, Flag, Ban, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface ChatConversation {
  id: string;
  job_seeker_email: string;
  employer_email: string;
  job_title: string;
  status: 'active' | 'flagged' | 'suspended';
  last_message: string;
  last_activity: string;
  message_count: number;
  match_percentage: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  is_flagged: boolean;
}

export default function AdminChats() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockConversations: ChatConversation[] = [
      {
        id: '1',
        job_seeker_email: 'john.doe@example.com',
        employer_email: 'hr@techcorp.com',
        job_title: 'Frontend Developer',
        status: 'active',
        last_message: 'Thank you for your interest in the position...',
        last_activity: '2024-01-20 14:30',
        message_count: 12,
        match_percentage: 87
      },
      {
        id: '2',
        job_seeker_email: 'jane.smith@example.com',
        employer_email: 'recruiter@designstudio.com',
        job_title: 'UX Designer',
        status: 'flagged',
        last_message: 'This is inappropriate content...',
        last_activity: '2024-01-20 11:15',
        message_count: 8,
        match_percentage: 92
      },
      {
        id: '3',
        job_seeker_email: 'mike.wilson@example.com',
        employer_email: 'jobs@startup.io',
        job_title: 'Full Stack Developer',
        status: 'active',
        last_message: 'I would be happy to schedule an interview.',
        last_activity: '2024-01-20 09:45',
        message_count: 15,
        match_percentage: 78
      }
    ];

    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'john.doe@example.com',
        message: 'Hello! I\'m very interested in this Frontend Developer position.',
        timestamp: '2024-01-20 10:00',
        is_flagged: false
      },
      {
        id: '2',
        sender: 'hr@techcorp.com',
        message: 'Thank you for your interest! Could you tell me about your experience with React?',
        timestamp: '2024-01-20 10:15',
        is_flagged: false
      },
      {
        id: '3',
        sender: 'john.doe@example.com',
        message: 'I have 3 years of experience with React and have built several production applications.',
        timestamp: '2024-01-20 10:30',
        is_flagged: false
      },
      {
        id: '4',
        sender: 'hr@techcorp.com',
        message: 'That sounds great! Would you be available for a technical interview next week?',
        timestamp: '2024-01-20 14:30',
        is_flagged: false
      }
    ];

    setTimeout(() => {
      setConversations(mockConversations);
      setChatMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredConversations = conversations.filter(conversation =>
    conversation.job_seeker_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.employer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatAction = (id: string, action: 'flag' | 'suspend' | 'activate') => {
    setConversations(prev => prev.map(chat => 
      chat.id === id 
        ? { ...chat, status: action === 'activate' ? 'active' : action === 'flag' ? 'flagged' : 'suspended' }
        : chat
    ));
    
    toast({
      title: "Chat Action",
      description: `Conversation has been ${action}${action === 'flag' ? 'ged' : action === 'suspend' ? 'ed' : 'd'} successfully.`,
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

  const getMatchBadge = (percentage: number) => {
    const color = percentage >= 80 ? 'bg-green-100 text-green-800' : 
                  percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800';
    return <Badge variant="outline" className={color}>{percentage}%</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Chat Monitoring</h1>
          <p className="text-muted-foreground">Monitor and moderate conversations between job seekers and employers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.filter(c => c.status === 'active').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Flagged Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{conversations.filter(c => c.status === 'flagged').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(conversations.reduce((sum, c) => sum + c.message_count, 0) / conversations.length || 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Monitor active conversations and communications</CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading conversations...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Seeker</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Match %</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell className="font-medium">{conversation.job_seeker_email}</TableCell>
                      <TableCell>{conversation.employer_email}</TableCell>
                      <TableCell>{conversation.job_title}</TableCell>
                      <TableCell>{getMatchBadge(conversation.match_percentage)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span>{conversation.message_count}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(conversation.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{conversation.last_activity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedChat(conversation)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh]">
                              <DialogHeader>
                                <DialogTitle>Conversation Details</DialogTitle>
                                <DialogDescription>
                                  {selectedChat?.job_seeker_email} ↔ {selectedChat?.employer_email}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center p-3 bg-muted rounded-lg">
                                  <div className="text-2xl font-bold">{selectedChat?.match_percentage}%</div>
                                  <div className="text-sm text-muted-foreground">Match Rate</div>
                                </div>
                                <div className="text-center p-3 bg-muted rounded-lg">
                                  <div className="text-2xl font-bold">{selectedChat?.message_count}</div>
                                  <div className="text-sm text-muted-foreground">Messages</div>
                                </div>
                                <div className="text-center p-3 bg-muted rounded-lg">
                                  <div className="text-sm font-bold">{selectedChat?.status}</div>
                                  <div className="text-sm text-muted-foreground">Status</div>
                                </div>
                              </div>
                              <ScrollArea className="h-96 border rounded-lg p-4">
                                <div className="space-y-4">
                                  {chatMessages.map((message) => (
                                    <div
                                      key={message.id}
                                      className={`p-3 rounded-lg max-w-[70%] ${
                                        message.sender === selectedChat?.job_seeker_email
                                          ? 'bg-primary/10 ml-auto'
                                          : 'bg-muted'
                                      } ${message.is_flagged ? 'border-2 border-red-300' : ''}`}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{message.sender}</span>
                                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                      </div>
                                      <p className="text-sm">{message.message}</p>
                                      {message.is_flagged && (
                                        <Badge variant="destructive" className="mt-2">
                                          <Flag className="w-3 h-3 mr-1" />
                                          Flagged
                                        </Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                          
                          {conversation.status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChatAction(conversation.id, 'flag')}
                              >
                                <Flag className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleChatAction(conversation.id, 'suspend')}
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          
                          {conversation.status !== 'active' && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleChatAction(conversation.id, 'activate')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}