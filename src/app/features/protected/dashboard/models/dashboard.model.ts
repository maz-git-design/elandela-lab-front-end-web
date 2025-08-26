export interface DashboardStats {
  totalUsers: number;
  totalLabs: number;
  totalEquipments: number;
  activeReservations: number;
}

export interface RecentActivity {
  id: number;
  type: 'login' | 'reservation' | 'equipment';
  message: string;
  timestamp: Date;
  user: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
}