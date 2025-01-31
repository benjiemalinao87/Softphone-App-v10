import { ChevronDown, FileText, MessageSquare, AlertOctagon, Mail, CheckSquare, UserX, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FilterDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 text-lg font-medium hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">14</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border shadow-lg rounded-md mt-1">
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> All
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">14</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-500" /> Open
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">0</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-blue-500" /> Pending
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-500" /> Spam
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">0</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-green-500" /> Done
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" /> Invalid
          </div>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">0</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-500" /> Unanswered
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <UserMinus className="h-5 w-5 text-gray-500" /> Unsubscribed
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};