# REGISQUEUE — Registrar Queueing Management System

Full-stack academic project using React + Vite, Express, MySQL (XAMPP), JWT and Socket.IO.

## Requirements
- Node.js 20 or later
- XAMPP with MySQL
- phpMyAdmin

## Install and run on Windows
1. Start **MySQL** in XAMPP.
2. Open `http://localhost/phpmyadmin` and import `database/schema.sql`, then `database/seed.sql`.
3. Open a terminal in `backend` and run:
   ```bat
   copy .env.example .env
   npm install
   ```
4. Edit `backend/.env`. Set a long random `JWT_SECRET`; confirm the MySQL settings. For a default XAMPP install, DB user is `root`, password is blank.
5. Create the first administrator and start the API:
   ```bat
   npm run create-admin
   npm run dev
   ```
   Default credentials: `admin@regisqueue.local` / `Admin@12345` unless changed in `.env`. Change this password after first login.
6. In a second terminal, open `frontend` and run:
   ```bat
   copy .env.example .env
   npm install
   npm run dev
   ```
7. Open `http://localhost:5173`.

## Main workflows
- Students register using the public registration page, sign in, select a service, generate a ticket and review/cancel waiting tickets.
- Admin creates staff/student/admin accounts, services and counters, and assigns staff to a counter/service.
- Staff sign in to call, recall, start, complete, skip or mark tickets absent, subject to the assigned service.
- Public monitor is available at `/display` and refreshes queue data through Socket.IO events.
- Admin reports page exports daily aggregates as CSV.

## Project structure
- `frontend/` — React/Vite user interface
- `backend/` — Express API, authentication, queue logic and Socket.IO
- `database/` — schema and seed SQL
- `docs/` — setup, API, database and GitHub collaboration guides

## Notes
This is a functional academic starter implementation, not a production-certified registrar deployment. Before real use, add institutional privacy controls, HTTPS, password reset, robust rate limiting, backups, detailed audit review, monitoring, and security testing. Do not commit `.env`, real student data, or database credentials to GitHub. MySQL must remain private; browsers communicate only with Express.
