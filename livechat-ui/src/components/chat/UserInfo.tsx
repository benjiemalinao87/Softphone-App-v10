import { RefreshCw, Search, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { User } from "./ChatSidebar";
import { UserProfile } from "./user-info/UserProfile";
import { ContactInformation } from "./user-info/ContactInformation";
import { UserDetails } from "./user-info/UserDetails";
import { AutomationControl } from "./user-info/AutomationControl";
import { LiveChatUrl } from "./user-info/LiveChatUrl";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const UserInfo = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    const handleUserSelected = (event: CustomEvent<User>) => {
      setSelectedUser(event.detail);
      setShowActivityLog(false);
      console.log("UserInfo received user:", event.detail);
    };

    const handleToggleActivityLog = () => {
      setShowActivityLog(prev => !prev);
    };

    window.addEventListener('userSelected', handleUserSelected as EventListener);
    window.addEventListener('toggleActivityLog', handleToggleActivityLog as EventListener);

    return () => {
      window.removeEventListener('userSelected', handleUserSelected as EventListener);
      window.removeEventListener('toggleActivityLog', handleToggleActivityLog as EventListener);
    };
  }, []);

  if (!selectedUser) {
    return (
      <div className="w-80 border-l h-full bg-white flex items-center justify-center text-muted-foreground">
        Select a user to view details
      </div>
    );
  }

  if (showActivityLog) {
    return (
      <div className="w-80 border-l h-full bg-white overflow-auto">
        <div className="p-4 space-y-4">
          <h2 className="font-semibold text-lg">Activity Logs</h2>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 border rounded-md p-2">
              <Popover open={showCalendar === 'start'} onOpenChange={(open) => !open && setShowCalendar(null)}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !startDate && "text-muted-foreground"
                    )}
                    onClick={() => setShowCalendar('start')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setShowCalendar(null);
                    }}
                  />
                </PopoverContent>
              </Popover>

              <span className="text-muted-foreground">-</span>

              <Popover open={showCalendar === 'end'} onOpenChange={(open) => !open && setShowCalendar(null)}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !endDate && "text-muted-foreground"
                    )}
                    onClick={() => setShowCalendar('end')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      setShowCalendar(null);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 mt-6">
            <div className="relative pl-8 border-l-2 border-muted pb-6">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status changed to Open</span>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-muted pb-6">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-orange-500"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">User opted out</span>
                <span className="text-xs text-muted-foreground">5h ago</span>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-muted">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-500"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">User opted in</span>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l h-full bg-white overflow-auto">
      <div className="p-4 space-y-4">
        <UserProfile user={selectedUser} />
        <ContactInformation user={selectedUser} />
        <UserDetails user={selectedUser} />
        <AutomationControl user={selectedUser} />
        <LiveChatUrl user={selectedUser} />
      </div>
    </div>
  );
};