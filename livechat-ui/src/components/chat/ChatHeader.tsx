import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { User as ChatUser } from "./ChatSidebar";
import { FilterDropdown } from "./header/FilterDropdown";
import { AgentAssignment } from "./header/AgentAssignment";
import { StatusDropdown } from "./header/StatusDropdown";
import { ActionButtons } from "./header/ActionButtons";

interface ChatHeaderProps {
  children?: React.ReactNode;
}

export const ChatHeader = ({ children }: ChatHeaderProps) => {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState<"open" | "pending" | "done" | "invalid" | "spam">("open");
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  useEffect(() => {
    const handleUserSelected = (event: CustomEvent<ChatUser>) => {
      setSelectedUser(event.detail);
      setCurrentStatus(event.detail.status || "open");
    };

    window.addEventListener('userSelected', handleUserSelected as EventListener);
    return () => {
      window.removeEventListener('userSelected', handleUserSelected as EventListener);
    };
  }, []);

  const handleActivityLogClick = () => {
    const event = new CustomEvent('toggleActivityLog', {
      detail: true
    });
    window.dispatchEvent(event);
  };

  const handleStatusChange = (newStatus: "open" | "pending" | "done" | "invalid" | "spam") => {
    if (!selectedUser) return;
    
    setCurrentStatus(newStatus);
    
    const statusUpdateEvent = new CustomEvent('statusUpdate', {
      detail: {
        userId: selectedUser.id,
        status: newStatus
      }
    });
    window.dispatchEvent(statusUpdateEvent);
    
    toast({
      title: "Status Updated",
      description: `Conversation marked as ${newStatus}`,
    });
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-white shadow-sm">
      <FilterDropdown />
      
      <div className="flex items-center gap-4">
        <AgentAssignment selectedUser={selectedUser} />
        
        <StatusDropdown
          currentStatus={currentStatus}
          selectedUser={selectedUser}
          onStatusChange={handleStatusChange}
        />
        
        <ActionButtons onActivityLogClick={handleActivityLogClick} />
      </div>
    </header>
  );
};