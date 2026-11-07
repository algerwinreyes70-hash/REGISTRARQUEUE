# API Documentation
Base URL: `http://localhost:5000/api`. Protected routes require `Authorization: Bearer <JWT>`.

| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register student |
| POST | `/auth/login` | Public | Login |
| GET | `/auth/me` | Authenticated | Current user |
| GET | `/services` | Public | List active services |
| GET | `/announcements` | Public | Active announcements |
| GET | `/queue/display` | Public | Public monitor data |
| GET | `/queue/mine` | Student | Ticket history |
| POST | `/queue` | Student | Generate ticket (`service_id`) |
| PATCH | `/queue/:id/cancel` | Student | Cancel waiting ticket |
| GET | `/staff/queue` | Staff/Admin | Assigned active queue |
| POST | `/staff/queue/:id/call` | Staff/Admin | Call a waiting ticket |
| POST | `/staff/queue/:id/recall` | Staff/Admin | Recall called ticket |
| POST | `/staff/queue/:id/process` | Staff/Admin | Start processing |
| POST | `/staff/queue/:id/complete` | Staff/Admin | Complete ticket |
| POST | `/staff/queue/:id/skip` | Staff/Admin | Skip waiting ticket |
| POST | `/staff/queue/:id/absent` | Staff/Admin | Mark called ticket absent |
| GET | `/admin/summary` | Admin | Dashboard information |
| POST | `/admin/users` | Admin | Create user |
| PATCH | `/admin/users/:id/status` | Admin | Enable/disable user |
| POST | `/admin/services` | Admin | Create service |
| POST | `/admin/counters` | Admin | Create counter |
| POST | `/admin/assignments` | Admin | Assign staff/counter/service |
| POST | `/admin/announcements` | Admin | Publish announcement |
| GET | `/admin/reports` | Admin | Daily aggregates |
| GET | `/health` | Public | API/database health |
