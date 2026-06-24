import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';

type Difficulty = 'Anfänger' | 'Fortgeschritten' | 'Profi';

interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string[];
  difficulty: Difficulty;
  description: string;
}

interface ExerciseDraft {
  name: string;
  category: string | null;
  muscleGroup: string;
  equipment: string[];
  difficulty: Difficulty | null;
  description: string;
}

@Component({
  selector: 'app-exercises',
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    TableModule,
    TagModule,
    TextareaModule,
  ],
  templateUrl: './exercises.html',
  styleUrl: './exercises.scss',
})
export class Exercises {
  protected readonly categories = ['Cardio', 'Bodyweight', 'Kraft', 'Mobility'];
  protected readonly difficulties: Difficulty[] = ['Anfänger', 'Fortgeschritten', 'Profi'];
  protected readonly equipmentOptions = [
    'Langhantel',
    'Kurzhanteln',
    'Hantelbank',
    'Klimmzugstange',
    'Beinpresse',
    'Laufband',
    'Crosstrainer',
    'Rudergerät',
    'Kettlebell',
    'Körpergewicht',
    'Gymnastikmatte',
    'Spinning-Bike',
  ];

  protected readonly exercises = signal<Exercise[]>([
    {
      id: 1,
      name: 'Bankdrücken',
      category: 'Kraft',
      muscleGroup: 'Brust',
      equipment: ['Langhantel', 'Hantelbank'],
      difficulty: 'Fortgeschritten',
      description:
        'Auf der Bank liegend die Langhantel kontrolliert zur Brust senken und wieder nach oben drücken.',
    },
    {
      id: 2,
      name: 'Kniebeuge',
      category: 'Kraft',
      muscleGroup: 'Beine',
      equipment: ['Langhantel'],
      difficulty: 'Fortgeschritten',
      description:
        'Mit der Langhantel auf dem Rücken in die Hocke gehen, bis die Oberschenkel parallel zum Boden sind, dann hochdrücken.',
    },
    {
      id: 3,
      name: 'Liegestütze',
      category: 'Bodyweight',
      muscleGroup: 'Brust',
      equipment: ['Körpergewicht'],
      difficulty: 'Anfänger',
      description:
        'Im Stütz den Körper gestreckt halten und durch Beugen der Arme zum Boden absenken.',
    },
    {
      id: 4,
      name: 'Klimmzüge',
      category: 'Bodyweight',
      muscleGroup: 'Rücken',
      equipment: ['Klimmzugstange'],
      difficulty: 'Profi',
      description: 'An der Stange hängend den Körper hochziehen, bis das Kinn über der Stange ist.',
    },
    {
      id: 5,
      name: 'Plank',
      category: 'Bodyweight',
      muscleGroup: 'Core',
      equipment: ['Gymnastikmatte'],
      difficulty: 'Anfänger',
      description: 'Im Unterarmstütz den Körper gestreckt und stabil halten.',
    },
    {
      id: 6,
      name: 'Laufen',
      category: 'Cardio',
      muscleGroup: 'Ausdauer',
      equipment: ['Laufband'],
      difficulty: 'Anfänger',
      description: 'Gleichmäßiges Ausdauertraining auf dem Laufband im gewählten Tempo.',
    },
    {
      id: 7,
      name: 'Rudern',
      category: 'Cardio',
      muscleGroup: 'Rücken',
      equipment: ['Rudergerät'],
      difficulty: 'Fortgeschritten',
      description: 'Mit Beinen, Rumpf und Armen den Zug am Rudergerät dynamisch ausführen.',
    },
    {
      id: 8,
      name: 'Bizeps-Curls',
      category: 'Kraft',
      muscleGroup: 'Arme',
      equipment: ['Kurzhanteln'],
      difficulty: 'Anfänger',
      description: 'Die Kurzhanteln aus gestreckten Armen kontrolliert zur Schulter beugen.',
    },
    {
      id: 9,
      name: 'Kettlebell Swings',
      category: 'Kraft',
      muscleGroup: 'Ganzkörper',
      equipment: ['Kettlebell'],
      difficulty: 'Fortgeschritten',
      description:
        'Die Kettlebell aus der Hüfte explosiv nach vorne schwingen und kontrolliert zurückführen.',
    },
  ]);

  protected readonly dialogVisible = signal(false);
  protected draft: ExerciseDraft = this.emptyDraft();

  protected difficultySeverity(difficulty: Difficulty): Tag['severity'] {
    switch (difficulty) {
      case 'Anfänger':
        return 'success';
      case 'Fortgeschritten':
        return 'warn';
      case 'Profi':
        return 'danger';
    }
  }

  openNew(): void {
    this.draft = this.emptyDraft();
    this.dialogVisible.set(true);
  }

  save(): void {
    const name = this.draft.name.trim();
    if (!name || this.draft.category === null || this.draft.difficulty === null) return;

    const id = this.exercises().reduce((max, e) => Math.max(max, e.id), 0) + 1;
    this.exercises.update((list) => [
      ...list,
      {
        id,
        name,
        category: this.draft.category!,
        muscleGroup: this.draft.muscleGroup.trim(),
        equipment: [...this.draft.equipment],
        difficulty: this.draft.difficulty!,
        description: this.draft.description.trim(),
      },
    ]);
    this.dialogVisible.set(false);
  }

  private emptyDraft(): ExerciseDraft {
    return {
      name: '',
      category: null,
      muscleGroup: '',
      equipment: [],
      difficulty: null,
      description: '',
    };
  }
}
