import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

interface AppointmentFormFieldsProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AppointmentFormFields({ formData, onInputChange }: AppointmentFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          required
          value={formData.fullName}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          required
          value={formData.phone}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Any special notes or concerns?"
          value={formData.notes}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}