import { format } from "date-fns";

interface AppointmentSummaryProps {
  appointmentDate: Date;
  appointmentTime: string;
}

export function AppointmentSummary({ appointmentDate, appointmentTime }: AppointmentSummaryProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Appointment Summary</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Date: {format(appointmentDate, "MMMM d, yyyy")}
      </p>
      <p className="text-sm text-muted-foreground">
        Time: {appointmentTime}
      </p>
    </div>
  );
}