export type ChatStatus = "open" | "pending" | "done" | "invalid" | "spam";

export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  backgroundColor?: string;
}

export interface ChatUser {
  id: string;
  name: string;
  status?: ChatStatus;
  assignedAgent?: Agent;
}