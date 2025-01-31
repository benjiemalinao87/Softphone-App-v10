import { UserIcon } from "lucide-react";
import type { User } from "../ChatSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="bg-gray-200">
        <AvatarFallback>
          <UserIcon className="h-4 w-4 text-gray-500" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-medium">{user.name}</h2>
      </div>
    </div>
  );
};