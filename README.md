# ANYTHINGAI Assignment

Full-stack Task Management application built for interview evaluation, featuring authentication, role-based authorization, and task CRUD operations.

## Recruiter-Focused Overview

### What this project demonstrates
- End-to-end product delivery across frontend and backend.
- Secure user authentication with JWT.
- Role-based access control for feature visibility and API authorization.
- Clean modular architecture suitable for extension.

### Core user journey
1. User signs up and selects a role.
2. User logs in and receives a JWT token.
3. Authenticated user accesses the protected dashboard.
4. Tasks are listed based on view permission.
5. Actions like create, edit, and delete are enabled only when permissions allow.

### Business value in simple terms
- Prevents unauthorized operations through layered security.
- Supports multiple user types with controlled capabilities.
- Provides clear API documentation for faster onboarding and collaboration.

## Technical Evaluator-Focused Overview

### Tech stack
- Frontend: React, Vite, React Router, Axios, Tailwind CSS, React Hot Toast
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- API Docs: swagger-jsdoc, swagger-ui-express

### Monorepo structure
- frontend: User interface and client-side route protection
- backend: REST API, JWT middleware, RBAC logic, data models

Detailed module docs:
- Backend details: backend/README.md
- Frontend details: frontend/README.md

### Authentication and authorization model
- Authentication:
  - JWT issued at login
  - Token sent as Authorization Bearer token on protected API calls
- Authorization:
  - Role assigned via UserRole mapping
  - Permissions assigned via RolePermission mapping
  - Both frontend and backend enforce permission checks

### Seeded roles and permissions
- Roles:
  - admin
  - user
- Permissions:
  - CREATE_TASK
  - VIEW_TASK
  - UPDATE_TASK
  - DELETE_TASK
- Mapping:
  - admin has all task permissions
  - user has VIEW_TASK only

### API surface summary
Base path: /api/v1

- Auth:
  - POST /auth/register
  - POST /auth/login
  - GET /auth/getUser
- Roles:
  - GET /roles
- Tasks:
  - GET /tasks
  - GET /tasks/:id
  - POST /tasks
  - PUT /tasks/:id
  - DELETE /tasks/:id

Swagger UI:
- /api-docs

### Security and validation highlights
- Password hashing with bcrypt.
- JWT verification middleware on protected routes.
- Permission verification before task operations.
- Input validation for auth payloads, task payloads, and route params.
- Safe update strategy for allowed task fields.

### Local setup
1. Install dependencies
- In backend: npm install
- In frontend: npm install

2. Create environment files
- backend/.env
  - PORT=3000
  - MONGO_URL=mongodb://127.0.0.1:27017/anythingai
  - JWT_SECRET_KEY=your_jwt_secret
  - JWT_EXPIRES_IN=1d
- frontend/.env
  - VITE_BACKEND_BASE_URL=http://localhost:3000

3. Seed role and permission data
- In backend: npm run seed:db

4. Run services
- Backend: npm run dev
- Frontend: npm run dev

### Suggested evaluation flow
1. Register one admin and one user account.
2. Login as admin and verify create, edit, delete are available and functional.
3. Login as user and verify only view access is available.
4. Validate API docs and endpoint behavior via Swagger.

## Notes
- This root README is a project entry point.
- Use backend/README.md and frontend/README.md for module-level details and commands.
