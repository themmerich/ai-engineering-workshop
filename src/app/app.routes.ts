import { Routes } from '@angular/router';
import { Exercises } from './pages/exercises/exercises';
import { TrainingEquipment } from './pages/training-equipment/training-equipment';

export const routes: Routes = [
  { path: '', component: TrainingEquipment },
  { path: 'uebungen', component: Exercises },
];
