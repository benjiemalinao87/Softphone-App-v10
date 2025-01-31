import { UserIcon, Files, FileCheck, List, Clock, Bookmark } from "lucide-react";

interface ActionButtonsProps {
  onActivityLogClick: () => void;
}

export const ActionButtons = ({ onActivityLogClick }: ActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <button className="p-2 text-emerald-500 hover:text-emerald-600 relative">
        <UserIcon size={20} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
          9
        </div>
      </button>
      <button className="p-2 text-purple-500 hover:text-purple-600 relative">
        <Files size={20} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
          2
        </div>
      </button>
      <button className="p-2 text-orange-500 hover:text-orange-600">
        <FileCheck size={20} />
      </button>
      <button className="p-2 text-pink-500 hover:text-pink-600">
        <List size={20} />
      </button>
      <button className="p-2 text-amber-500 hover:text-amber-600">
        <Bookmark size={20} />
      </button>
      <button 
        className="p-2 text-cyan-500 hover:text-cyan-600"
        onClick={onActivityLogClick}
      >
        <Clock size={20} />
      </button>
    </div>
  );
};