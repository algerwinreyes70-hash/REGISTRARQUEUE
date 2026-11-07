# Windows Installation Guide
1. Install Node.js LTS and XAMPP.
2. Start MySQL from XAMPP Control Panel.
3. Visit `http://localhost/phpmyadmin`; import `database/schema.sql` and then `database/seed.sql`.
4. In `backend`, copy `.env.example` to `.env`, set `JWT_SECRET` and database credentials.
5. Run `npm install`, `npm run create-admin`, and `npm run dev` in `backend`.
6. In `frontend`, copy `.env.example` to `.env`, run `npm install`, then `npm run dev`.
7. Open `http://localhost:5173`.

Troubleshooting: `ECONNREFUSED` usually means MySQL is stopped or the port is wrong. `Unknown database` means the schema was not imported. CORS errors mean `CLIENT_URL` and the Vite URL do not match. Keep `.env` private.
