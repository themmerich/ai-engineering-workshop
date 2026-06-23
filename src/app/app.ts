import { Component } from '@angular/core';
import { GlassmorphicLight } from './core/glassmorphic-light';

@Component({
  selector: 'app-root',
  imports: [GlassmorphicLight],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
