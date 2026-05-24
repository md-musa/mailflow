<div align="center">

<img src="https://img.icons8.com/fluency/96/mail.png" width="72" height="72" alt="MailFlow Logo" />

# MailFlow

**Queue-Based Bulk Email Delivery System**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-4F46E5?style=for-the-badge)](<!-- ADD CLIENT LIVE URL -->)
[![API Docs](https://img.shields.io/badge/API%20Docs-Swagger%20UI-85EA2D?style=for-the-badge)](<!-- ADD SWAGGER URL -->)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-Watch-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](<!-- ADD VIDEO URL -->)

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Queue Workflow](#5-queue-workflow)
6. [Database Models](#6-database-models)
7. [Screenshots](#7-screenshots)
8. [Project Structure](#8-project-structure)
9. [Installation & Setup](#9-installation--setup)
10. [Future Improvements](#10-future-improvements)
11. [What I Learned](#11-what-i-learned)

---

## 1. Overview

**MailFlow** is a bulk email delivery system I built to learn how queue-based backend architecture works in practice. The idea is simple — instead of sending thousands of emails in a single request, the system pushes each email into a queue and lets background workers handle the delivery asynchronously.

The frontend shows live progress as emails are processed, so you can actually see the queue working in real time.

---

## 2. Features

| # | Feature | Description |
|---|---|---|
| 1 | **Authentication** | JWT-based login with protected routes |
| 2 | **Campaign Management** | Create and manage email campaigns |
| 3 | **Group-Based Sending** | Send to multiple recipient groups at once |
| 4 | **Additional Recipients** | Add custom emails manually to any campaign |
| 5 | **Queue Processing** | Background email processing via BullMQ |
| 6 | **Delayed Scheduling** | Schedule campaigns for future delivery |
| 7 | **Email Tracking** | Track sent, failed, pending, and processing states |
| 8 | **Real-Time Progress** | Live campaign progress via frontend polling |
| 9 | **Dashboard UI** | Clean dashboard built with shadcn/ui |
| 10 | **Responsive Design** | Works on mobile and desktop |

---

## 3. Tech Stack

**Client** — React, Vite, TailwindCSS, shadcn/ui, Axios, Sonner

**Server** — NestJS, PostgreSQL, Prisma, BullMQ, Redis, JWT

---

## 4. System Architecture

```
Frontend (React)
      |
      |  HTTP / REST
      v
NestJS REST API
      |
      |  Enqueue Jobs
      v
BullMQ Queue  <-->  Redis
      |
      |  Consumed by
      v
Background Workers
      |
      v
Mail Service
```

---

## 5. Queue Workflow

```
Create Campaign
      |
      v
Generate Email Jobs
      |
      v
Push Jobs into Queue
      |
      v
Workers Process Emails
      |
      v
Update Email Status in DB
      |
      v
Frontend Polls -> UI Updates
```

---

## 6. Database Models

| # | Model | Purpose |
|---|---|---|
| 1 | `User` | Authenticated users |
| 2 | `Group` | Recipient groups |
| 3 | `Contact` | Recipient emails |
| 4 | `Campaign` | Campaign details |
| 5 | `CampaignGroup` | Many-to-many: campaigns and groups |
| 6 | `EmailJob` | Individual email delivery status |

---

## 7. Screenshots

### 7.1 Dashboard
<!-- ADD DASHBOARD SCREENSHOT -->

### 7.2 Create Campaign Modal
<!-- ADD MODAL SCREENSHOT -->

### 7.3 Campaign Progress
<!-- ADD CAMPAIGN PROGRESS SCREENSHOT -->

### 7.4 Swagger API Docs
<!-- ADD SWAGGER SCREENSHOT -->

---

## 8. Project Structure

```
mailflow/
|
├── client/                    # React frontend
|   └── src/
|       ├── api/               # Axios API calls
|       ├── components/        # Reusable UI components
|       ├── pages/             # Page components
|       ├── routes/            # React Router config
|       ├── hooks/             # Custom React hooks
|       └── utils/             # Helper functions
|
└── server/                    # NestJS backend
    ├── .env.example           # Environment variable template
    └── src/
        ├── auth/              # JWT authentication
        ├── campaigns/         # Campaign logic
        ├── contacts/          # Contact management
        ├── groups/            # Group management
        ├── queue/             # BullMQ queue setup
        ├── workers/           # Background job processors
        ├── mail/              # Mail sending service
        └── prisma/            # Prisma client and schema
```

---

## 9. Installation & Setup

### Prerequisites

- Node.js v18+
- PostgreSQL
- Redis (installed locally — run with `redis-server`)

### Clone and Install

```bash
git clone <YOUR_REPOSITORY_URL>
cd mailflow

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Environment Variables

The server has a `.env.example` file. Copy it and fill in your values:

```bash
cp server/.env.example server/.env
```

```env
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
REDIS_HOST=
REDIS_PORT=
MAIL_PROVIDER_API_KEY=
```

The frontend needs one variable:

```env
# client/.env
VITE_API_URL=http://localhost:3000
```

### Run the App

```bash
# Start Redis
redis-server

# Run Prisma migrations
cd server && npx prisma migrate dev

# Start backend (in server/)
npm run start:dev

# Start frontend (in client/)
cd ../client && npm run dev
```

Swagger docs available at `http://localhost:3000/api/docs`

---

## 10. Future Improvements

- [ ] CSV contact import
- [ ] Email template builder
- [ ] Retry failed emails automatically
- [ ] WebSocket updates instead of polling
- [ ] Campaign analytics dashboard
- [ ] Multi-organization support

---

## 11. What I Learned

- How queue-based architecture works and why it matters for background tasks
- Setting up BullMQ with Redis for async job processing
- Writing background workers that run independently of the API
- Tracking job state in a database and surfacing it in a UI
- Delayed job scheduling
- Relational data modeling with Prisma and PostgreSQL

---

<div align="center">
MIT License
</div>
