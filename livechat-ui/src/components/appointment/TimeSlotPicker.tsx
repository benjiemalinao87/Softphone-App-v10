import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export function TimeSlotPicker({ selectedTime, onTimeSelect }: TimeSlotPickerProps) {
  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="flex flex-col space-y-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            onClick={() => onTimeSelect(time)}
            className="justify-start"
          >
            {time}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}