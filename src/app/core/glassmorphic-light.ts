import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-glassmorphic-light',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BadgeModule, StyleClassModule],
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
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              class="w-10 h-10"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.5 42.0498C33.098 42.0498 42.5 32.6477 42.5 21.0498C42.5 9.45183 33.098 0.0498047 21.5 0.0498047C9.902 0.0498047 0.5 9.45183 0.5 21.0498C0.5 32.6477 9.902 42.0498 21.5 42.0498ZM28.0513 9.83248C28.3702 8.69975 27.2709 8.02994 26.267 8.74516L12.2528 18.7288C11.164 19.5045 11.3353 21.0498 12.51 21.0498H16.2003V21.0212H23.3926L17.5323 23.089L14.9487 32.2671C14.6299 33.3999 15.729 34.0697 16.733 33.3544L30.7472 23.3708C31.836 22.5951 31.6646 21.0498 30.49 21.0498H24.8937L28.0513 9.83248Z"
                class="fill-surface-900 dark:fill-surface-0"
              />
            </svg>
            <div class="text-surface-900 dark:text-surface-0 text-lg font-semibold leading-tight">
              ZenTrail
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

  readonly isDark = signal(
    this.document.documentElement.classList.contains('dark'),
  );

  toggleDarkMode(): void {
    const dark = this.document.documentElement.classList.toggle('dark');
    this.isDark.set(dark);
  }
}
