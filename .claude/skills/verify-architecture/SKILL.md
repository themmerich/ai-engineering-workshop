---
name: verify-architecture
description: Verify the DDD architecture and Sheriff module boundaries of this Angular project — folder layout, encapsulation (barrels), tags, and deny-by-default dependency rules. Use when checking architecture compliance, reviewing a change for boundary violations, or when the user mentions DDD, Sheriff, or module boundaries.
---

# Verify Architecture

Check that the codebase obeys the **Steyer Angular-DDD** layout and that **Sheriff** enforces its module boundaries. This skill **only verifies** — it never edits config or moves files. The full policy is in [`references/ddd-ruleset.md`](references/ddd-ruleset.md); read it before judging structure.

`<skill>` below means `.claude/skills/verify-architecture/`. Run commands from the project root.

## 1. Confirm Sheriff is set up

This is a precondition, not something to fix here. Verify all three:

- `@softarc/sheriff-core` is in `package.json` dependencies.
- `sheriff.config.ts` exists at the project root.
- The ESLint flat config (`eslint.config.js`) wires in `@softarc/eslint-plugin-sheriff`.

_Done when_ all three are present. If any is missing, **stop** and report exactly which — tell the user Sheriff must be set up first; do not attempt to install or configure it.

## 2. Run Sheriff's verifier

Sheriff is the authority on dependency and encapsulation rules — run it, don't reason the graph by hand:

```
npx sheriff verify src/main.ts
```

Capture every reported violation. Sheriff flags two kinds: **dependency-rule** breaches (a forbidden cross-tag import) and **encapsulation** breaches (a deep import that bypasses a module's `index.ts` barrel).

_Done when_ the command has run and its exit status plus every violation line is captured.

## 3. Run the boundary lint

Because Sheriff is wired into ESLint here, the lint pass enforces the same boundaries per-file:

```
npm run lint
```

_Done when_ lint has run and every `@softarc/sheriff` finding is captured (separate them from unrelated lint findings).

## 4. Check structure and config against the policy

Run the deterministic layout scan:

```
node <skill>scripts/check-structure.mjs
```

It reports any module missing a barrel `index.ts` or any folder that isn't a known layer (`feature-*`, `ui`, `domain`, `data`, `util`). Then read `sheriff.config.ts` and confirm its `tagging` and `depRules` match the policy matrix in [`references/ddd-ruleset.md`](references/ddd-ruleset.md): both `domain:*` (own domain + `shared` only) and `type:*` (strictly downward) axes, **deny-by-default**.

_Done when_ the scan has run and **every** domain and module is accounted for — each tagged on both axes, each `depRule` matched against the policy, with any deviation listed. A vague "looks fine" is not done.

## 5. Report the verdict

Emit a single verdict with an exhaustive violation list:

- **PASS** only if all three gates are clean: `sheriff verify` exited 0, no `@softarc/sheriff` lint findings, and structure + config match the policy.
- Otherwise **FAIL**, listing every violation grouped by kind (dependency rule / encapsulation / structure / config drift), each with its file path and the specific rule it breaks.

Report "no violations" only when all three gates passed — never infer a pass from a partial check.
