# Project specific conventions

## Project

Project intent, architecture and tech stack described in README.md

## Development Guidelines

### Workflow (important)

1. Always load git-worktree skill when a new task is received to decide how to work (branch, worktree)
2. Create a short implementation plan before coding
3. Implement following project conventions and best practices
4. Commit the changes following conventional commits


### Angular

Always use Angular CLI generators when a new component needs to be created.

Examples:

- ng g c
- ng g s
- ng g d
- ng g p

Do not manually create Angular component unless explicitly requested.

Prefer standalone components.

---

### Styling

When useful, colors should be injected as variables instead of rgb or hex code.

This approach should especially be respected when a color has a semantic purpose (for example a main action button) or is a styling choice meant to be reused in other components.

---

### Code Design

* Only write comments when the purpose can be hard to understand from reading the code.
* This portfolio project is meant to be a customizable template for anyone to reuse easily with their own data. Respect this philosophy while introducing new features. Global data is stored in src/app/info and injected into components with injection tokens.
* Take care of accessibility and responsiveness while designing UI.
* Reuse code patterns (global styles, components, data from src/app/info) before introducing new ones.

## Relevant Skills

Use these skills when appropriate:

- git-worktree
- impeccable
- apple-design — Apple-inspired UI polish and fluid motion (styling)
- design-taste-frontend — heavy skill, only load when doing visual/UX design work
- high-end-visual-design — animation and motion design