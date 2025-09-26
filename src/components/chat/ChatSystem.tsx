import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Send, Users, Clock, CheckCircle, XCircle, Bell } from "lucide-react";

const ChatSystem = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      participant: "Sarah Chen",
      role: "Job Seeker",
      avatar: "SC",
      status: "online",
      lastMessage: "Thank you for considering my application!",
      time: "2 min ago",
      unread: 2,
      requestStatus: "pending",
      jobTitle: "Senior Frontend Developer"
    },
    {
      id: 2,
      participant: "TechCorp Global",
      role: "Employer",
      avatar: "TC",
      status: "offline",
      lastMessage: "We'd like to schedule an interview.",
      time: "1 hour ago",
      unread: 0,
      requestStatus: "accepted",
      jobTitle: "React Developer Position"
    },
    {
      id: 3,
      participant: "Marcus Johnson",
      role: "Job Seeker",
      avatar: "MJ",
      status: "online",
      lastMessage: "I'm available for the project discussion.",
      time: "3 hours ago",
      unread: 1,
      requestStatus: "none",
      jobTitle: "Full Stack Engineer"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      content: "Hi! I'm very interested in the Senior Frontend Developer position. I have 6 years of experience with React and TypeScript.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thanks for your interest! I'd love to learn more about your experience with large-scale applications.",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Chen",
      content: "I've worked on several enterprise applications serving millions of users. Recently led a team of 4 developers on a React migration project.",
      time: "10:37 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "Sarah Chen",
      content: "Thank you for considering my application!",
      time: "10:40 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage("");
    }
  };

  const handleConnectionRequest = (action: "accept" | "reject", conversationId: number) => {
    // Handle connection request logic here
    console.log(`${action} request for conversation ${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className="lg:w-1/3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Messages</h2>
              <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length} unread</Badge>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[600px]">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    activeChat === conversation.id ? 'bg-primary/5 border-primary' : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => setActiveChat(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {conversation.avatar}
                        </div>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground truncate">{conversation.participant}</p>
                        <div className="flex items-center gap-2">
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">{conversation.jobTitle}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      
                      {/* Connection Request Status */}
                      {conversation.requestStatus === "pending" && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnectionRequest("accept", conversation.id);
                            }}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnectionRequest("reject", conversation.id);
                            }}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                      
                      {conversation.requestStatus === "accepted" && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-green-50 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:w-2/3 flex flex-col">
            {activeChat ? (
              <Card className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {conversations.find(c => c.id === activeChat)?.avatar}
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {conversations.find(c => c.id === activeChat)?.participant}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {conversations.find(c => c.id === activeChat)?.jobTitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {conversations.find(c => c.id === activeChat)?.role}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.isOwn 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      } rounded-lg px-4 py-2`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] resize-none"
                    />
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select a Conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;