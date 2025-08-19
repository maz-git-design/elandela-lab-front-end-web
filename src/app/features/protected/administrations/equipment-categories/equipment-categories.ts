import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface EquipmentCategory {
  _id: string;
  name: string;
  description?: string;
  imagePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-equipment-categories',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, Textarea, TableModule, ButtonModule],
  templateUrl: './equipment-categories.html',
  styleUrl: './equipment-categories.scss'
})
export class EquipmentCategories implements OnInit {
  categories: EquipmentCategory[] = [
    {
      _id: '1',
      name: 'Optique',
      description: 'Équipements optiques et microscopes',
      imagePath: '/images/categories/optique.jpg',
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Laboratoire',
      description: 'Équipements de laboratoire généraux',
      imagePath: '/images/categories/laboratoire.jpg',
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '3',
      name: 'Analyse',
      description: 'Équipements d\'analyse et de mesure',
      imagePath: '/images/categories/analyse.jpg',
      createdAt: new Date('2023-10-01'),
      updatedAt: new Date('2024-01-05')
    },
    {
      _id: '4',
      name: 'Électronique',
      description: 'Équipements électroniques et circuits',
      imagePath: '/images/categories/electronique.jpg',
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-12-20')
    },
    {
      _id: '5',
      name: 'Fabrication',
      description: 'Équipements de fabrication et impression 3D',
      imagePath: '/images/categories/fabrication.jpg',
      createdAt: new Date('2023-11-01'),
      updatedAt: new Date('2023-12-15')
    },
    {
      _id: '6',
      name: 'Informatique',
      description: 'Matériel informatique et serveurs',
      imagePath: '/images/categories/informatique.jpg',
      createdAt: new Date('2023-11-15'),
      updatedAt: new Date('2023-12-10')
    }
  ];

  searchTerm: string = '';
  showAddDialog: boolean = false;
  viewMode: 'card' | 'table' = 'card';

  ngOnInit(): void {
    console.log('Equipment Categories component initialized');
  }

  get filteredCategories(): EquipmentCategory[] {
    return this.categories.filter(category => {
      const matchesSearch = !this.searchTerm || 
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }

  getCategoryIcon(categoryName: string): string {
    const iconMap: { [key: string]: string } = {
      'Optique': 'fas fa-microscope',
      'Laboratoire': 'fas fa-flask',
      'Analyse': 'fas fa-chart-line',
      'Électronique': 'fas fa-microchip',
      'Fabrication': 'fas fa-cube',
      'Informatique': 'fas fa-desktop'
    };
    return iconMap[categoryName] || 'fas fa-cog';
  }

  viewCategory(category: EquipmentCategory): void {
    console.log('Viewing category:', category);
  }

  editCategory(category: EquipmentCategory): void {
    console.log('Editing category:', category);
  }

  createCategory(): void {
    console.log('Creating new category');
    this.showAddDialog = false;
  }
}
