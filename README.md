# Blog CMS Monorepo

A full-stack blog CMS built as a monorepo with a public client, an admin dashboard, and a production-ready backend API.

## Features

- JWT-based authentication for admin access
- Public blog client with published posts only
- Admin dashboard for post management
- Create, edit, publish/unpublish, and delete posts
- Draft vs published workflow
- Comments system (no user login required)
- Comment moderation (admin can delete comments)
- Protected admin routes
- Minimal black UI theme with yellow accents

## Tech Stack

### Frontend

- React
- Vite
- React Router

### Backend

- Node.js
- Express
- Prisma ORM
- JWT authentication

### Database

- PostgreSQL (Neon)

## Project Structure

```text
blog/
├─ README.md
└─ blog-monorepo/
	├─ backend/
	│  ├─ prisma/
	│  └─ src/
	└─ frontend/
		├─ admin/
		│  └─ src/
		└─ client/
			└─ src/
```

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/stevenstank/blog.git
cd blog/blog-monorepo
```

### 2. Install Dependencies

```bash
cd backend && npm install
cd ../frontend/admin && npm install
cd ../client && npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside `blog-monorepo/backend` and add the required backend variables.

Create a `.env` file inside each frontend app (`blog-monorepo/frontend/admin` and `blog-monorepo/frontend/client`) for frontend API configuration.

### 4. Run Backend

```bash
cd backend
npm run dev
```

### 5. Run Frontend Apps

Admin:

```bash
cd frontend/admin
npm run dev
```

Client:

```bash
cd frontend/client
npm run dev
```

## Environment Variables

Required variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `VITE_API_URL`

Optional:

- `PORT`

## API Overview

### Auth Routes

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

### Post Routes

- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (admin)
- `PUT /posts/:id` (admin)
- `PATCH /posts/:id/publish` (admin)
- `DELETE /posts/:id` (admin, draft only)

### Comment Routes

- `GET /posts/:id/comments`
- `POST /posts/:id/comments`
- `DELETE /comments/:id` (admin)

## Deployment

### Backend (Render)

- Service type: Web Service
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add backend environment variables in Render dashboard

### Frontend (Vercel)

- Deploy `frontend/client` as the public app
- Deploy `frontend/admin` as the admin app (optional separate project)
- Add `VITE_API_URL` in Vercel environment settings

### Database (Neon)

- Provision PostgreSQL in Neon
- Copy connection string into backend `DATABASE_URL`
- Ensure Prisma migrations are already applied

## Screenshots

<!-- Replace with actual screenshots -->

- Public Client Home: `[Add screenshot here]`
- Post Detail + Comments: `[Add screenshot here]`
- Admin Dashboard: `[Add screenshot here]`
- Create/Edit Post: `[Add screenshot here]`

## Author

- Name: stevenstank
- GitHub: https://github.com/stevenstank