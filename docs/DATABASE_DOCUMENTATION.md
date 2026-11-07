# Database Documentation
Import `database/schema.sql`, then `database/seed.sql` in phpMyAdmin.

- `users`: account identity, password hash, role and status.
- `student_profiles`: student number, course and year level.
- `services`: registrar services and queue code.
- `service_counters`: physical counters.
- `counter_assignments`: staff/counter/service mapping.
- `daily_queue_sequences`: per-service, per-day sequence counter.
- `queues`: ticket state and timestamps.
- `queue_logs`: status transition history.
- `notifications`: user notification storage.
- `announcements`: public registrar announcements.
- `operating_hours`: weekly schedule.
- `holidays`: office closure dates.
- `system_settings`: key/value configuration.
- `audit_logs`: administrative activity records.

Ticket generation uses an InnoDB transaction and row lock (`SELECT ... FOR UPDATE`) with a unique key on service/date/sequence to avoid duplicate queue numbers under concurrent requests. Daily sequences roll over by date while historical tickets remain.
