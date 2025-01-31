import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "../ChatSidebar";

interface AutomationControlProps {
  user: User;
}

export const AutomationControl = ({ user }: AutomationControlProps) => {
  const [automationPaused, setAutomationPaused] = useState(false);
  const [pauseDuration, setPauseDuration] = useState<string>("+ 30 Minutes");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const pauseOptions = [
    "+ 30 Minutes",
    "+ 60 Minutes",
    "+ 1 Hour",
    "+ 5 Hours",
    "+ 12 Hours",
    "+ 24 Hours",
    "+ 2 Days",
    "+ 4 Days",
    "+ 7 Days",
    "+ 15 Days",
    "+ 60 Days",
    "+ 120 Days"
  ];

  const parseTimeToMilliseconds = (duration: string): number => {
    const value = parseInt(duration.match(/\d+/)?.[0] || "0");
    if (duration.includes("Minutes")) return value * 60 * 1000;
    if (duration.includes("Hour")) return value * 60 * 60 * 1000;
    if (duration.includes("Days")) return value * 24 * 60 * 60 * 1000;
    return 0;
  };

  const formatRemainingTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePauseAutomation = (duration: string) => {
    setAutomationPaused(true);
    setPauseDuration(duration);
    const ms = parseTimeToMilliseconds(duration);
    setRemainingTime(ms);
    console.log(`Automation paused for ${duration} for user ${user.id}`);
  };

  // Reset automation state when user changes
  useEffect(() => {
    setAutomationPaused(false);
    setRemainingTime(null);
    setPauseDuration("+ 30 Minutes");
  }, [user.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (remainingTime && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev && prev > 1000) {
            return prev - 1000;
          } else {
            setAutomationPaused(false);
            return null;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [remainingTime]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Pause Automation</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-white"
            >
              {pauseDuration}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-white w-[200px] shadow-lg border border-gray-200"
            align="end"
          >
            {pauseOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handlePauseAutomation(option)}
                className="text-sm py-2 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {automationPaused && remainingTime && (
        <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-md">
          <div className="w-4 h-4 text-yellow-500">⏸</div>
          <span className="text-sm font-medium">{formatRemainingTime(remainingTime)}</span>
          <button 
            onClick={() => {
              setAutomationPaused(false);
              setRemainingTime(null);
            }}
            className="ml-auto text-red-500 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      <Button 
        variant="secondary" 
        className="w-full justify-center bg-white border border-gray-200"
        onClick={() => {
          if (!automationPaused) {
            handlePauseAutomation(pauseDuration);
          } else {
            setAutomationPaused(false);
            setRemainingTime(null);
          }
        }}
      >
        {automationPaused ? "No Automation in this User" : "Automatically"}
      </Button>
    </div>
  );
};