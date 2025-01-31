import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { UserInfo } from "@/components/chat/UserInfo";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <ChatArea />
        <UserInfo />
      </div>
    </div>
  );
};

export default Index;