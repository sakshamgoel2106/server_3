# server_3

A lightweight, file-backed authentication and books REST API built with **Node.js**, **Express 5**, and **JWT**. This is the third iteration (`server_3`) of an auth/permissions server — designed as a teaching example of a clean controller / service / middleware split with JSON-file persistence.

---

## Features

- 🔐 **Email + password login** with bcrypt password hashing
- 🪪 **JWT-based authentication** (Bearer token, configurable expiration)
- 👤 **Protected profile route** — `GET /auth/profile`
- 📚 **Per-user books API** — users can only see books they own
  - `GET /books` — list books belonging to the authenticated user
  - `GET /books/:id` — fetch a single book (with ownership check)
- 🗂️ **Layered architecture** — controllers, services, middlewares, and config are separated
- 🗃️ **JSON file storage** — no database required, great for demos and tests

---

## Tech Stack

| Layer            | Choice                                |
| ---------------- | ------------------------------------- |
| Runtime          | Node.js (ES Modules, `"type": "module"`) |
| Framework        | Express 5                             |
| Auth             | `jsonwebtoken` (HS256)                |
| Password hashing | `bcryptjs`                            |
| Dev tooling      | `nodemon`                             |
| Config           | `dotenv`                              |
| CORS             | `cors`                                |

---

## Project Structure

```
server_3/
├── server.js                  # Express app entry point & route registration
├── package.json
├── hash.js                    # Helper to bcrypt-hash a sample password
├── config/
│   └── jwt.js                 # JWT_SECRET and JWT_EXPIRATION
├── controllers/
│   ├── authcontroller.js      # /auth endpoints
│   └── bookcontroller.js      # /books endpoints
├── services/
│   ├── authService.js         # Login + profile logic
│   └── bookService.js         # Book lookup with ownership enforcement
├── middlewares/
│   └── auth.js                # JWT authentication middleware
└── data/
    ├── users.json             # Seeded user records (bcrypt-hashed passwords)
    └── books.json             # Seeded book records (each tied to a userId)
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (for native ES module + `import ... with { type: "json" }` support)
- **npm**

### Install

```bash
npm install
```

### Configure

Create a `.env` file in the project root (or override the defaults in `config/jwt.js`):

```env
PORT=3000
JWT_SECRET=replace-with-a-long-random-secret
```

> ⚠️ The default `JWT_SECRET` in `config/jwt.js` is a placeholder (`"2580"`). **Change it before deploying anywhere real.**

### Run

```bash
# Production
npm start

# Development (auto-reload via nodemon)
npm run dev
```

The server will start on `http://localhost:3000` (or your `PORT`).

---

## API Reference

All protected routes require a `Authorization: Bearer <token>` header.

### Health check

```http
GET /
```

```json
{ "message": "Server is running" }
```

### Auth

| Method | Endpoint        | Auth | Description                          |
| ------ | --------------- | ---- | ------------------------------------ |
| POST   | `/auth/login`   | ❌   | Email + password → JWT               |
| GET    | `/auth/profile` | ✅   | Returns the authenticated user's data |

**Login example**

```http
POST /auth/login
Content-Type: application/json

{ "email": "user@example.com", "password": "password@123" }
```

**Response**

```json
{
  "token": "eyJhbGciOi...",
  "user": { "id": 1, "name": "Alice", "email": "user@example.com" }
}
```

### Books

| Method | Endpoint      | Auth | Description                                       |
| ------ | ------------- | ---- | ------------------------------------------------- |
| GET    | `/books`      | ✅   | Returns books owned by the current user           |
| GET    | `/books/:id`  | ✅   | Returns a single book — 404 or 403 if not allowed |

---

## Error Responses

| Status | Meaning                                                                       |
| ------ | ----------------------------------------------------------------------------- |
| `400`  | Missing required fields (e.g. login body)                                      |
| `401`  | Missing or invalid credentials                                                 |
| `403`  | Invalid/expired token, or trying to access another user's book                 |
| `404`  | User or book not found                                                         |
| `500`  | Unhandled internal error                                                        |

---

## Security Notes

- Passwords are stored **hashed with bcrypt** — never in plain text.
- The `hash.js` script is a utility for generating bcrypt hashes (e.g. to seed `data/users.json`).
- `JWT_SECRET` should be a long, random value and **never committed** in production.
- This project is a **demo / learning project**: data is persisted to flat JSON files — do not use it in production as-is.

---

## License

ISC
