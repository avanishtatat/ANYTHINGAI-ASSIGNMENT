# ANYTHINGAI Assignment - Backend

Scalable REST API with JWT authentication, role-based access control, and task CRUD.

## Project Context

This backend is the primary focus of the assignment and is designed with modular folders (`controllers`, `routes`, `middleware`, `utils`, `models`) so new modules can be added without changing core architecture.

## Assignment Coverage

- User registration and login APIs
- Password hashing with bcrypt
- JWT-based authentication
- Role-based and permission-based access control (admin vs user behavior)
- CRUD APIs for tasks
- API versioning (`/api/v1/...`)
- Input validation and structured error responses
- API documentation with Swagger (`swagger-jsdoc` + `swagger-ui-express`)
- MongoDB schema design with Mongoose models

## Architecture Overview

1. Client calls versioned API route (`/api/v1/...`).
2. Route forwards request to controller.
3. Protected routes pass through JWT middleware (`protect`).
4. Controllers validate request inputs via utility validators.
5. RBAC permission check happens via `hasPermission(userId, PERMISSION_NAME)`.
6. Mongoose models handle persistence.
7. Uniform JSON success/error responses are returned.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- swagger-jsdoc
- swagger-ui-express

## Project Structure

```text
backend/
	app.js
	config/
		db.js
		swagger.js
	controllers/
	middleware/
	models/
	routes/
	script/
		seed.js
	utils/
```

## API Base URL

```text
http://localhost:3000/api/v1
```

## Main Endpoints

- `POST /auth/register` - register user
- `POST /auth/login` - login user
- `GET /auth/getUser` - get authenticated user profile, role, permissions
- `GET /roles` - list roles
- `GET /tasks` - list tasks (permission protected)
- `GET /tasks/:id` - get task by id
- `POST /tasks` - create task
- `PUT /tasks/:id` - update task
- `DELETE /tasks/:id` - delete task

## Request and Permission Behavior

- Authenticated identity is extracted from `Authorization: Bearer <token>`.
- Role is stored via `UserRole` mapping, and permissions via `RolePermission` mapping.
- Task controller operations are guarded by permission constants:
  - `VIEW_TASK`
  - `CREATE_TASK`
  - `UPDATE_TASK`
  - `DELETE_TASK`
- Unauthorized access returns `401` (auth failure) or `403` (permission denied).

## Role and Permission Model

Seed script creates:

- Roles: `admin`, `user`
- Permissions: `CREATE_TASK`, `UPDATE_TASK`, `VIEW_TASK`, `DELETE_TASK`

Permission assignment:

- `admin`: all task permissions
- `user`: `VIEW_TASK` only

## Database Models

- `User` - user profile and hashed password
- `Role` - role catalog (`admin`, `user`)
- `Permission` - operation catalog (`*_TASK`)
- `UserRole` - user-to-role mapping
- `RolePermission` - role-to-permission mapping
- `Task` - secondary entity for CRUD operations

## API Documentation (Swagger)

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Route-level Swagger comments are added under `routes/*.js` and compiled via `config/swagger.js`.

Docs endpoint:

```text
GET /api-docs
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/anythingai
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## Setup and Run

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

Seed roles and permissions:

```bash
npm run seed:db
```

Recommended local startup order:

1. Start MongoDB (local or Atlas)
2. Configure `.env`
3. Run `npm install`
4. Run `npm run seed:db`
5. Run `npm run dev`
6. Verify `http://localhost:8000/api-docs` (if `PORT=8000`)

## Security Practices Implemented

- Password hashing using bcrypt
- JWT verification middleware for protected routes
- Permission check middleware helper (`hasPermission`) for CRUD authorization
- Validation for auth payloads, task payloads, and task id params
- Controlled update fields for task update endpoint

Additional practical security notes:

- Keep `.env` out of version control.
- Rotate secrets immediately if exposed.
- Use strong, random JWT secret values per environment.

## Short Scalability Note

This backend can be scaled incrementally as traffic grows:

- Microservices: split auth, role/permission, and task modules into independent services behind an API gateway.
- Caching: add Redis for frequently read authorization/permission lookups and hot task queries to reduce DB load.
- Load balancing: run multiple stateless API instances behind NGINX or cloud load balancers with health checks and autoscaling.

## Optional Next Improvements

- Add Redis caching for permission checks and task list reads.
- Add centralized logging and request tracing.
- Add Docker compose for one-command local setup.
- Add automated API tests (integration + auth/permission cases).

## Evaluation Criteria Mapping

- API design: versioned REST routes, proper status codes, modular controller/route structure
- Database schema: normalized role/permission models with mapping tables
- Security: JWT auth, hashed passwords, input validation, permission checks
- Frontend integration: backend consumed by React app for auth and task CRUD
- Scalability readiness: modular design plus clear microservices/caching/load balancing path
