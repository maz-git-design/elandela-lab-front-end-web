export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  labId: string;
  labName: string;
  equipmentIds: string[];
  equipmentNames: string[];
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'cancelled';
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationSlot {
  id: string;
  labId: string;
  labName: string;
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
  currentReservations: number;
  isAvailable: boolean;
}

export interface CreateReservationRequest {
  labId: string;
  equipmentIds: string[];
  startTime: Date;
  endTime: Date;
  purpose: string;
  notes?: string;
}

export interface UpdateReservationRequest {
  id: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  notes?: string;
}

export interface ApproveReservationRequest {
  id: string;
  approvedBy: string;
  notes?: string;
}

export interface RejectReservationRequest {
  id: string;
  rejectionReason: string;
}