import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  sets: number;
  reps: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
}

@Component({
  selector: 'app-training-equipment',
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './training-equipment.html',
  styleUrl: './training-equipment.scss',
})
export class TrainingEquipment {
  protected readonly difficulties: Exercise['difficulty'][] = ['Einfach', 'Mittel', 'Schwer'];

  protected readonly exercises = signal<Exercise[]>([
    {
      id: 1,
      name: 'Bankdrücken',
      muscleGroup: 'Brust',
      equipment: 'Langhantel',
      sets: 4,
      reps: '8–12',
      difficulty: 'Mittel',
    },
    {
      id: 2,
      name: 'Kniebeuge',
      muscleGroup: 'Beine',
      equipment: 'Langhantel',
      sets: 5,
      reps: '5–8',
      difficulty: 'Schwer',
    },
    {
      id: 3,
      name: 'Klimmzüge',
      muscleGroup: 'Rücken',
      equipment: 'Klimmzugstange',
      sets: 4,
      reps: '6–10',
      difficulty: 'Schwer',
    },
    {
      id: 4,
      name: 'Schulterdrücken',
      muscleGroup: 'Schultern',
      equipment: 'Kurzhanteln',
      sets: 3,
      reps: '10–12',
      difficulty: 'Mittel',
    },
    {
      id: 5,
      name: 'Bizeps-Curls',
      muscleGroup: 'Arme',
      equipment: 'Kurzhanteln',
      sets: 3,
      reps: '12–15',
      difficulty: 'Einfach',
    },
    {
      id: 6,
      name: 'Beinpresse',
      muscleGroup: 'Beine',
      equipment: 'Beinpresse',
      sets: 4,
      reps: '10–12',
      difficulty: 'Mittel',
    },
    {
      id: 7,
      name: 'Plank',
      muscleGroup: 'Core',
      equipment: 'Körpergewicht',
      sets: 3,
      reps: '60 Sek.',
      difficulty: 'Einfach',
    },
    {
      id: 8,
      name: 'Kreuzheben',
      muscleGroup: 'Rücken',
      equipment: 'Langhantel',
      sets: 4,
      reps: '5–6',
      difficulty: 'Schwer',
    },
  ]);

  protected readonly dialogVisible = signal(false);
  protected draft: Omit<Exercise, 'id'> = this.emptyDraft();

  protected difficultySeverity(difficulty: Exercise['difficulty']): Tag['severity'] {
    switch (difficulty) {
      case 'Einfach':
        return 'success';
      case 'Mittel':
        return 'warn';
      case 'Schwer':
        return 'danger';
    }
  }

  openNew(): void {
    this.draft = this.emptyDraft();
    this.dialogVisible.set(true);
  }

  save(): void {
    const name = this.draft.name.trim();
    if (!name) return;

    const id = this.exercises().reduce((max, e) => Math.max(max, e.id), 0) + 1;
    this.exercises.update((list) => [...list, { id, ...this.draft, name }]);
    this.dialogVisible.set(false);
  }

  private emptyDraft(): Omit<Exercise, 'id'> {
    return {
      name: '',
      muscleGroup: '',
      equipment: '',
      sets: 3,
      reps: '',
      difficulty: 'Mittel',
    };
  }
}
