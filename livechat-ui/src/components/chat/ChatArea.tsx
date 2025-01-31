import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: "user" | "bot";
}

const botResponses = [
  "That's interesting! Tell me more.",
  "I understand your perspective.",
  "Thanks for sharing that with me!",
  "I'm processing what you've said.",
  "Let me think about that for a moment.",
  "That's a great point you've made.",
  "I appreciate your input on this.",
  "Could you elaborate on that?",
  "I see what you mean.",
  "That's quite fascinating!"
];

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const [status, setStatus] = useState<"open" | "pending" | "done">("open");

  const getRandomBotResponse = () => {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  const handleStatusChange = (newStatus: "open" | "pending" | "done") => {
    setStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Conversation marked as ${newStatus}`,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 p-4 overflow-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`flex flex-col gap-1 max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-secondary text-secondary-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <ChatInput />
    </div>
  );
};