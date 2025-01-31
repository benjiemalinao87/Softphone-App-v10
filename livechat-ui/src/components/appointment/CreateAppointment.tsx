import React, { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { AppointmentForm } from "./AppointmentForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CalendarDays, Wrench } from "lucide-react";
import {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
} from "@/components/floating-action-panel";

export function CreateAppointment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState<"date" | "time" | "form">("date");
  const [open, setOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState<"new" | "maintenance" | null>(null);

  useEffect(() => {
    const handleOpenPanel = () => {
      console.log('Received openAppointmentPanel event');
      setOpen(true);
    };

    window.addEventListener('openAppointmentPanel', handleOpenPanel);
    return () => window.removeEventListener('openAppointmentPanel', handleOpenPanel);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleSubmit = (formData: any) => {
    console.log("Appointment Data:", {
      ...formData,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
    });
    
    toast.success("Appointment scheduled successfully!");
    setOpen(false);
    setStep("date");
    setAppointmentType(null);
  };

  const handleAppointmentTypeSelect = (type: "new" | "maintenance") => {
    setAppointmentType(type);
    setOpen(true);
  };

  const handleBackToDate = () => {
    setStep("date");
  };

  const handleBackToTime = () => {
    setStep("time");
  };

  if (open && appointmentType) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/20" onClick={() => {
          setOpen(false);
          setAppointmentType(null);
        }} />
        <div className="absolute right-0 top-0 h-full w-[400px] bg-white p-6 shadow-lg">
          <div className="space-y-6">
            {step === "date" && (
              <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            )}
            
            {step === "time" && (
              <div className="space-y-4">
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
                <Button
                  variant="ghost"
                  onClick={handleBackToDate}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to date selection
                </Button>
              </div>
            )}
            
            {step === "form" && (
              <div className="space-y-4">
                <AppointmentForm
                  appointmentDate={selectedDate}
                  appointmentTime={selectedTime}
                  onSubmit={handleSubmit}
                />
                <Button
                  variant="ghost"
                  onClick={handleBackToTime}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to time selection
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <FloatingActionPanelRoot>
      {(panel) => (
        <>
          <FloatingActionPanelTrigger className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
            <CalendarDays className="h-4 w-4" />
            Create Appointment
          </FloatingActionPanelTrigger>
          
          <FloatingActionPanelContent>
            <div className="py-1">
              <FloatingActionPanelButton
                onClick={() => handleAppointmentTypeSelect("new")}
              >
                <CalendarDays className="h-4 w-4" />
                New Appointment
              </FloatingActionPanelButton>
              
              <FloatingActionPanelButton
                onClick={() => handleAppointmentTypeSelect("maintenance")}
              >
                <Wrench className="h-4 w-4" />
                Maintenance
              </FloatingActionPanelButton>
            </div>
          </FloatingActionPanelContent>
        </>
      )}
    </FloatingActionPanelRoot>
  );
}