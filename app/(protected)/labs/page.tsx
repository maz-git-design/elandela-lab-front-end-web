'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MapPin, Users } from 'lucide-react';

const labs = [
  { id: 1, name: 'Chemistry Lab A', location: 'Building A, Floor 2', capacity: 30, status: 'Available' },
  { id: 2, name: 'Physics Lab B', location: 'Building B, Floor 1', capacity: 25, status: 'Occupied' },
  { id: 3, name: 'Biology Lab C', location: 'Building A, Floor 3', capacity: 20, status: 'Available' },
  { id: 4, name: 'Computer Lab D', location: 'Building C, Floor 1', capacity: 40, status: 'Maintenance' },
];

export default function LabsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Labs</h1>
          <p className="text-gray-600 mt-1">Manage laboratory spaces</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lab
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Card key={lab.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{lab.name}</CardTitle>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    lab.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : lab.status === 'Occupied'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {lab.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                {lab.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                Capacity: {lab.capacity} people
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
