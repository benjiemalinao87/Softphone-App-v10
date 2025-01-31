import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@/components/chat/ChatSidebar";
import { AppointmentSummary } from "./form/AppointmentSummary";
import { AppointmentFormFields } from "./form/AppointmentFormFields";

interface AppointmentFormProps {
  appointmentDate: Date;
  appointmentTime: string;
  onSubmit: (formData: any) => void;
}

export function AppointmentForm({
  appointmentDate,
  appointmentTime,
  onSubmit,
}: AppointmentFormProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    const handleUserSelected = (event: CustomEvent<User>) => {
      const user = event.detail;
      setSelectedUser(user);
      console.log("AppointmentForm received user:", user);
      
      setFormData({
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email || '',
        phone: user.phone || '',
        notes: ''
      });
    };

    window.addEventListener('userSelected', handleUserSelected as EventListener);

    return () => {
      window.removeEventListener('userSelected', handleUserSelected as EventListener);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AppointmentSummary 
        appointmentDate={appointmentDate}
        appointmentTime={appointmentTime}
      />

      <AppointmentFormFields 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <Button type="submit" className="w-full">
        Confirm Appointment
      </Button>
    </form>
  );
}