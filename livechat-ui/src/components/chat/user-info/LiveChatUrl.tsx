import type { User } from "../ChatSidebar";

interface LiveChatUrlProps {
  user: User;
}

export const LiveChatUrl = ({ user }: LiveChatUrlProps) => {
  return (
    <div className="space-y-2">
      <span className="text-sm text-muted-foreground">Live Chat Url</span>
      <p className="text-xs text-blue-600 break-all">
        https://app.channelautomation.com/inbox/{user.userNs}
      </p>
    </div>
  );
};