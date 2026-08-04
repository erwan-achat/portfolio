---
name: git-worktree
description: Use when implementing a feature, fixing a bug, starting a coding task, or when isolated parallel work across multiple branches and worktrees is required.
---

# Git Worktree

**Isolated** workspaces ensure parallel execution without contaminating the main branch or locking the repository.

## 1. Scope & Triviality Assessment

Determine if the task warrants a dedicated worktree or a direct change.
- **Skip worktree**: Trivial modifications with low conflict risk (e.g., updating `README.md`, fixing typos, tiny config adjustments). Work directly on the current branch or existing working copy.
- **Require worktree**: Substantial features, bug fixes, or refactoring where parallel agents or humans might work concurrently.

**Completion criterion**: Task classification (trivial vs. substantial) is explicitly decided.

## 2. Discovery & Provisioning

Never work on the `main` branch or modify the main repository working directory for features/fixes.

1. **Inspect existing worktrees**:
   ```bash
   git worktree list
   ```
2. **Check for existing match**: If a dedicated branch and worktree already exist for this task, navigate to it and use it.
3. **Provision new worktree**: If none exists, create a predictable branch and worktree:
   - Naming convention: `feat/<name>`, `fix/<name>`, `refactor/<name>` (e.g., `feat/homepage_animation`).
   - One branch = one worktree.
   - Run:
     ```bash
     git worktree add -b feat/<name> ../<repo-name>-<name> main
     ```
     *(Adjust path and base branch as appropriate, ensuring the worktree is created alongside or outside the main repo folder to avoid nesting issues).*

**Completion criterion**: `git worktree list` confirms the dedicated worktree is active and checked out to the correct feature/fix branch, with `main` untouched.

## 3. Execution

Perform all implementation, testing, and verification steps entirely within the isolated worktree directory.

**Completion criterion**: All code changes, tests, and verifications pass successfully within the worktree.

## 4. Merge & Cleanup

Once the feature or bug fix is successfully completed and merged into `main`:
1. Switch back or ensure branch is merged.
2. Delete the worktree:
   ```bash
   git worktree remove ../<repo-name>-<name> --force
   ```
3. Delete the local branch:
   ```bash
   git branch -d feat/<name>
   ```

**Completion criterion**: Feature is merged into `main`, and both the worktree and branch are completely deleted.
