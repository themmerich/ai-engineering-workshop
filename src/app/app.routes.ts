import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Exercises } from './pages/exercises/exercises';
import { TrainingEquipment } from './pages/training-equipment/training-equipment';
import { TrainingSessions } from './pages/training-sessions/training-sessions';

export const routes: Routes = [
  { path: '', component: TrainingEquipment },
  { path: 'dashboard', component: Dashboard },
  { path: 'uebungen', component: Exercises },
  { path: 'trainingseinheiten', component: TrainingSessions },
];
