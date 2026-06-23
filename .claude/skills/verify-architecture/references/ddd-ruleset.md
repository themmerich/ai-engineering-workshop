# DDD ruleset (Steyer Angular-DDD)

The authoritative policy this skill verifies against. The project's actual
`sheriff.config.ts` must encode equivalent rules; deviations are violations.

## Folder layout

```
src/app/
├── domains/
│   ├── <domain>/                # one bounded context, e.g. booking, checkin
│   │   ├── feature-<name>/      # smart components, routed; orchestrates a use case
│   │   ├── ui/                  # dumb/presentational components, reusable within the domain
│   │   ├── domain/              # domain model, entities, business logic, state
│   │   ├── data/                # data access (HTTP, infrastructure), maps to domain
│   │   └── util/                # pure helpers, no domain knowledge
│   └── shared/                  # cross-domain reusable libs (ui/util/data/domain)
```

Each leaf module folder (`feature-*`, `ui`, `domain`, `data`, `util`) is an
**encapsulated module**: it exposes a public API through a barrel `index.ts`,
and everything else is private (no deep imports past the barrel).

## Tags

Every module carries two tags, assigned by `tagging` in `sheriff.config.ts`:

- `domain:<name>` — the bounded context (`domain:shared` for the shared area)
- `type:<layer>` — one of `feature`, `ui`, `domain`, `data`, `util`

## Dependency rules (deny-by-default)

Anything not explicitly allowed is forbidden. Two independent axes both apply:

**Across domains** — a domain may depend only on itself and on `shared`:

| from        | may import        |
| ----------- | ----------------- |
| `domain:X`  | `domain:X`, `domain:shared` |

**Across layers** — strictly downward:

| from (`type:`) | may import (`type:`)            |
| -------------- | ------------------------------- |
| `feature`      | `ui`, `domain`, `data`, `util`  |
| `ui`           | `domain`, `util`                |
| `data`         | `domain`, `util`                |
| `domain`       | `util`                          |
| `util`         | `util`                          |

Consequences to check for: `domain`/`util` must not import `feature`/`ui`/`data`;
no module of `domain:A` may import from `domain:B`; only `feature-*` is routed.

## Representative `sheriff.config.ts`

```ts
import { SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  version: 1,
  tagging: {
    'src/app/domains/<domain>': {
      'feature-*': ['domain:<domain>', 'type:feature'],
      ui: ['domain:<domain>', 'type:ui'],
      domain: ['domain:<domain>', 'type:domain'],
      data: ['domain:<domain>', 'type:data'],
      util: ['domain:<domain>', 'type:util'],
    },
  },
  depRules: {
    root: ['domain:*'],
    'domain:*': [sameTag, 'domain:shared'],
    'type:feature': ['type:ui', 'type:domain', 'type:data', 'type:util'],
    'type:ui': ['type:domain', 'type:util'],
    'type:data': ['type:domain', 'type:util'],
    'type:domain': ['type:util'],
    'type:util': ['type:util'],
  },
};
```
