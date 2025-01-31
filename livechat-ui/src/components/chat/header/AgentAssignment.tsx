import { UserPlus, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface AgentAssignmentProps {
  selectedUser: any | null;
}

export const AgentAssignment = ({ selectedUser }: AgentAssignmentProps) => {
  const { toast } = useToast();

  const handleAssignAgent = (agentName: string) => {
    if (!selectedUser) return;
    
    console.log('Assigning agent:', agentName, 'to user:', selectedUser.id);
    
    toast({
      title: "Agent Assigned",
      description: `Conversation assigned to ${agentName}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="h-10 w-10 border-dashed border-gray-300"
        >
          <UserPlus className="h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-0 bg-white border shadow-lg rounded-md mt-1">
        <div className="px-4 py-3 text-sm font-semibold border-b">Assign to</div>
        <DropdownMenuItem 
          onClick={() => handleAssignAgent("None")}
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 cursor-pointer"
        >
          <Avatar className="h-8 w-8 bg-gray-100">
            <AvatarFallback>
              <UserX className="h-4 w-4 text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">None</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleAssignAgent("58foundations.com")}
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/6a6e09cb-a53e-4179-a42c-75eb3c89b8a8.png" />
            <AvatarFallback>58</AvatarFallback>
          </Avatar>
          <span className="text-sm">58foundations.com</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleAssignAgent("Aftin Lebron")}
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 cursor-pointer"
        >
          <Avatar className="h-8 w-8 bg-purple-500">
            <AvatarFallback className="text-white">AL</AvatarFallback>
          </Avatar>
          <span className="text-sm">Aftin Lebron</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleAssignAgent("Angela Granroth")}
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 cursor-pointer"
        >
          <Avatar className="h-8 w-8 bg-blue-500">
            <AvatarFallback className="text-white">AG</AvatarFallback>
          </Avatar>
          <span className="text-sm">Angela Granroth</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};