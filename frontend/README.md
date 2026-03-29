# ANYTHINGAI Assignment - Frontend

Basic React UI to test and demonstrate backend APIs for authentication, authorization, and task CRUD.

## Project Context

This frontend is intentionally simple and API-focused. It is built to validate backend behavior (auth, RBAC, CRUD, and error handling) through a clean UI workflow.

## Assignment Coverage

- Register and login pages connected to backend auth APIs
- Protected dashboard route (JWT required)
- Task CRUD actions from UI (create, read, update, delete)
- Role/permission-aware UI actions (buttons shown based on permissions)
- Success and error feedback using toast messages

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS v4
- React Hot Toast

## Frontend Features

- User registration with role selection
- User login with JWT token persistence in localStorage
- Private route protection for dashboard
- Task cards with create/edit modal
- Task deletion from dashboard
- Loading and error states for task fetching

## End-to-End User Flow

1. User registers from `/signup` and selects a role.
2. User logs in from `/login` and receives JWT.
3. JWT is stored in `localStorage` and used on protected requests.
4. Dashboard (`/`) fetches authenticated user profile and permissions.
5. Task actions are rendered conditionally based on user permissions.
6. Create/Edit/Delete actions call API and refresh list via `refetch`.

## Prerequisites

- Node.js 18+
- npm
- Backend API running (default assumed at `http://localhost:8000`)

## Environment Variables

Create `.env` in `frontend/`:

```env
VITE_BACKEND_BASE_URL=http://localhost:8000
```

If not set, the app uses `http://localhost:8000` by default.

## Setup and Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint source code:

```bash
npm run lint
```

## Routes

- `/signup` - register user
- `/login` - login user
- `/` - protected dashboard with task operations

## Permission-Aware UI

- Create button visible only when user has `CREATE_TASK`
- Edit button visible only when user has `UPDATE_TASK`
- Delete button visible only when user has `DELETE_TASK`

Permission checks are handled in utility helpers and consumed in dashboard rendering logic.

## Project Structure

```text
src/
  api/           # API modules for auth/role/task
  components/    # Reusable UI + route guards + modal
  context/       # User context and provider
  customHooks/   # Data fetch and auth hooks
  pages/         # Login, Signup, Home
  utils/         # constants, permission checks, helper functions
```

## API Integration Summary

- `authApi.js`: register, login, fetch authenticated user
- `roleApi.js`: fetch role list for signup dropdown
- `taskApi.js`: task CRUD operations
- `useFetch` hook: loading/error/data states + `refetch` support

## Integration Notes

- JWT token is stored in `localStorage` with key `token`.
- Protected API calls send `Authorization: Bearer <token>`.
- After task create/update/delete, dashboard data is refetched so UI stays in sync.

## Evaluator Quick Check

1. Register one `admin` and one `user` account.
2. Login as `admin` and verify create/edit/delete are visible and functional.
3. Login as `user` and verify only read access is available in dashboard.
4. Confirm toast messages on success and on API errors.

## Deliverables Checklist Reference

- Backend project with setup docs: covered in backend README
- Working auth + CRUD APIs: integrated
- Basic frontend UI connected to APIs: completed
- API documentation: Swagger available from backend
- Scalability note: documented in backend README
