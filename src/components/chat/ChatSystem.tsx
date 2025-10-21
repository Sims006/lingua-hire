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
      role: "구직자",
      avatar: "SC",
      status: "online",
      lastMessage: "지원을 고려해주셔서 감사합니다!",
      time: "2분 전",
      unread: 2,
      requestStatus: "pending",
      jobTitle: "시니어 프론트엔드 개발자",
      matchPercentage: 94,
      canMessage: true
    },
    {
      id: 2,
      participant: "TechCorp Global",
      role: "채용담당자",
      avatar: "TC",
      status: "offline",
      lastMessage: "면접 일정을 잡고 싶습니다.",
      time: "1시간 전",
      unread: 0,
      requestStatus: "accepted",
      jobTitle: "React 개발자 포지션",
      matchPercentage: 87,
      canMessage: true
    },
    {
      id: 3,
      participant: "Marcus Johnson",
      role: "구직자",
      avatar: "MJ",
      status: "online",
      lastMessage: "프로젝트 논의 가능합니다.",
      time: "3시간 전",
      unread: 1,
      requestStatus: "none",
      jobTitle: "풀스택 엔지니어",
      matchPercentage: 65,
      canMessage: false // Low match, no messaging allowed
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      content: "안녕하세요! 시니어 프론트엔드 개발자 포지션에 매우 관심이 있습니다. React와 TypeScript로 6년의 경력이 있습니다.",
      time: "오전 10:30",
      isOwn: false
    },
    {
      id: 2,
      sender: "나",
      content: "관심 가져주셔서 감사합니다! 대규모 애플리케이션 경험에 대해 더 알고 싶습니다.",
      time: "오전 10:35",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Chen",
      content: "수백만 명의 사용자를 대상으로 하는 여러 엔터프라이즈 애플리케이션에서 일했습니다. 최근에는 React 마이그레이션 프로젝트에서 4명의 개발자 팀을 이끌었습니다.",
      time: "오전 10:37",
      isOwn: false
    },
    {
      id: 4,
      sender: "Sarah Chen",
      content: "지원을 고려해주셔서 감사합니다!",
      time: "오전 10:40",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    const activeConversation = conversations.find(c => c.id === activeChat);
    if (newMessage.trim() && activeConversation?.canMessage) {
      // Handle sending message logic here
      setNewMessage("");
    }
  };

  const handleConnectionRequest = (action: "accept" | "reject", conversationId: number) => {
    // Handle connection request logic here
    console.log(`${action} request for conversation ${conversationId}`);
  };

  // Get active conversation for messaging validation
  const activeConversation = conversations.find(c => c.id === activeChat);

  return (
    <div className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className="lg:w-1/3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">메시지</h2>
              <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length} 읽지 않음</Badge>
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
                      
                      <p className="text-sm text-muted-foreground mb-1">
                        {conversation.jobTitle} • {conversation.matchPercentage}% 일치
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      
                      {/* Match Status Indicator */}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={conversation.matchPercentage >= 80 ? "secondary" : "outline"} 
                          className={`text-xs ${conversation.matchPercentage >= 80 ? 'bg-green-100 text-green-700' : ''}`}
                        >
                          {conversation.matchPercentage}% 일치
                        </Badge>
                        {!conversation.canMessage && (
                          <Badge variant="destructive" className="text-xs">
                            낮은 일치도 - 메시징 불가
                          </Badge>
                        )}
                      </div>
                      
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
                            수락
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
                            거절
                          </Button>
                        </div>
                      )}
                      
                      {conversation.requestStatus === "accepted" && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-green-50 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          연결됨
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
                  {activeConversation && activeConversation.canMessage ? (
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="메시지를 입력하세요..."
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
                  ) : (
                    <div className="text-center py-4 bg-muted/50 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {activeConversation?.matchPercentage && activeConversation.matchPercentage < 80 
                          ? `일치도가 낮음 (${activeConversation.matchPercentage}%) - 메시징 불가`
                          : '메시징 불가'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">대화 선택</h3>
                  <p className="text-muted-foreground">목록에서 대화를 선택하여 채팅을 시작하세요</p>
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