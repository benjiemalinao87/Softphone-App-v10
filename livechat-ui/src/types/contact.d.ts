export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  lastContacted?: Date;
  selected?: boolean;
}