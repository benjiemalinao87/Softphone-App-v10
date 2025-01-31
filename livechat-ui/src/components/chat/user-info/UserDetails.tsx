import type { User } from "../ChatSidebar";

interface UserDetailsProps {
  user: User;
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">User Ns</span>
        <span>{user.userNs}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">User Name</span>
        <span>{user.name}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">First Name</span>
        <span>{user.firstName}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Last Name</span>
        <span>{user.lastName}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Created</span>
        <span>{user.created}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Subscribed</span>
        <span>{user.subscribed}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Last action</span>
        <span></span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Not Opted-in for Email</span>
        <span></span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Not Opted-in for SMS</span>
        <span></span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Board</span>
        <span></span>
      </div>
    </div>
  );
};