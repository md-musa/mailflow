<div align="center">

<img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/mail.svg" width="64" height="64" />

# MailFlow

### Queue-Based Bulk Email Delivery System

*Send smarter. Scale faster. Track everything.*

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-4F46E5?style=for-the-badge)](<!-- ADD CLIENT LIVE URL -->)
[![Swagger Docs](https://img.shields.io/badge/📖%20API%20Docs-Swagger%20UI-85EA2D?style=for-the-badge)](<!-- ADD SWAGGER LIVE URL e.g. https://api.yourdomain.com/api/docs -->)

</div>

---

## 📋 Table of Contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Queue Workflow](#5-queue-workflow)
6. [Database Models](#6-database-models)
7. [Frontend Pages](#7-frontend-pages)
8. [Screenshots](#8-screenshots)
9. [Project Structure](#9-project-structure)
10. [Getting Started](#10-getting-started)
11. [Environment Variables](#11-environment-variables)
12. [Database Migration](#12-database-migration)
13. [Start Redis](#13-start-redis)
14. [Run the Application](#14-run-the-application)
15. [Future Improvements](#15-future-improvements)
16. [Backend Concepts Demonstrated](#16-backend-concepts-demonstrated)
17. [Demo](#17-demo)
18. [Author](#18-author)
19. [License](#19-license)

---

## 1. Overview

**MailFlow** is a scalable bulk email delivery platform built for organizations that need to manage and send email campaigns efficiently — at any scale.

It uses **asynchronous queue processing** with BullMQ and Redis to handle large-scale email delivery in the background, while tracking delivery progress in real time through a clean, responsive dashboard.

> Built to demonstrate production-grade patterns: queue architecture, background workers, async processing, delayed jobs, and real-time campaign tracking.

---

## 2. Features

| # | Feature | Description |
|---|---|---|
| 1 | 🔐 **Authentication** | JWT-based auth with protected routes |
| 2 | 📣 **Campaign Management** | Create and manage full email campaigns |
| 3 | 👥 **Group-Based Sending** | Send to multiple recipient groups at once |
| 4 | ➕ **Additional Recipients** | Add custom emails manually to any campaign |
| 5 | ⚙️ **Queue Processing** | Async background email processing via BullMQ |
| 6 | ⏰ **Delayed Scheduling** | Schedule campaigns for future delivery |
| 7 | 📊 **Email Tracking** | Track sent, failed, pending, and processing states |
| 8 | 🔴 **Real-Time Progress** | Live campaign progress updates |
| 9 | 🖥️ **Dashboard UI** | Clean SaaS-style dashboard with shadcn/ui |
| 10 | 📱 **Responsive Design** | Fully mobile-friendly frontend |

---

## 3. Tech Stack

| # | Category | Technology |
|---|---|---|
| 1 | Frontend | React + Vite |
| 2 | UI Library | shadcn/ui |
| 3 | Styling | TailwindCSS |
| 4 | Backend | NestJS |
| 5 | Database | PostgreSQL |
| 6 | ORM | Prisma |
| 7 | Queue System | BullMQ |
| 8 | Queue Storage | Redis |
| 9 | Authentication | JWT |
| 10 | API Client | Axios |
| 11 | Notifications | Sonner |

---

## 4. System Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React)              │
└──────────────────┬──────────────────────┘
                   │ HTTP / REST
┌──────────────────▼──────────────────────┐
│           NestJS REST API               │
└──────────────────┬──────────────────────┘
                   │ Enqueue Jobs
┌──────────────────▼──────────────────────┐
│           BullMQ Queue                  │
└──────────────────┬──────────────────────┘
                   │ Backed by
┌──────────────────▼──────────────────────┐
│               Redis                     │
└──────────────────┬──────────────────────┘
                   │ Consumed by
┌──────────────────▼──────────────────────┐
│          Background Workers             │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│            Mail Service                 │
└─────────────────────────────────────────┘
```

---

## 5. Queue Workflow

```
Create Campaign
       │
       ▼
Generate Email Jobs
       │
       ▼
Push Jobs Into Queue
       │
       ▼
Workers Process Emails
       │
       ▼
Update Email Status in DB
       │
       ▼
Frontend Polls → UI Updates
```

---

## 6. Database Models

| # | Model | Purpose |
|---|---|---|
| 1 | `User` | Stores authenticated users |
| 2 | `Group` | Stores recipient groups |
| 3 | `Contact` | Stores recipient emails |
| 4 | `Campaign` | Stores campaign details |
| 5 | `CampaignGroup` | Many-to-many: campaigns ↔ groups |
| 6 | `EmailJob` | Tracks individual email delivery status |

---

## 7. Frontend Pages

| # | Page | Description |
|---|---|---|
| 1 | `/login` | User authentication |
| 2 | `/dashboard` | Campaign overview and analytics |
| 3 | `/groups` | Manage recipient groups |
| 4 | `/contacts` | Manage recipient emails |
| 5 | `/campaigns/:id` | Track campaign delivery progress |

---

## 8. Screenshots

### 8.1 Dashboard
<!-- ADD DASHBOARD SCREENSHOT -->
> *Campaign overview with live stats*

### 8.2 Create Campaign Modal
<!-- ADD MODAL SCREENSHOT -->
> *Campaign creation form with group selection*

### 8.3 Campaign Progress
<!-- ADD CAMPAIGN PROGRESS SCREENSHOT -->
> *Real-time delivery tracking view*

### 8.4 Swagger API Docs
<!-- ADD SWAGGER SCREENSHOT -->
> *Full REST API documentation — also available live at the [Swagger link](#) above*

---

## 9. Project Structure

```
mailflow/
│
├── client/                        # React frontend
│   ├── .env.example               # Frontend env template
│   └── src/
│       ├── api/                   # Axios API calls
│       ├── components/            # Reusable UI components
│       ├── pages/                 # Route-level page components
│       ├── routes/                # React Router config
│       ├── hooks/                 # Custom React hooks
│       └── utils/                 # Helper functions
│
└── server/                        # NestJS backend
    ├── .env.example               # Backend env template
    └── src/
        ├── auth/                  # JWT authentication
        ├── campaigns/             # Campaign CRUD & logic
        ├── contacts/              # Contact management
        ├── groups/                # Group management
        ├── queue/                 # BullMQ queue setup
        ├── workers/               # Background job processors
        ├── mail/                  # Mail sending service
        └── prisma/                # Prisma client & schema
```

---

## 10. Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- Redis (installed locally)

### 10.1 Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd mailflow
```

### 10.2 Backend Setup

```bash
cd server
npm install
```

### 10.3 Frontend Setup

```bash
cd client
npm install
```

---

## 11. Environment Variables

Both `server/` and `client/` include a `.env.example` file. Copy and fill in your values:

```bash
# Backend
cp server/.env.example server/.env

# Frontend
cp client/.env.example client/.env
```

### 11.1 Backend — `server/.env`

```env
DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

REDIS_HOST=
REDIS_PORT=

MAIL_PROVIDER_API_KEY=
```

### 11.2 Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## 12. Database Migration

```bash
cd server
npx prisma migrate dev
```

---

## 13. Start Redis

Start Redis locally using the `redis-server` command:

```bash
redis-server
```

> Make sure Redis is installed on your machine. See the [Redis installation guide](https://redis.io/docs/getting-started/installation/) for your OS.

---

## 14. Run the Application

### 14.1 Start Backend

```bash
cd server
npm run start:dev
```

### 14.2 Start Frontend

```bash
cd client
npm run dev
```

### 14.3 API Documentation

Swagger UI is available locally at:

```
http://localhost:3000/api/docs
```

---

## 15. Future Improvements

- [ ] CSV contact import
- [ ] Email template builder
- [ ] Retry failed emails automatically
- [ ] WebSocket real-time updates (replace polling)
- [ ] Advanced campaign analytics dashboard
- [ ] Multi-organization / workspace support

---

## 16. Backend Concepts Demonstrated

- ✅ Queue-based architecture with BullMQ
- ✅ Background worker processing
- ✅ Asynchronous job handling
- ✅ Delayed job scheduling
- ✅ Scalable email delivery pipeline
- ✅ Relational database modeling with Prisma
- ✅ Real-time progress tracking via polling

---

## 17. Demo

<!-- ADD DEMO VIDEO LINK -->

---

## 18. Author

**Your Name**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](<!-- ADD PORTFOLIO LINK -->)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](<!-- ADD LINKEDIN LINK -->)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:<!-- ADD EMAIL -->)

---

## 19. License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ and a lot of queued emails.

</div>
