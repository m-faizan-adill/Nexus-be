# Nexus Backend

Backend development for the Nexus – Investor & Entrepreneur Collaboration Platform.

## Developer

### Muhammad Faizan Adil

`Pursuing CS Degree from IQRA University`

---

## Project Overview

Nexus is a platform that connects investors and entrepreneurs, enabling collaboration through meetings, video calls, document sharing, and secure transactions.

This repository contains the backend implementation built with Node.js, Express.js, and MongoDB.

---

## Progress - Week 1

### Environment Setup Completed

* Created backend repository.
* Initialized Node.js project using `npm init -y`.
* Configured Express.js server.
* Connected MongoDB database using Mongoose.
* Added environment variable support with dotenv.
* Configured CORS middleware.
* Enabled JSON request handling.
* Implemented database connection module.
* Created initial project structure.
* Added `.gitignore` for environment files and dependencies.
* Verified API functionality with a test route.

### Current API

#### Health Check

```http
GET /
```

Response:

```json
{
  "success": true,
  "message": "Nexus Backend Running"
}
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* CORS
* Nodemon

---

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/

server.js
```

---

## Upcoming Tasks

### Milestone 2 – User Authentication & Profiles

* User Registration API
* User Login API
* JWT Authentication
* Profile Management
* Role-Based Access Control (Investor / Entrepreneur)
* Secure Password Hashing using bcrypt

```
```

## Progress Update

### Authentication Module (In Progress)

Completed:

* Created User model based on frontend data structure.
* Installed authentication dependencies:

  * bcryptjs
  * jsonwebtoken
* Created authentication controller structure.
* Created authentication routes.
* Implemented centralized route management using `routes/index.js`.
* Added API versioning (`/api/v1`).
* Prepared JWT-based authentication architecture.
* Prepared password hashing workflow using bcrypt.

Current Endpoints:

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

Next Steps:

* Complete register controller logic.
* Complete login controller logic.
* Generate JWT tokens after login.
* Create authentication middleware.
* Implement protected routes.
* Create profile APIs.
* Connect frontend authentication with backend APIs.

```
```
