'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const attendances = [
  {
    id: 1,
    student: 'John Doe',
    lab: 'Chemistry Lab A',
    date: '2025-11-09',
    checkIn: '10:05 AM',
    checkOut: '11:50 AM',
    status: 'Present',
  },
  {
    id: 2,
    student: 'Jane Smith',
    lab: 'Physics Lab B',
    date: '2025-11-09',
    checkIn: '2:10 PM',
    checkOut: '-',
    status: 'In Progress',
  },
];

export default function AttendancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendances</h1>
        <p className="text-gray-600 mt-1">Track student attendance</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Present: 45</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Absent: 8</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">In Progress: 12</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Student</th>
                  <th className="text-left p-4 font-medium text-gray-600">Lab</th>
                  <th className="text-left p-4 font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 font-medium text-gray-600">Check In</th>
                  <th className="text-left p-4 font-medium text-gray-600">Check Out</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance) => (
                  <tr key={attendance.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{attendance.student}</td>
                    <td className="p-4 text-gray-600">{attendance.lab}</td>
                    <td className="p-4 text-gray-600">{attendance.date}</td>
                    <td className="p-4">{attendance.checkIn}</td>
                    <td className="p-4">{attendance.checkOut}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          attendance.status === 'Present'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
