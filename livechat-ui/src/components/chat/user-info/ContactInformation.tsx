import { Phone, Mail, MessageSquare } from "lucide-react";
import type { User } from "../ChatSidebar";

interface ContactInformationProps {
  user: User;
}

export const ContactInformation = ({ user }: ContactInformationProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="h-4 w-4" />
        <span>{user.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        <span>{user.email || 'Not set'}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        <span>{user.messagePhone}</span>
      </div>
    </div>
  );
};