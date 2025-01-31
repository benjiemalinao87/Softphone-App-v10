import { Filter, ArrowUpDown, Search, User, Users, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type User = {
  id: number;
  name: string;
  time: string;
  unread: boolean;
  email?: string;
  phone?: string;
  messagePhone?: string;
  userNs?: string;
  firstName?: string;
  lastName?: string;
  created?: string;
  subscribed?: string;
  avatar?: string;
  message?: string;
  status?: "open" | "pending" | "done" | "invalid" | "spam";
  messages?: { text: string; sender: "user" | "agent"; timestamp: string }[];
};

const initialConversations: User[] = [
  {
    id: 1,
    name: "Julie Martinez",
    time: "2d",
    unread: true,
    email: "julie@example.com",
    phone: "+16265539681",
    messagePhone: "+16265539681",
    userNs: "f142583u199158161",
    firstName: "Julie",
    lastName: "Martinez",
    created: "4 days ago",
    subscribed: "4 days ago",
    avatar: "/lovable-uploads/6a6e09cb-a53e-4179-a42c-75eb3c89b8a8.png",
    message: "I would be interested one of the admi...",
    status: "pending",
    messages: [
      { text: "Hi, I'm interested in your services!", sender: "user", timestamp: "2024-04-10 10:00" },
      { text: "Hello Julie! How can I help you today?", sender: "agent", timestamp: "2024-04-10 10:02" },
      { text: "I would be interested in one of the admin packages", sender: "user", timestamp: "2024-04-10 10:05" },
      { text: "Great choice! Let me explain our available packages.", sender: "agent", timestamp: "2024-04-10 10:07" }
    ]
  },
  {
    id: 2,
    name: "Laim Soren",
    time: "1m",
    unread: false,
    message: "Yes",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Michael Josh",
    time: "3m",
    unread: true,
    message: "I'm a member of [Mesquite Balch Spri...",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Nwadiugwu Darrius",
    time: "3m",
    unread: false,
    message: "...",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Jennifer Johnson",
    time: "3m",
    unread: false,
    message: "?",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Center Suppot Manager",
    time: "5m",
    unread: false,
    message: "...",
    avatar: "/placeholder.svg"
  }
];

export const ChatSidebar = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  useEffect(() => {
    // Select first conversation by default
    if (conversations.length > 0 && !selectedUserId) {
      handleSelectUser(conversations[0].id);
    }

    // Listen for status updates
    const handleStatusUpdate = (event: CustomEvent<{ userId: number; status: User['status'] }>) => {
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === event.detail.userId 
            ? { ...conv, status: event.detail.status }
            : conv
        )
      );
    };

    window.addEventListener('statusUpdate', handleStatusUpdate as EventListener);
    return () => {
      window.removeEventListener('statusUpdate', handleStatusUpdate as EventListener);
    };
  }, []);

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    const selectedUser = conversations.find(user => user.id === userId);
    window.dispatchEvent(new CustomEvent('userSelected', { detail: selectedUser }));
    console.log("Selected user:", selectedUser);
  };

  const filteredConversations = statusFilter
    ? conversations.filter(conv => conv.status === statusFilter)
    : conversations;

  return (
    <div className="w-80 border-r h-full bg-white">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium hover:text-gray-600">
              {assignmentFilter === "all" && <Users className="h-4 w-4" />}
              {assignmentFilter === "me" && <User className="h-4 w-4" />}
              {assignmentFilter === "unassigned" && <UserX className="h-4 w-4" />}
              <span className="capitalize">{assignmentFilter}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem 
                onClick={() => setAssignmentFilter("me")}
                className="flex items-center gap-2 py-2"
              >
                <User className="h-4 w-4" />
                <span>Me</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setAssignmentFilter("unassigned")}
                className="flex items-center gap-2 py-2"
              >
                <UserX className="h-4 w-4" />
                <span>Unassigned</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setAssignmentFilter("all")}
                className="flex items-center gap-2 py-2"
              >
                <Users className="h-4 w-4" />
                <span>All</span>
              </DropdownMenuItem>
              <div className="px-2 py-2 text-xs font-medium text-gray-500 border-t">
                Assigned to
              </div>
              <DropdownMenuItem className="flex items-center gap-2 py-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/lovable-uploads/6a6e09cb-a53e-4179-a42c-75eb3c89b8a8.png" />
                  <AvatarFallback>58</AvatarFallback>
                </Avatar>
                <span>58foundations.com</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-purple-500 text-white">AL</AvatarFallback>
                </Avatar>
                <span>Aftin Lebron</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-500 text-white">AG</AvatarFallback>
                </Avatar>
                <span>Angela Granroth</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 flex items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={cn(
                    "h-10 w-10",
                    showFilterPanel && "bg-blue-50 text-blue-600 border-blue-200"
                  )}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-10 w-10"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {showFilterPanel && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">General Filters</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-gray-600">
                    System Fields
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-gray-600">
                    Custom User Fields
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Quick Filters</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-gray-600 gap-2">
                    <span className="text-gray-400">🏷️</span> Tag
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-gray-600 gap-2">
                    <span className="text-gray-400">⚙️</span> Opted-In Through Widget
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-gray-600 gap-2">
                    <span className="text-gray-400">📢</span> Opted-In Through Ad
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-auto h-[calc(100vh-12rem)]">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleSelectUser(conversation.id)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedUserId === conversation.id
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : "border-l-4 border-l-transparent"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>
                    {conversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {conversation.unread && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${
                      selectedUserId === conversation.id
                        ? "text-blue-700"
                        : "text-gray-900"
                    }`}>
                      {conversation.name}
                    </span>
                    {conversation.status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        conversation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        conversation.status === 'done' ? 'bg-green-100 text-green-800' :
                        conversation.status === 'invalid' ? 'bg-red-100 text-red-800' :
                        conversation.status === 'spam' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
