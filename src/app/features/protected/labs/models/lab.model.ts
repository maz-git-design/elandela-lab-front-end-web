export interface Lab {
  id: string;
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  equipmentList: string[];
  location: {
    building: string;
    roomNumber: string;
    floor: number;
  };
  capacities: {
    users: number;
    equipment: number;
  };
  openingHours: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  timetable: {
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
    reservedBy: string;
  }[];
  safetyRequirements: string[];
  accessRestrictions: {
    allowedRoles: string[];
    minLevel: number;
  };
  managers: {
    students: string[];
    lecturers: string[];
    admins: string[];
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLabRequest {
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  location: {
    building: string;
    roomNumber: string;
    floor: number;
  };
  capacities: {
    users: number;
    equipment: number;
  };
  openingHours?: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  safetyRequirements?: string[];
  accessRestrictions?: {
    allowedRoles: string[];
    minLevel: number;
  };
}

export interface UpdateLabRequest {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  departmentId?: string;
  location?: {
    building: string;
    roomNumber: string;
    floor: number;
  };
  capacities?: {
    users: number;
    equipment: number;
  };
  openingHours?: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  safetyRequirements?: string[];
  accessRestrictions?: {
    allowedRoles: string[];
    minLevel: number;
  };
  status?: string;
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

export interface CreateScheduleRequest {
  labId: string;
  activityId: string;
  instructorId: string;
  cohortId: string;
  startTime: Date;
  endTime: Date;
  expectedCount: number;
}

export interface UpdateScheduleRequest {
  id: string;
  startTime?: Date;
  endTime?: Date;
  status?: 'scheduled' | 'active' | 'completed' | 'cancelled';
  expectedCount?: number;
}