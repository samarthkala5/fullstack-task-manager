# Fullstack Backend Assignment

## Project Overview

This repository contains the backend for a fullstack assignment built with Node.js, Express, and TypeScript. It is designed as a secure task management API that supports user authentication, authorization, and data validation while exposing Swagger API documentation for easy testing.

The backend works alongside a React + Vite + Axios frontend to provide user registration/login, task creation, and task management experiences.

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Authorization:** Role-Based Access Control (RBAC)
- **Validation:** Zod
- **API Docs:** Swagger
- **Frontend:** React, Vite, Axios
- **Security:** bcryptjs for password hashing, helmet, CORS

---

## Key Features

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- RBAC with admin-only routes
- Protected CRUD APIs for tasks
- Ownership protection for task operations
- Swagger-powered API documentation
- Frontend integration for login and task creation

---

## Folder Structure

```text
back/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── prisma.ts
│   │   └── swagger.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   ├── modules/
│   │   ├── admin/
│   │   │   └── admin.routes.ts
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.routes.ts
│   │   ├── task/
│   │   │   ├── task.controller.ts
│   │   │   └── task.routes.ts
│   │   └── user/
│   │       └── user.routes.ts
│   ├── types/
│   │   └── express.d.ts
│   └── utils/
│       └── validators.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database available
- npm installed

### Installation

```bash
cd back
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Database Setup

Use Prisma to generate and migrate the database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run the Server

```bash
npm run dev
```

The API will start on the configured `PORT` and expose Swagger documentation at `/api-docs`.

---

## API Routes

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### User

- `GET /api/users` — Get users (protected / admin if implemented)

### Tasks

- `GET /api/tasks` — Get all tasks for authenticated user
- `GET /api/tasks/:id` — Get a single task by ID
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update an existing task
- `DELETE /api/tasks/:id` — Delete a task

### Admin

- `GET /api/admin/...` — Admin-only route(s)

> Note: Protected routes require a valid JWT in the `Authorization` header as `Bearer <token>`.

---

## Scalability Notes

- The current architecture separates concerns across controllers, routes, middleware, and utilities.
- Prisma ORM enables safe schema evolution and makes database migrations repeatable.
- JWT authentication is stateless and scales across multiple backend instances.
- Validation with Zod ensures request payloads are type-safe and predictable.
- Swagger docs provide a maintainable contract for frontend and API consumers.

---

## Future Improvements

- Add refresh token support for longer-lived sessions
- Implement pagination and filtering for task lists
- Add soft deletes and activity logging
- Improve error handling with centralized error middleware
- Add role management and dynamic permissions
- Add tests for API routes, middleware, and validation

---

## Author

- **Author:** Samarth Kala
- **Email:** saamrthkala5@gmai.com

---

## Notes

This backend project is built to support a React + Vite + Axios frontend and provides a secure, role-aware foundation for a task management application.
