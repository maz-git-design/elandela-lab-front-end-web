export interface Lab {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  departmentId: string;
  departmentName: string;
  status: 'available' | 'occupied' | 'maintenance' | 'closed';
  equipmentCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabSchedule {
  id: string;
  labId: string;
  labName: string;
  activityId: string;
  activityName: string;
  instructorId: string;
  instructorName: string;
  cohortId: string;
  cohortName: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  attendanceCount: number;
  expectedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLabRequest {
  name: string;
  description: string;
  location: string;
  capacity: number;
  departmentId: string;
}

export interface UpdateLabRequest extends CreateLabRequest {
  id: string;
  status: 'available' | 'occupied' | 'maintenance' | 'closed';
  isActive: boolean;
}

export interface CreateScheduleRequest {
  labId: string;
  activityId: string;
  instructorId: string;
  cohortId: string;
  startTime: Date;
  endTime: Date;
}

export interface UpdateScheduleRequest extends CreateScheduleRequest {
  id: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}