import { Component, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

interface StatCard {
  label: string;
  value: string;
  sublabel: string;
  icon: string;
  iconClass: string;
}

interface RecentSession {
  date: string;
  location: string;
  focus: string;
  duration: string;
  severity: 'success' | 'info' | 'warn';
}

interface Goal {
  label: string;
  current: number;
  target: number;
  unit: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, ProgressBarModule, TagModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly stats: StatCard[] = [
    {
      label: 'Einheiten diesen Monat',
      value: '8',
      sublabel: '+2 ggü. Vormonat',
      icon: 'pi pi-calendar',
      iconClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300',
    },
    {
      label: 'Trainingszeit (Monat)',
      value: '9 Std 20 min',
      sublabel: 'Ø 70 min / Einheit',
      icon: 'pi pi-clock',
      iconClass: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300',
    },
    {
      label: 'Übungen im Katalog',
      value: '24',
      sublabel: '6 Kategorien',
      icon: 'pi pi-bolt',
      iconClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300',
    },
    {
      label: 'Trainingsgeräte',
      value: '12',
      sublabel: 'Gesamtwert 6.480 €',
      icon: 'pi pi-server',
      iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300',
    },
  ];

  protected readonly recentSessions: RecentSession[] = [
    {
      date: '20.06.2026',
      location: 'Fitnessstudio',
      focus: 'Kraft',
      duration: '1 Std 15 min',
      severity: 'success',
    },
    {
      date: '15.06.2026',
      location: 'Zuhause',
      focus: 'Bodyweight',
      duration: '30 min',
      severity: 'info',
    },
    {
      date: '08.06.2026',
      location: 'Fitnessstudio',
      focus: 'Kraft',
      duration: '1 Std',
      severity: 'success',
    },
    {
      date: '28.05.2026',
      location: 'Park',
      focus: 'Cardio',
      duration: '35 min',
      severity: 'warn',
    },
  ];

  protected readonly goals: Goal[] = [
    { label: 'Monatsziel Einheiten', current: 8, target: 12, unit: 'Einheiten' },
    { label: 'Trainingszeit', current: 560, target: 720, unit: 'min' },
    { label: 'Cardio-Einheiten', current: 3, target: 5, unit: 'Einheiten' },
  ];

  protected readonly sessionsChart = signal(this.buildSessionsChart());
  protected readonly focusChart = signal(this.buildFocusChart());
  protected readonly chartOptions = signal(this.buildBarOptions());
  protected readonly doughnutOptions = signal(this.buildDoughnutOptions());

  protected progress(goal: Goal): number {
    return Math.min(100, Math.round((goal.current / goal.target) * 100));
  }

  private buildSessionsChart() {
    return {
      labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni'],
      datasets: [
        {
          label: 'Trainingseinheiten',
          data: [5, 7, 6, 9, 7, 8],
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  }

  private buildFocusChart() {
    return {
      labels: ['Kraft', 'Cardio', 'Bodyweight'],
      datasets: [
        {
          data: [55, 25, 20],
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(244, 114, 182, 0.8)',
            'rgba(16, 185, 129, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    };
  }

  private buildBarOptions() {
    const textColor = '#94a3b8';
    const gridColor = 'rgba(148, 163, 184, 0.2)';
    return {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor }, grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: { color: textColor, stepSize: 2 },
          grid: { color: gridColor },
        },
      },
    };
  }

  private buildDoughnutOptions() {
    return {
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8', usePointStyle: true } },
      },
    };
  }
}
