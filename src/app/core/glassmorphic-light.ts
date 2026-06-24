import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-glassmorphic-light',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    BadgeModule,
    StyleClassModule,
  ],
  template: `
    <div
      class="resize-container-7 min-h-screen flex relative lg:static bg-surface-0 dark:bg-surface-900 bg-linear-to-br from-blue-100 from-40% via-pink-200 via-80% to-indigo-200 dark:from-blue-300/80 dark:via-pink-300/80 dark:to-indigo-400/80"
    >
      <div
        id="app-sidebar-7"
        class="w-[280px] backdrop-blur-lg h-screen hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 border-r select-none animate-duration-300 animate-ease-in-out bg-white/70 dark:bg-surface-900/70 border-white/30 dark:border-surface-700/30"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center p-4 gap-4 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              class="w-10 h-10"
            >
              <path
                d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
                class="fill-surface-900 dark:fill-surface-0"
              />
            </svg>
            <div class="text-surface-900 dark:text-surface-0 text-lg font-semibold leading-tight">
              Workout
            </div>
          </div>
          <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-4">
            <div class="flex flex-col">
              <div
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-slidedown"
                leaveToClass="hidden"
                leaveActiveClass="animate-slideup"
                class="p-3 rounded-lg flex items-center justify-between text-surface-900 dark:text-surface-0 cursor-pointer border border-transparent hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
              >
                <span class="text-base font-semibold">Home</span>
                <i
                  class="pi pi-chevron-down text-sm! leading-tight! text-surface-500 dark:text-surface-400 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                ></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden flex flex-col gap-1">
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-home text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-bookmark text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Bookmarks</span>
                    <p-badge
                      value="8"
                      severity="contrast"
                      size="small"
                      class="text-xs! font-bold! h-5! min-w-5! rounded-xl!"
                    ></p-badge>
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/"
                    routerLinkActive="bg-white/80 dark:bg-surface-950/50 text-surface-900! dark:text-surface-0!"
                    [routerLinkActiveOptions]="{ exact: true }"
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-server text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Trainingsgeräte</span>
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/uebungen"
                    routerLinkActive="bg-white/80 dark:bg-surface-950/50 text-surface-900! dark:text-surface-0!"
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-bolt text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Übungen</span>
                  </a>
                </li>
                <li>
                  <a
                    routerLink="/trainingseinheiten"
                    routerLinkActive="bg-white/80 dark:bg-surface-950/50 text-surface-900! dark:text-surface-0!"
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-history text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight"
                      >Trainingseinheiten</span
                    >
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-users text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Team</span>
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-comments text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Messages</span>
                    <p-badge
                      value="2"
                      severity="secondary"
                      size="small"
                      class="text-xs! font-bold! h-5! min-w-5! rounded-xl!"
                    ></p-badge>
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <i
                      class="pi pi-calendar text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                    ></i>
                    <span class="flex-1 text-base font-medium leading-tight">Calendar</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="h-px bg-surface-900/10 dark:bg-surface-0/10"></div>

            <div class="flex flex-col gap-1">
              <div
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-slidedown"
                leaveToClass="hidden"
                leaveActiveClass="animate-slideup"
                class="p-3 rounded-lg flex items-center justify-between text-surface-900 dark:text-surface-0 cursor-pointer border border-transparent hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
              >
                <span class="text-base font-semibold">Your Networks</span>
                <i
                  class="pi pi-chevron-down text-sm! leading-tight! text-surface-500 dark:text-surface-400 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                ></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden flex flex-col gap-1">
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 duration-150 transition-colors group"
                  >
                    <span
                      class="p-1 bg-violet-100 dark:bg-violet-900/50 rounded outline outline-1 outline-violet-200 dark:outline-violet-700 flex items-center justify-center"
                    >
                      <i
                        class="pi pi-sparkles text-xs! leading-tight! text-violet-600 dark:text-violet-300 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                      ></i>
                    </span>
                    <span class="flex-1 text-base font-medium leading-tight"
                      >Front-End Developers</span
                    >
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:outline-white dark:hover:outline-surface-700 duration-150 transition-colors group"
                  >
                    <span
                      class="p-1 bg-amber-100 dark:bg-amber-900/50 rounded outline outline-1 outline-amber-200 dark:outline-amber-700 flex items-center justify-center"
                    >
                      <i
                        class="pi pi-bolt text-xs! leading-tight! text-amber-600 dark:text-amber-300 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                      ></i>
                    </span>
                    <span class="flex-1 text-base font-medium leading-tight"
                      >Back-End Developers</span
                    >
                  </a>
                </li>
                <li>
                  <a
                    class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 transition-colors group"
                  >
                    <span
                      class="p-1 bg-lime-100 dark:bg-lime-900/50 rounded outline outline-1 outline-lime-200 dark:outline-lime-700 flex items-center justify-center"
                    >
                      <i
                        class="pi pi-pencil text-xs! leading-tight! text-lime-600 dark:text-lime-300 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                      ></i>
                    </span>
                    <span class="flex-1 text-base font-medium leading-tight">UI/UX Designers</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-auto border-t border-white/30 dark:border-surface-700/50">
            <ul class="list-none p-2 m-0 overflow-hidden hidden animate-duration-150">
              <li>
                <a
                  class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 transition-colors group"
                >
                  <i
                    class="pi pi-user text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                  ></i>
                  <span class="flex-1 text-base font-medium leading-tight">Profile</span>
                </a>
              </li>
              <li>
                <a
                  class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 transition-colors group"
                >
                  <i
                    class="pi pi-cog text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                  ></i>
                  <span class="flex-1 text-base font-medium leading-tight">Settings</span>
                </a>
              </li>
              <li>
                <a
                  class="p-3 rounded-lg flex items-center gap-2 cursor-pointer text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 transition-colors group"
                >
                  <i
                    class="pi pi-sign-out text-base! leading-tight! text-surface-700 dark:text-surface-200 group-hover:text-surface-900 dark:group-hover:text-surface-0"
                  ></i>
                  <span class="flex-1 text-base font-medium leading-tight">Sign Out</span>
                </a>
              </li>
            </ul>
            <a
              pStyleClass="@prev"
              enterFromClass="hidden"
              enterActiveClass="animate-slidedown"
              leaveToClass="hidden"
              leaveActiveClass="animate-slideup"
              class="p-3 rounded-lg flex items-center gap-2 border border-transparent hover:text-surface-900 dark:hover:text-surface-0 hover:bg-white/80 dark:hover:bg-surface-950/50 hover:outline-white dark:hover:outline-surface-700 cursor-pointer duration-150 transition-colors group"
            >
              <img
                alt="Amy Elsner"
                src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png"
                class="w-8 h-8 rounded-full"
              />
              <span
                class="flex-1 text-surface-900 dark:text-surface-0 text-base font-medium leading-tight"
                >Amy Elsner</span
              >
              <i
                class="pi pi-chevron-up text-base! leading-tight! text-surface-500 dark:text-surface-400 group-hover:text-surface-900 dark:group-hover:text-surface-0"
              ></i>
            </a>
          </div>
        </div>
      </div>
      <div class="min-h-screen flex flex-col relative flex-auto">
        <div
          class="h-[60px] flex justify-end items-center px-8 border-b relative lg:static bg-white/20 dark:bg-surface-900/20 border-white/30 dark:border-surface-700/30"
        >
          <div class="flex items-center justify-between gap-8 w-full lg:w-auto">
            <a
              pStyleClass="#app-sidebar-7"
              enterFromClass="hidden"
              enterActiveClass="animate-fadeinleft"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeoutleft"
              [hideOnOutsideClick]="true"
              [hideOnResize]="true"
              resizeSelector=".resize-container-7"
              class="cursor-pointer flex items-center justify-center lg:hidden text-surface-700 dark:text-surface-200"
            >
              <i class="pi pi-bars text-xl! leading-none!"></i>
            </a>
            <div class="flex items-center gap-8">
              <button
                type="button"
                (click)="toggleDarkMode()"
                [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
                [attr.aria-pressed]="isDark()"
                class="flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 transition-colors"
              >
                <i
                  [class]="isDark() ? 'pi pi-sun' : 'pi pi-moon'"
                  class="text-xl! leading-tight!"
                ></i>
              </button>
              <i
                class="pi pi-bell text-xl! leading-tight! text-surface-700 dark:text-surface-200 cursor-pointer"
              ></i>
              <img
                alt="Amy Elsner"
                src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png"
                class="w-8 h-8 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div class="p-8 flex flex-col flex-auto">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class GlassmorphicLight {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(this.document.documentElement.classList.contains('dark'));

  toggleDarkMode(): void {
    const dark = this.document.documentElement.classList.toggle('dark');
    this.isDark.set(dark);
  }
}
