'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Grid } from 'lucide-react';

const accessSections = [
  {
    title: 'Roles',
    description: 'Manage user roles and assignments',
    icon: Shield,
    href: '/accesses/roles',
    count: 6,
  },
  {
    title: 'Permissions',
    description: 'Configure system permissions',
    icon: Lock,
    href: '/accesses/permissions',
    count: 32,
  },
  {
    title: 'Modules',
    description: 'Manage system modules',
    icon: Grid,
    href: '/accesses/modules',
    count: 12,
  },
];

export default function AccessesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Access Control</h1>
        <p className="text-gray-600 mt-1">Manage roles, permissions, and modules</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accessSections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {section.count}
                  </span>
                </div>
                <CardTitle className="mt-4">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
