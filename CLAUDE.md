# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` (`ng serve`) — dev server at `http://localhost:4200/`, hot reload.
- `npm run build` (`ng build`) — production build by default, output to `dist/`. Use `npm run watch` for an incremental development build.
- `npm test` (`ng test`) — run unit tests with Vitest. Use `ng test --no-watch` for a single run.
- Run a single test file: `ng test --include src/app/app.spec.ts`. To filter by name, use a Vitest `it.only` / `describe.only` in the spec, or pass Vitest args after `--`.
- `npm run lint` / `npm run lint:fix` — ESLint via `angular-eslint` (flat config in `eslint.config.js`).
- `npm run format` / `npm run format:check` — Prettier (`.prettierrc`, ignores in `.prettierignore`). `eslint-config-prettier` keeps the two from conflicting.
- Scaffold code: `ng generate component <name>` (or `directive`, `pipe`, etc.). Components are generated with SCSS styles per `angular.json` schematics config.

## Architecture

Angular 22 single-page application — SCSS styling, **no SSR** (browser-only, bootstrapped via `bootstrapApplication` in `src/main.ts`).

Key conventions that differ from older Angular projects — follow them when adding code:

- **Zoneless change detection.** There is no `zone.js` dependency. Do not add it or `provideZoneChangeDetection`. Use **signals** for reactive state (see `app.ts`'s `title = signal(...)`). In tests, `await fixture.whenStable()` before asserting on rendered DOM rather than relying on `fixture.detectChanges()` + Zone.
- **Standalone components, no NgModules.** Components declare their own `imports` array. App-wide providers live in `src/app/app.config.ts` (`appConfig`), wired into `bootstrapApplication`. Add providers (router, HTTP, etc.) there.
- **File/class naming.** Files drop the type suffix and classes drop the `Component`/`Module` suffix: the root component is `src/app/app.ts` exporting class `App` (not `app.component.ts` / `AppComponent`). Match this when generating or hand-writing files.
- **Routing.** Routes are defined in `src/app/app.routes.ts` and provided via `provideRouter(routes)`. The root template (`app.html`) renders a header plus `<router-outlet>`. Page components live under `src/app/pages/` (e.g. `pages/training-equipment/`).
- **Testing.** Test runner is **Vitest** (via the `@angular/build:unit-test` builder) with a `jsdom` environment — not Karma/Jasmine. Specs still use Angular's `TestBed`.

### PrimeNG

UI components come from **PrimeNG 21** (`primeng`, `@primeng/themes`, `primeicons`). It uses the styled-mode theming configured in `app.config.ts` via `providePrimeNG({ theme: { preset: Aura } })` alongside `provideAnimationsAsync()` — there are no theme CSS imports (only `primeicons/primeicons.css` in `styles.scss`). Import PrimeNG modules directly into a component's `imports` array. See `src/app/pages/training-equipment/` for a working example.

**Tailwind CSS v4** is wired in via `@tailwindcss/postcss` (`.postcssrc.json`). Because dart-sass can't resolve `@import "tailwindcss"`, the Tailwind entry lives in its own `src/styles.css` (`@import 'tailwindcss'; @plugin 'tailwindcss-primeui';`), listed alongside `src/styles.scss` in `angular.json`. The `tailwindcss-primeui` plugin supplies the `surface-*`/`primary-*` color tokens and PrimeNG-aligned `animate-*` utilities the templates use. The app shell lives in `src/app/core/glassmorphic-light.ts` and is rendered as the root layout (owns the single `<router-outlet>`).

PrimeNG 21 declares a peer dependency on Angular 21 but runs fine on this Angular 22 project. `.npmrc` sets `legacy-peer-deps=true` so installs succeed despite the mismatch — keep using `npm install` normally; do not remove that setting unless a PrimeNG release officially supports Angular 22.

## TypeScript

Strict compiler options are enabled (`tsconfig.json`): `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, plus Angular's `strictInjectionParameters` and `strictInputAccessModifiers`. Index-signature properties must be accessed with bracket notation.

## Notes

- `.claude/settings.local.json` is intentionally gitignored (local Claude Code settings).
- The production `initial` bundle budget in `angular.json` is raised (1MB warning / 2MB error) to accommodate PrimeNG.
