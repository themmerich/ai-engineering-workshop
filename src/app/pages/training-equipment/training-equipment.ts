import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Equipment {
  id: number;
  name: string;
  weight: number | null;
  price: number;
  purchaseDate: Date;
}

interface EquipmentDraft {
  name: string;
  weight: number | null;
  price: number | null;
  purchaseDate: Date | null;
}

@Component({
  selector: 'app-training-equipment',
  imports: [
    DatePipe,
    FormsModule,
    ButtonModule,
    DatePickerModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './training-equipment.html',
  styleUrl: './training-equipment.scss',
})
export class TrainingEquipment {
  protected readonly equipment = signal<Equipment[]>([
    { id: 1, name: 'Laufband', weight: null, price: 1299.99, purchaseDate: new Date(2023, 2, 12) },
    { id: 2, name: 'Hantelbank', weight: null, price: 249.5, purchaseDate: new Date(2024, 0, 8) },
    { id: 3, name: 'Crosstrainer', weight: null, price: 899, purchaseDate: new Date(2022, 10, 20) },
    { id: 4, name: 'Rudergerät', weight: null, price: 749.9, purchaseDate: new Date(2024, 4, 2) },
    {
      id: 5,
      name: 'Kettlebell-Set',
      weight: null,
      price: 189.99,
      purchaseDate: new Date(2023, 8, 15),
    },
    {
      id: 6,
      name: 'Klimmzugstange',
      weight: null,
      price: 59.95,
      purchaseDate: new Date(2024, 1, 28),
    },
    { id: 7, name: 'Langhantel', weight: 20, price: 149.99, purchaseDate: new Date(2023, 5, 10) },
    { id: 8, name: 'Kurzhantel-Set', weight: 50, price: 299, purchaseDate: new Date(2024, 2, 22) },
    { id: 9, name: 'Beinpresse', weight: null, price: 1599, purchaseDate: new Date(2022, 7, 5) },
    {
      id: 10,
      name: 'Gymnastikmatte',
      weight: null,
      price: 24.99,
      purchaseDate: new Date(2024, 3, 18),
    },
    {
      id: 11,
      name: 'Spinning-Bike',
      weight: null,
      price: 549,
      purchaseDate: new Date(2023, 11, 1),
    },
    {
      id: 12,
      name: 'Hantelscheiben-Set',
      weight: 100,
      price: 379,
      purchaseDate: new Date(2024, 1, 14),
    },
  ]);

  protected readonly today = new Date();
  protected readonly dialogVisible = signal(false);
  protected draft: EquipmentDraft = this.emptyDraft();

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  }

  protected formatWeight(value: number | null): string {
    return value === null ? '–' : `${new Intl.NumberFormat('de-DE').format(value)} kg`;
  }

  openNew(): void {
    this.draft = this.emptyDraft();
    this.dialogVisible.set(true);
  }

  save(): void {
    const name = this.draft.name.trim();
    if (!name || this.draft.price === null || this.draft.purchaseDate === null) return;

    const id = this.equipment().reduce((max, e) => Math.max(max, e.id), 0) + 1;
    this.equipment.update((list) => [
      ...list,
      {
        id,
        name,
        weight: this.draft.weight,
        price: this.draft.price!,
        purchaseDate: this.draft.purchaseDate!,
      },
    ]);
    this.dialogVisible.set(false);
  }

  private emptyDraft(): EquipmentDraft {
    return { name: '', weight: null, price: null, purchaseDate: null };
  }
}
