# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` (`ng serve`) — dev server at `http://localhost:4200/`, hot reload.
- `npm run build` (`ng build`) — production build by default, output to `dist/`. Use `npm run watch` for an incremental development build.
- `npm test` (`ng test`) — run unit tests with Vitest.
- Run a single test file: `ng test --include src/app/app.spec.ts`. To filter by name, use a Vitest `it.only` / `describe.only` in the spec, or pass Vitest args after `--`.
- Scaffold code: `ng generate component <name>` (or `directive`, `pipe`, etc.). Components are generated with SCSS styles per `angular.json` schematics config.

## Architecture

Angular 22 single-page application — SCSS styling, **no SSR** (browser-only, bootstrapped via `bootstrapApplication` in `src/main.ts`).

Key conventions that differ from older Angular projects — follow them when adding code:

- **Zoneless change detection.** There is no `zone.js` dependency. Do not add it or `provideZoneChangeDetection`. Use **signals** for reactive state (see `app.ts`'s `title = signal(...)`). In tests, `await fixture.whenStable()` before asserting on rendered DOM rather than relying on `fixture.detectChanges()` + Zone.
- **Standalone components, no NgModules.** Components declare their own `imports` array. App-wide providers live in `src/app/app.config.ts` (`appConfig`), wired into `bootstrapApplication`. Add providers (router, HTTP, etc.) there.
- **File/class naming.** Files drop the type suffix and classes drop the `Component`/`Module` suffix: the root component is `src/app/app.ts` exporting class `App` (not `app.component.ts` / `AppComponent`). Match this when generating or hand-writing files.
- **Routing.** Routes are defined in `src/app/app.routes.ts` (currently empty) and provided via `provideRouter(routes)`. The root template renders a `<router-outlet>`.
- **Testing.** Test runner is **Vitest** (via the `@angular/build:unit-test` builder) with a `jsdom` environment — not Karma/Jasmine. Specs still use Angular's `TestBed`.

## TypeScript

Strict compiler options are enabled (`tsconfig.json`): `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, plus Angular's `strictInjectionParameters` and `strictInputAccessModifiers`. Index-signature properties must be accessed with bracket notation.

## Notes

- `.claude/settings.local.json` is intentionally gitignored (local Claude Code settings).
- No linter is configured; Prettier is installed (config in `.prettierrc`) for formatting.
