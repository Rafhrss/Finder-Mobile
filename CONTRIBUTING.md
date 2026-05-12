# Contributing to Finder Mobile

Thank you for your interest in contributing to Finder Mobile! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Get Started](#how-to-get-started)
- [Creating Issues](#creating-issues)
- [Taking/Assigning Issues](#takingassigning-issues)
- [Making Commits](#making-commits)
- [Creating Pull Requests](#creating-pull-requests)
- [Development Workflow](#development-workflow)

## Code of Conduct

By participating in this project, you agree to be respectful and constructive in all interactions.

## How to Get Started

### Prerequisites
- Node.js LTS (latest LTS version recommended)
- npm
- Expo Go (for device testing) or Android Studio / Xcode (for emulator)

### Setup Local Development

1. **Fork the repository** (if you're not a direct collaborator)
   ```bash
   git clone https://github.com/YOUR_USERNAME/Finder-Mobile.git
   cd Finder-Mobile
   ```

2. **Add upstream remote** (to keep your fork in sync)
   ```bash
   git remote add upstream https://github.com/Rafhrss/Finder-Mobile.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the application**
   ```bash
   npx expo start
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

## Creating Issues

### Issue Title Format
Use the following format for consistency:
```
[FU-XX] <Brief Description>
```

**Examples:**
- ✅ `[FU-16] Improve MainBottomNavigation: Add page labels to icons`
- ✅ `[FU-17] Documentation: Create GitHub Issues Guidelines`
- ❌ `Improve MainBottomNavigation`
- ❌ `Navigation improvements`

**Notes:**
- `FU` stands for "Feature Update" (adjust prefix if needed)
- Use sequential numbering (FU-1, FU-2, FU-3, etc.)
- Keep descriptions concise but descriptive

### Issue Body Structure

Use the following sections in issue descriptions:

1. **Description** - What is this issue about?
2. **Requirements** - What needs to be done? (use subsections if complex)
3. **Acceptance Criteria** - How to verify it's complete? (use checkboxes)
4. **Files to Modify** - Which files need changes? (if applicable)
5. **Related Issues** - Link to related issues/PRs if applicable

### Labels

When creating issues, use appropriate labels:
- **enhancement**: New features or improvements
- **bug**: Bug fixes
- **develop**: New feature development
- **frontend**: Frontend-related changes
- **backend**: Backend-related changes
- **refactor**: Code refactoring
- **documentation**: Documentation updates
- **question**: Questions or clarifications needed

### Issue Template Example

```markdown
## Description
Brief description of what this issue is about.

## Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Files to Modify
- `src/path/to/file.tsx`
- `src/path/to/another/file.tsx`

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Related
Issue #XX, Issue #YY
```

## Taking/Assigning Issues

### How to Assign an Issue to Yourself

1. **Find an issue** you want to work on
2. **Leave a comment** on the issue: "I'll take this" or "Let me work on this"
3. **Wait for confirmation** from maintainers (or they may auto-assign)
4. **Create a branch** with the issue number (see [Branch Naming](#branch-naming))

### Guidelines

- **One person per issue**: Don't work on an issue someone else is already assigned to
- **Ask for clarification**: If an issue is unclear, ask in the comments
- **Communicate delays**: If you get stuck, update the issue with your progress
- **Respect issue assignments**: Always check if someone is already working on it

## Making Commits

### Commit Message Format

Use the conventional commit format:
```
type(scope): message
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Test-related changes
- **chore**: Build process, dependencies, tooling

### Scope

The scope should specify which part of the codebase is affected:
- `home`: Home screen
- `navbar`: Navigation bar
- `report`: Report-related features
- `search`: Search functionality
- `auth`: Authentication
- `api`: API integration
- etc.

### Message

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep it concise but descriptive

### Examples

```bash
# Good commit messages
git commit -m "feat(home): add initial home screen layout"
git commit -m "fix(navbar): correct active tab highlight"
git commit -m "docs(readme): add contribution and setup guide"
git commit -m "refactor(api): simplify error handling"
git commit -m "perf(search): optimize list rendering"

# Bad commit messages
git commit -m "Fixed navbar"
git commit -m "Changes"
git commit -m "Update files"
```



## Creating Pull Requests

### Branch Naming

Use the following format for branch names:
```
FU-xx
```

**Examples:**
```
FU-12
FU-16
FU-17
```

This makes it easy to track issues and maintain organization.

### Before You Open a PR

- [ ] Application runs locally without errors
- [ ] Linting passes: `npm run lint`
- [ ] Changes are related to a single issue
- [ ] Branch is up-to-date with `main`
- [ ] Commits follow the [commit message format](#making-commits)

### Step-by-Step PR Creation

1. **Sync with main branch**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a work branch**
   ```bash
   git checkout -b FU-xx
   ```

3. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "type(scope): description"
   ```

4. **Push to your fork**
   ```bash
   git push -u origin FU-xx
   ```

5. **Create a Pull Request** on GitHub with:
   - **Title**: Use the same format as issues: `[FU-xx] Brief description`
   - **Description**: Include:
     - Summary of changes
     - Related issue reference (e.g., `Closes #16`)
     - Screenshots/videos for UI changes
     - Testing notes
     - Any breaking changes or important notes

### PR Template Example

```markdown
## Description
Brief summary of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Enhancement
- [ ] Documentation
- [ ] Refactoring

## Related Issue
Closes #FU-16

## How Has This Been Tested?
- [ ] Tested on Android emulator
- [ ] Tested on iOS simulator
- [ ] Tested on physical device

## Screenshots (if UI changes)
<!-- Add screenshots or videos here -->

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex areas of code
- [ ] Linting passes (`npm run lint`)
- [ ] Application runs without errors
```

### PR Review Process

1. **Author submits PR** with all required information
2. **Maintainers review** the code
3. **Address feedback** if changes are requested
4. **Maintainers merge** when approved

## Development Workflow

### Complete Workflow Example

```bash
# 1. Sync your local main with upstream
git checkout main
git pull upstream main

# 2. Create a new branch for the issue
git checkout -b FU-16

# 3. Make your changes
# ... edit files ...

# 4. Verify everything works
npm install  # if dependencies changed
npm run lint
npx expo start

# 5. Stage and commit changes
git add .
git commit -m "feat(navigation): add page labels to bottom navigation icons"

# 6. Push to your fork
git push -u origin FU-16

# 7. Open a PR on GitHub
# Go to https://github.com/Rafhrss/Finder-Mobile and click "New Pull Request"
```

### Keeping Your Fork Updated

```bash
# Fetch updates from upstream
git fetch upstream

# Rebase your branch on top of upstream/main
git rebase upstream/main

# Push the updated branch
git push -f origin your-branch-name
```

## Troubleshooting

### Issue: "Branch is behind main"
```bash
git fetch upstream
git rebase upstream/main
git push -f origin your-branch-name
```

### Issue: "Merge conflicts"
1. Update your branch: `git fetch upstream && git rebase upstream/main`
2. Resolve conflicts in your editor
3. Stage resolved files: `git add .`
4. Continue rebase: `git rebase --continue`
5. Push: `git push -f origin your-branch-name`

### Issue: "Lint errors"
```bash
npm run lint
# Fix errors manually or let the linter auto-fix
npm run lint -- --fix
```

## Questions?

If you have questions or need clarification:
- Check existing issues and PRs
- Leave a comment on the issue
- Ask maintainers for help

## Thank You!

Thank you for contributing to Finder Mobile! Your efforts help make this project better for everyone.
