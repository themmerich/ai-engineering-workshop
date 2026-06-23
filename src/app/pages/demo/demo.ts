import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-demo',
  imports: [FormsModule, ButtonModule, CardModule, InputTextModule, TagModule],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {
  protected readonly name = signal('');
  protected readonly count = signal(0);

  protected readonly greeting = computed(() => {
    const value = this.name().trim();
    return value ? `Hallo, ${value}!` : 'Bitte gib deinen Namen ein.';
  });

  protected readonly countSeverity = computed(() => {
    const value = this.count();
    if (value > 0) return 'success';
    if (value < 0) return 'danger';
    return 'info';
  });

  increment(): void {
    this.count.update((value) => value + 1);
  }

  decrement(): void {
    this.count.update((value) => value - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
