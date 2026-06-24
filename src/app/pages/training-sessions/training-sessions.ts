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
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';

interface SessionExercise {
  exercise: string;
  sets: number;
  reps: string;
}

interface TrainingSession {
  id: number;
  date: Date;
  location: string;
  exercises: SessionExercise[];
  duration: number;
  notes: string;
  monthKey: string;
  monthLabel: string;
}

interface SessionExerciseDraft {
  exercise: string | null;
  sets: number | null;
  reps: string;
}

interface SessionDraft {
  date: Date | null;
  location: string;
  exercises: SessionExerciseDraft[];
  duration: number | null;
  notes: string;
}

function monthKeyOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabelOf(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(date);
}

function sortByDateDesc(sessions: TrainingSession[]): TrainingSession[] {
  return [...sessions].sort((a, b) => b.date.getTime() - a.date.getTime());
}

@Component({
  selector: 'app-training-sessions',
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
    SelectModule,
    TableModule,
    TagModule,
    TextareaModule,
  ],
  templateUrl: './training-sessions.html',
  styleUrl: './training-sessions.scss',
})
export class TrainingSessions {
  protected readonly today = new Date();

  protected readonly exerciseOptions = [
    'Bankdrücken',
    'Kniebeuge',
    'Liegestütze',
    'Klimmzüge',
    'Plank',
    'Laufen',
    'Rudern',
    'Bizeps-Curls',
    'Kettlebell Swings',
    'Beinpresse',
  ];

  protected readonly sessions = signal<TrainingSession[]>(this.buildInitial());

  protected readonly dialogVisible = signal(false);
  protected draft: SessionDraft = this.emptyDraft();

  protected formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0 ? `${hours} Std` : `${hours} Std ${rest} min`;
  }

  protected countForMonth(monthKey: string): number {
    return this.sessions().filter((s) => s.monthKey === monthKey).length;
  }

  protected canSave(): boolean {
    const d = this.draft;
    if (d.date === null || !d.location.trim() || d.duration === null) return false;
    if (d.exercises.length === 0) return false;
    return d.exercises.every((r) => r.exercise !== null && r.sets !== null && r.reps.trim() !== '');
  }

  openNew(): void {
    this.draft = this.emptyDraft();
    this.dialogVisible.set(true);
  }

  addExerciseRow(): void {
    this.draft.exercises.push({ exercise: null, sets: null, reps: '' });
  }

  removeExerciseRow(index: number): void {
    this.draft.exercises.splice(index, 1);
  }

  save(): void {
    if (!this.canSave()) return;
    const d = this.draft;
    const date = d.date!;
    const id = this.sessions().reduce((max, s) => Math.max(max, s.id), 0) + 1;

    const session: TrainingSession = {
      id,
      date,
      location: d.location.trim(),
      exercises: d.exercises.map((r) => ({
        exercise: r.exercise!,
        sets: r.sets!,
        reps: r.reps.trim(),
      })),
      duration: d.duration!,
      notes: d.notes.trim(),
      monthKey: monthKeyOf(date),
      monthLabel: monthLabelOf(date),
    };

    this.sessions.update((list) => sortByDateDesc([...list, session]));
    this.dialogVisible.set(false);
  }

  private emptyDraft(): SessionDraft {
    return {
      date: null,
      location: '',
      exercises: [{ exercise: null, sets: null, reps: '' }],
      duration: null,
      notes: '',
    };
  }

  private buildInitial(): TrainingSession[] {
    const raw: Omit<TrainingSession, 'monthKey' | 'monthLabel'>[] = [
      {
        id: 1,
        date: new Date(2026, 5, 20, 18, 30),
        location: 'Fitnessstudio',
        exercises: [
          { exercise: 'Bankdrücken', sets: 4, reps: '8–12' },
          { exercise: 'Kniebeuge', sets: 5, reps: '5' },
        ],
        duration: 75,
        notes: 'Gut gefühlt, neue Bestleistung beim Bankdrücken.',
      },
      {
        id: 2,
        date: new Date(2026, 5, 15, 7, 0),
        location: 'Zuhause',
        exercises: [
          { exercise: 'Liegestütze', sets: 3, reps: '15' },
          { exercise: 'Plank', sets: 3, reps: '60 Sek.' },
        ],
        duration: 30,
        notes: '',
      },
      {
        id: 3,
        date: new Date(2026, 5, 8, 17, 0),
        location: 'Fitnessstudio',
        exercises: [
          { exercise: 'Klimmzüge', sets: 4, reps: '8' },
          { exercise: 'Rudern', sets: 3, reps: '12' },
        ],
        duration: 60,
        notes: 'Rücken-Fokus.',
      },
      {
        id: 4,
        date: new Date(2026, 4, 28, 19, 0),
        location: 'Park',
        exercises: [{ exercise: 'Laufen', sets: 1, reps: '30 min' }],
        duration: 35,
        notes: 'Lockerer Dauerlauf.',
      },
      {
        id: 5,
        date: new Date(2026, 4, 12, 18, 0),
        location: 'Fitnessstudio',
        exercises: [
          { exercise: 'Beinpresse', sets: 4, reps: '10' },
          { exercise: 'Kniebeuge', sets: 4, reps: '8' },
        ],
        duration: 50,
        notes: '',
      },
      {
        id: 6,
        date: new Date(2026, 3, 22, 18, 30),
        location: 'Fitnessstudio',
        exercises: [
          { exercise: 'Bankdrücken', sets: 5, reps: '5' },
          { exercise: 'Bizeps-Curls', sets: 3, reps: '12' },
        ],
        duration: 55,
        notes: 'Kraft-Tag.',
      },
    ];

    return sortByDateDesc(
      raw.map((s) => ({ ...s, monthKey: monthKeyOf(s.date), monthLabel: monthLabelOf(s.date) })),
    );
  }
}
