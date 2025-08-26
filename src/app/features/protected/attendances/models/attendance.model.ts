export interface Attendance {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  sessionId: string;
  sessionName: string;
  labId: string;
  labName: string;
  checkInTime: Date;
  checkOutTime?: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  duration?: number;
  faceVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSession {
  id: string;
  name: string;
  description: string;
  labId: string;
  labName: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  attendanceCount: number;
  totalStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceStats {
  totalSessions: number;
  totalAttendances: number;
  averageAttendanceRate: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
}

export interface CreateAttendanceRequest {
  userId: string;
  sessionId: string;
  faceData: string;
}

export interface UpdateAttendanceRequest {
  id: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkOutTime?: Date;
}

export interface CreateSessionRequest {
  name: string;
  description: string;
  labId: string;
  startTime: Date;
  endTime: Date;
}

export interface UpdateSessionRequest extends CreateSessionRequest {
  id: string;
  isActive: boolean;
}