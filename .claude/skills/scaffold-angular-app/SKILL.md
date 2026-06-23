---
name: scaffold-angular-app
description: Scaffold a new Angular 22 app with the project's standard stack — SCSS, no SSR, ESLint + Prettier, and PrimeNG with a demo page. Use when creating or setting up a new Angular project, or when the user wants the same structure/stack as this repository.
---

# Scaffold Angular App

Set up a new Angular 22 application with the exact stack this repo uses. Work through the steps in order; each ends on a green command. The verbatim file bodies live in `assets/` — copy them rather than retyping, so every run is identical.

`<asset>` below means `.claude/skills/scaffold-angular-app/assets/`. Run all commands from the target project directory.

## Two lessons that will bite you

These cost a failed build last time — apply them up front, don't rediscover them:

- **Peer mismatch.** PrimeNG's latest major still peers on the _previous_ Angular major, so every `npm install` needs `--legacy-peer-deps`. Make it permanent by copying `<asset>/.npmrc` into the project before installing PrimeNG.
- **Missing animations.** `provideAnimationsAsync()` lazy-imports `@angular/animations/browser`. If `@angular/animations` (and `@angular/cdk`) aren't installed, the build dies with `Could not resolve "@angular/animations/browser"`. Install both explicitly, matching the Angular major.

## 1. Create the Angular app

Derive the project name from the current folder name (lowercase, hyphenated). Set `NG_CLI_ANALYTICS=false`, then:

```
npx -y @angular/cli@22 new <project-name> --directory . --style scss --ssr false --skip-git --defaults
```

Angular 22 uses the **suffix-free naming**: the root component is `src/app/app.ts` exporting class `App` (not `app.component.ts`), the app is zoneless (no `zone.js`), and the test runner is Vitest. Keep that convention for everything you add.

_Done when_ `npm run build` succeeds.

## 2. Add ESLint + Prettier

```
npx ng add angular-eslint --skip-confirmation
npm install -D eslint-config-prettier
```

- In `eslint.config.js`, add `const prettier = require('eslint-config-prettier/flat');` near the other requires, and append `prettier` as the **last** entry of the TypeScript block's `extends` array (so it disables formatting rules that fight Prettier).
- `ng new` already wrote `.prettierrc`; leave it. Copy `<asset>/.prettierignore` to the project root.
- Add these scripts to `package.json` (the `lint` script already exists after `ng add`):

```json
"lint:fix": "ng lint --fix",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

_Done when_ `npm run lint` passes and `npm run format` then `npm run format:check` reports clean.

## 3. Add PrimeNG + demo page

```
npm install primeng@latest @primeng/themes@latest primeicons@latest @angular/cdk@22 @angular/animations@22 --legacy-peer-deps
```

Copy assets into place (overwriting the generated files):

- `<asset>/.npmrc` → project root (if not already copied in step 0 of the lessons)
- `<asset>/app.config.ts` → `src/app/app.config.ts` — wires `providePrimeNG({ theme: { preset: Aura } })` + `provideAnimationsAsync()`
- `<asset>/styles.scss` → `src/styles.scss` — imports `primeicons`
- `<asset>/app.html` → `src/app/app.html` — slim shell: header + `<router-outlet />`
- `<asset>/app.routes.ts` → `src/app/app.routes.ts` — routes `''` to the demo
- `<asset>/demo/{demo.ts,demo.html,demo.scss}` → `src/app/pages/demo/`

Then two in-place edits:

- `src/app/app.spec.ts`: the generated spec asserts the `<h1>` contains `Hello, <name>`; the new `app.html` drops "Hello, ", so change the assertion to just `toContain('<project-name>')`.
- `angular.json`: PrimeNG pushes the bundle past the 500kB default. Raise the production `initial` budget to `"maximumWarning": "1MB"` / `"maximumError": "2MB"`.

_Done when_ `npm run build` is clean (no budget warning) and the `''` route renders the styled PrimeNG card.

## 4. Verify

Run all four gates; every one must be green:

```
npm run build        # no errors, no budget warning
npm run lint
npm test --no-watch  # Vitest, expect the app spec to pass
npm run format:check
```

_Done when_ all four pass. Optionally `npm start` and open http://localhost:4200 — a styled card with a working counter and live greeting confirms PrimeNG (theming + reactivity) is live.

## Git (optional)

This skill produces only the working tree. Committing, branching, and PR creation follow the user's own cadence — do not commit unless asked.
