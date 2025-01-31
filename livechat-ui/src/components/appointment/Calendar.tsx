import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center justify-between px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousMonth}
          className="text-gray-700 hover:text-primary hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <span className="text-lg font-bold text-gray-700">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextMonth}
          className="text-gray-700 hover:text-primary hover:bg-primary/10"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 px-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-600 text-sm py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day) => (
          <Button
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            variant={isSameDay(day, selectedDate) ? "default" : "outline"}
            size="sm"
            className={`h-10 ${
              !isSameMonth(day, currentMonth)
                ? "opacity-40 cursor-not-allowed"
                : "hover:scale-105 transition-transform"
            }`}
            disabled={!isSameMonth(day, currentMonth)}
          >
            {format(day, "d")}
          </Button>
        ))}
      </div>
    </div>
  );
}