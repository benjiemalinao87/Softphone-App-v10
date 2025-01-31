import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface StatusDropdownProps {
  currentStatus: "open" | "pending" | "done" | "invalid" | "spam";
  selectedUser: any | null;
  onStatusChange: (status: "open" | "pending" | "done" | "invalid" | "spam") => void;
}

export const StatusDropdown = ({ currentStatus, selectedUser, onStatusChange }: StatusDropdownProps) => {
  const { toast } = useToast();

  const getStatusButton = () => {
    switch (currentStatus) {
      case "done":
        return {
          label: "Reopen",
          options: ["open", "pending", "done", "invalid", "spam"] as const
        };
      case "pending":
        return {
          label: "Move to Done",
          options: ["done", "open", "invalid", "spam"] as const
        };
      default:
        return {
          label: "Move to Done",
          options: ["pending", "done", "invalid", "spam"] as const
        };
    }
  };

  const statusButton = getStatusButton();

  const handleStatusChange = (newStatus: "open" | "pending" | "done" | "invalid" | "spam") => {
    if (!selectedUser) return;
    onStatusChange(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default"
          className="bg-primary hover:bg-primary/90 text-white font-medium"
        >
          {statusButton.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-0 bg-white border shadow-lg rounded-md mt-1">
        {statusButton.options.map((status) => (
          <DropdownMenuItem 
            key={status}
            onClick={() => handleStatusChange(status)}
            className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-sm"
          >
            {status === "open" ? "Mark as Open" :
             status === "pending" ? "Mark as Pending" :
             status === "done" ? "Move to Done" :
             status === "invalid" ? "Mark as Invalid" :
             "Mark as Spam"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};