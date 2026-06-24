import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';

type ExerciseKind = 'strength' | 'bodyweight' | 'cardio';

function usesSets(kind: ExerciseKind | null): boolean {
  return kind === 'strength' || kind === 'bodyweight';
}

interface ExerciseOption {
  name: string;
  kind: ExerciseKind;
}

interface StrengthSet {
  weight: number | null;
  reps: number;
}

interface SessionExercise {
  exercise: string;
  kind: ExerciseKind;
  sets: StrengthSet[];
  duration: number | null;
  speed: number | null;
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

interface StrengthSetDraft {
  weight: number | null;
  reps: number | null;
}

interface SessionExerciseDraft {
  exercise: string | null;
  kind: ExerciseKind | null;
  sets: StrengthSetDraft[];
  duration: number | null;
  speed: number | null;
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

function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE').format(value);
}

@Component({
  selector: 'app-training-sessions',
  imports: [
    DatePipe,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DatePickerModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TextareaModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './training-sessions.html',
  styleUrl: './training-sessions.scss',
})
export class TrainingSessions {
  private readonly confirmationService = inject(ConfirmationService);

  protected readonly today = new Date();
  protected editingId: number | null = null;

  protected readonly exerciseOptions: ExerciseOption[] = [
    { name: 'Bankdrücken', kind: 'strength' },
    { name: 'Kniebeuge', kind: 'strength' },
    { name: 'Liegestütze', kind: 'bodyweight' },
    { name: 'Klimmzüge', kind: 'bodyweight' },
    { name: 'Bizeps-Curls', kind: 'strength' },
    { name: 'Kettlebell Swings', kind: 'strength' },
    { name: 'Beinpresse', kind: 'strength' },
    { name: 'Laufen', kind: 'cardio' },
    { name: 'Rudern', kind: 'cardio' },
    { name: 'Plank', kind: 'cardio' },
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

  protected summarize(ex: SessionExercise): string {
    if (ex.kind === 'cardio') {
      const parts = [`${ex.duration} min`];
      if (ex.speed !== null) parts.push(`${formatNumber(ex.speed)} km/h`);
      return parts.join(' · ');
    }
    return ex.sets
      .map((s) =>
        s.weight !== null ? `${formatNumber(s.weight)} kg × ${s.reps}` : `${s.reps} Wdh`,
      )
      .join(', ');
  }

  protected countForMonth(monthKey: string): number {
    return this.sessions().filter((s) => s.monthKey === monthKey).length;
  }

  protected canSave(): boolean {
    const d = this.draft;
    if (d.date === null || !d.location.trim() || d.duration === null) return false;
    if (d.exercises.length === 0) return false;
    return d.exercises.every((row) => this.isExerciseComplete(row));
  }

  protected isSetsBased(kind: ExerciseKind | null): boolean {
    return usesSets(kind);
  }

  protected isExerciseComplete(row: SessionExerciseDraft): boolean {
    if (row.exercise === null || row.kind === null) return false;
    if (usesSets(row.kind)) {
      return row.sets.length > 0 && row.sets.every((s) => s.reps !== null);
    }
    return row.duration !== null;
  }

  openNew(): void {
    this.editingId = null;
    this.draft = this.emptyDraft();
    this.dialogVisible.set(true);
  }

  openEdit(session: TrainingSession): void {
    this.editingId = session.id;
    this.draft = {
      date: new Date(session.date),
      location: session.location,
      exercises: session.exercises.map((ex) => ({
        exercise: ex.exercise,
        kind: ex.kind,
        sets: ex.sets.map((s) => ({ weight: s.weight, reps: s.reps })),
        duration: ex.duration,
        speed: ex.speed,
      })),
      duration: session.duration,
      notes: session.notes,
    };
    this.dialogVisible.set(true);
  }

  confirmDelete(session: TrainingSession): void {
    const label = new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(session.date);
    this.confirmationService.confirm({
      header: 'Trainingseinheit löschen',
      message: `Trainingseinheit vom ${label} Uhr wirklich löschen?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Löschen',
      rejectLabel: 'Abbrechen',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.sessions.update((list) => list.filter((s) => s.id !== session.id));
      },
    });
  }

  onExerciseChange(row: SessionExerciseDraft): void {
    const kind = this.exerciseOptions.find((o) => o.name === row.exercise)?.kind ?? null;
    row.kind = kind;
    row.sets = usesSets(kind) ? [{ weight: null, reps: null }] : [];
    row.duration = null;
    row.speed = null;
  }

  addExerciseRow(): void {
    this.draft.exercises.push(this.emptyExerciseRow());
  }

  removeExerciseRow(index: number): void {
    this.draft.exercises.splice(index, 1);
  }

  addSet(row: SessionExerciseDraft): void {
    row.sets.push({ weight: null, reps: null });
  }

  removeSet(row: SessionExerciseDraft, index: number): void {
    row.sets.splice(index, 1);
  }

  save(): void {
    if (!this.canSave()) return;
    const d = this.draft;
    const date = d.date!;
    const id = this.editingId ?? this.sessions().reduce((max, s) => Math.max(max, s.id), 0) + 1;

    const session: TrainingSession = {
      id,
      date,
      location: d.location.trim(),
      exercises: d.exercises.map((row) => ({
        exercise: row.exercise!,
        kind: row.kind!,
        sets: usesSets(row.kind)
          ? row.sets.map((s) => ({
              weight: row.kind === 'strength' ? s.weight : null,
              reps: s.reps!,
            }))
          : [],
        duration: row.kind === 'cardio' ? row.duration : null,
        speed: row.kind === 'cardio' ? row.speed : null,
      })),
      duration: d.duration!,
      notes: d.notes.trim(),
      monthKey: monthKeyOf(date),
      monthLabel: monthLabelOf(date),
    };

    this.sessions.update((list) => {
      const others = this.editingId === null ? list : list.filter((s) => s.id !== this.editingId);
      return sortByDateDesc([...others, session]);
    });
    this.dialogVisible.set(false);
    this.editingId = null;
  }

  private emptyExerciseRow(): SessionExerciseDraft {
    return { exercise: null, kind: null, sets: [], duration: null, speed: null };
  }

  private emptyDraft(): SessionDraft {
    return {
      date: null,
      location: '',
      exercises: [this.emptyExerciseRow()],
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
          {
            exercise: 'Bankdrücken',
            kind: 'strength',
            sets: [
              { weight: 60, reps: 8 },
              { weight: 65, reps: 8 },
              { weight: 65, reps: 6 },
            ],
            duration: null,
            speed: null,
          },
          {
            exercise: 'Kniebeuge',
            kind: 'strength',
            sets: [
              { weight: 80, reps: 5 },
              { weight: 85, reps: 5 },
            ],
            duration: null,
            speed: null,
          },
        ],
        duration: 75,
        notes: 'Gut gefühlt, neue Bestleistung beim Bankdrücken.',
      },
      {
        id: 2,
        date: new Date(2026, 5, 15, 7, 0),
        location: 'Zuhause',
        exercises: [
          {
            exercise: 'Liegestütze',
            kind: 'strength',
            sets: [
              { weight: null, reps: 15 },
              { weight: null, reps: 12 },
            ],
            duration: null,
            speed: null,
          },
          {
            exercise: 'Plank',
            kind: 'cardio',
            sets: [],
            duration: 2,
            speed: null,
          },
        ],
        duration: 30,
        notes: '',
      },
      {
        id: 3,
        date: new Date(2026, 5, 8, 17, 0),
        location: 'Fitnessstudio',
        exercises: [
          {
            exercise: 'Klimmzüge',
            kind: 'strength',
            sets: [
              { weight: null, reps: 8 },
              { weight: null, reps: 7 },
              { weight: null, reps: 6 },
            ],
            duration: null,
            speed: null,
          },
          {
            exercise: 'Rudern',
            kind: 'cardio',
            sets: [],
            duration: 15,
            speed: null,
          },
        ],
        duration: 60,
        notes: 'Rücken-Fokus.',
      },
      {
        id: 4,
        date: new Date(2026, 4, 28, 19, 0),
        location: 'Park',
        exercises: [
          {
            exercise: 'Laufen',
            kind: 'cardio',
            sets: [],
            duration: 30,
            speed: 10,
          },
        ],
        duration: 35,
        notes: 'Lockerer Dauerlauf.',
      },
      {
        id: 5,
        date: new Date(2026, 4, 12, 18, 0),
        location: 'Fitnessstudio',
        exercises: [
          {
            exercise: 'Beinpresse',
            kind: 'strength',
            sets: [
              { weight: 120, reps: 10 },
              { weight: 140, reps: 8 },
            ],
            duration: null,
            speed: null,
          },
          {
            exercise: 'Kniebeuge',
            kind: 'strength',
            sets: [{ weight: 70, reps: 8 }],
            duration: null,
            speed: null,
          },
        ],
        duration: 50,
        notes: '',
      },
      {
        id: 6,
        date: new Date(2026, 3, 22, 18, 30),
        location: 'Fitnessstudio',
        exercises: [
          {
            exercise: 'Bankdrücken',
            kind: 'strength',
            sets: [
              { weight: 60, reps: 5 },
              { weight: 65, reps: 5 },
              { weight: 70, reps: 5 },
            ],
            duration: null,
            speed: null,
          },
          {
            exercise: 'Bizeps-Curls',
            kind: 'strength',
            sets: [
              { weight: 15, reps: 12 },
              { weight: 15, reps: 10 },
            ],
            duration: null,
            speed: null,
          },
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
