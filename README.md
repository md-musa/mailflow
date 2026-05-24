````md
# MailFlow

> Queue-Based Bulk Email Delivery System built with NestJS, BullMQ, Redis, Prisma, PostgreSQL, React, and shadcn/ui.

---

# 1. Overview

MailFlow is a scalable bulk email delivery platform designed for organizations to manage and send email campaigns efficiently.

The system uses asynchronous queue processing with BullMQ and Redis to handle large-scale email delivery in the background while tracking delivery progress in real time.

This project demonstrates:
- Queue-based architecture
- Background workers
- Asynchronous processing
- Delayed jobs
- Campaign tracking
- Scalable backend design

---

# 2. Features

| # | Feature | Description |
|---|---|---|
| 1 | Authentication System | JWT-based authentication with protected routes |
| 2 | Campaign Management | Create and manage email campaigns |
| 3 | Group-Based Sending | Send emails to multiple recipient groups |
| 4 | Additional Recipients | Add custom email recipients manually |
| 5 | Queue Processing | Background email processing using BullMQ |
| 6 | Delayed Scheduling | Schedule campaigns for future delivery |
| 7 | Email Tracking | Track sent, failed, pending, and processing emails |
| 8 | Real-Time Progress | Live campaign progress tracking |
| 9 | Dashboard UI | Minimal SaaS-style dashboard using shadcn/ui |
| 10 | Responsive Design | Mobile-friendly frontend layout |

---

# 3. Tech Stack

| Category | Technology |
|---|---|
| Frontend | React + Vite |
| UI Library | shadcn/ui |
| Styling | TailwindCSS |
| Backend | NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Queue System | BullMQ |
| Queue Storage | Redis |
| Authentication | JWT |
| API Client | Axios |
| Notifications | Sonner |

---

# 4. System Architecture

```txt
Frontend (React)
        ↓
NestJS REST API
        ↓
BullMQ Queue
        ↓
Redis
        ↓
Background Workers
        ↓
Mail Service
```

---

# 5. Queue Workflow

```txt
Create Campaign
      ↓
Generate Email Jobs
      ↓
Push Jobs Into Queue
      ↓
Workers Process Emails
      ↓
Update Email Status
      ↓
Frontend Polling Updates UI
```

---

# 6. Database Models

| Model | Purpose |
|---|---|
| User | Stores authenticated users |
| Group | Stores recipient groups |
| Contact | Stores recipient emails |
| Campaign | Stores campaign details |
| CampaignGroup | Many-to-many relation between campaigns and groups |
| EmailJob | Tracks individual email delivery status |

---

# 7. Frontend Pages

| Page | Description |
|---|---|
| Login | User authentication |
| Dashboard | Campaign overview and analytics |
| Groups | Manage recipient groups |
| Contacts | Manage recipient emails |
| Campaign Details | Track campaign delivery progress |

---

# 8. Screenshots

## 8.1 Dashboard
<!-- ADD DASHBOARD SCREENSHOT -->

---

## 8.2 Create Campaign Modal
<!-- ADD MODAL SCREENSHOT -->

---

## 8.3 Campaign Progress
<!-- ADD CAMPAIGN PROGRESS SCREENSHOT -->

---

## 8.4 Swagger API Documentation
<!-- ADD SWAGGER SCREENSHOT -->

---

# 9. API Documentation

Swagger Documentation:

```txt
http://localhost:3000/api/docs
```

---

# 10. Project Structure

```txt
mailflow/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── hooks/
│   │   └── utils/
│
├── server/
│   ├── src/
│   │   ├── auth/
│   │   ├── campaigns/
│   │   ├── contacts/
│   │   ├── groups/
│   │   ├── queue/
│   │   ├── workers/
│   │   ├── mail/
│   │   └── prisma/
```

---

# 11. Installation

## 11.1 Clone Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

---

## 11.2 Backend Setup

```bash
cd server

npm install
```

---

## 11.3 Frontend Setup

```bash
cd client

npm install
```

---

# 12. Environment Variables

## 12.1 Backend `.env`

```env
DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

REDIS_HOST=

REDIS_PORT=

MAIL_PROVIDER_API_KEY=
```

---

## 12.2 Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

# 13. Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

---

# 14. Start Redis

Using Docker:

```bash
docker compose up -d
```

OR locally:

```bash
redis-server
```

---

# 15. Run Application

## 15.1 Start Backend

```bash
npm run start:dev
```

---

## 15.2 Start Frontend

```bash
npm run dev
```

---

# 16. Future Improvements

- CSV contact import
- Email templates
- Retry failed emails
- WebSocket real-time updates
- Campaign analytics dashboard
- Multi-organization support

---

# 17. Backend Concepts Demonstrated

- Queue-based architecture
- Background workers
- Asynchronous processing
- Delayed job scheduling
- Scalable email delivery
- Relational database modeling
- Real-time progress tracking

---

# 18. Demo Video

<!-- ADD DEMO VIDEO LINK -->

---

# 19. Author

## Your Name

- Portfolio: <!-- ADD PORTFOLIO LINK -->
- LinkedIn: <!-- ADD LINKEDIN LINK -->
- Email: <!-- ADD EMAIL -->

---

# 20. License

MIT License
````
