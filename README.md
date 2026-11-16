# Notes/Task API

A beginner friendly REST API built with Node.js 18+, Express, MongoDB, and Mongoose. It includes database configuration, full CRUD, request validation, centralized error handling, and filtering, sorting, search, and pagination.

## Run locally

1. Install Node.js 18+ and start a local MongoDB server, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your connection string.
3. Run `npm install` and then `npm run dev`.
4. Open `http://localhost:5000/api/health` to confirm the server is running.

The API exits with a clear message if MongoDB cannot be reached or `MONGODB_URI` is missing. Do not commit your `.env` file.

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | List tasks with filters and pagination |
| GET | `/api/tasks/:id` | Get one task |
| PATCH | `/api/tasks/:id` | Update one or more task fields |
| DELETE | `/api/tasks/:id` | Delete a task (returns 204) |

### Task shape

```json
{
  "title": "Read about REST APIs",
  "description": "Review HTTP methods and status codes",
  "completed": false
}
```

`title` is required (1-120 characters). `description` is optional (up to 2,000 characters), and `completed` defaults to `false`.

### List query parameters

- `completed=true|false` filters by completion status.
- `search=keyword` searches task titles and descriptions.
- `sortBy=createdAt|updatedAt|title|completed` selects a supported sort field.
- `order=asc|desc` selects sort direction (default `desc`).
- `page=1` selects a one-based page; `limit=10` sets page size (maximum 100).

Example: `GET /api/tasks?completed=false&sortBy=createdAt&order=desc&page=1&limit=10`

List responses include a `pagination` object with total count, page count, and navigation flags. Successful responses use `{ "success": true, "data": ... }`; validation errors use HTTP 400 and include field-level details. Missing records return 404.

## Example requests

```bash
curl http://localhost:5000/api/tasks

curl -X POST http://localhost:5000/api/tasks \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"Plan the week","description":"List key tasks"}'

curl -X PATCH http://localhost:5000/api/tasks/TASK_ID \\
  -H 'Content-Type: application/json' \\
  -d '{"completed":true}'

curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

## Project structure

```text
src/
  app.js                 Express app and middleware wiring
  server.js              Startup and graceful shutdown
  config/database.js     Mongoose connection
  controllers/           CRUD and list handlers
  middleware/            Validation, async, not-found, and error handlers
  models/Task.js         Mongoose schema and model
  routes/taskRoutes.js   REST route definitions
  validators/            Request validation rules
```

The four project modules are covered in order: server/database setup, CRUD routes, validation/error handling, and query features.
