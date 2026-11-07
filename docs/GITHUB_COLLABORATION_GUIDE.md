# GitHub Collaboration Guide — Seven Members

## Suggested module ownership
1. Project lead/integration — shared layout, routes, pull-request review and testing.
2. Authentication — login, registration, JWT and role authorization.
3. Administrator — user, service, counter and announcement features.
4. Student — service selection, queue ticket, history and profile.
5. Staff — queue calling and transaction processing.
6. Backend/database — schema, connection, queue sequencing and common API contracts.
7. Public display/reports — monitor, Socket.IO and CSV exports.

## Project lead setup
```bash
git init
git add .
git commit -m "Initial REGISQUEUE project"
git branch -M main
git remote add origin https://github.com/USERNAME/REGISQUEUE.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```
Invite the other six members in GitHub repository Settings → Collaborators.

## Each collaborator
```bash
git clone https://github.com/USERNAME/REGISQUEUE.git
cd REGISQUEUE
git checkout develop
git pull origin develop
git checkout -b feature/your-module
# make your assigned changes
git add .
git commit -m "Implement assigned module"
git push -u origin feature/your-module
```
Create a pull request into `develop`. Review and test before merging. Merge tested `develop` into `main` for stable releases. Suggested branches: `feature/system-layout`, `feature/authentication`, `feature/admin`, `feature/student`, `feature/staff-queue`, `feature/backend-database`, `feature/display-reports`.

Never commit `.env`, passwords, `node_modules`, or real student data. GitHub stores source and SQL scripts, not live database files.
