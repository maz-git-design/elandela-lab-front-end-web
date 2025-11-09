'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const equipments = [
  { id: 1, name: 'Microscope Model X', category: 'Biology', quantity: 15, status: 'Available' },
  { id: 2, name: 'Beaker Set', category: 'Chemistry', quantity: 50, status: 'Available' },
  { id: 3, name: 'Oscilloscope', category: 'Physics', quantity: 8, status: 'In Use' },
  { id: 4, name: 'Centrifuge', category: 'Biology', quantity: 5, status: 'Maintenance' },
];

export default function EquipmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipments</h1>
          <p className="text-gray-600 mt-1">Manage laboratory equipment</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <Card>
        <CardHeader />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Category</th>
                  <th className="text-left p-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((equipment) => (
                  <tr key={equipment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{equipment.name}</td>
                    <td className="p-4 text-gray-600">{equipment.category}</td>
                    <td className="p-4">{equipment.quantity}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          equipment.status === 'Available'
                            ? 'bg-green-100 text-green-700'
                            : equipment.status === 'In Use'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {equipment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
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
