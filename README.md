<div align="center">

<img src="./assets/logo.png" width="80" height="80" alt="MailFlow Logo" />

# MailFlow

**Queue-Based Bulk Email Delivery System**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-4F46E5?style=for-the-badge)](<!-- ADD CLIENT URL -->)

<!-- [![Demo Video](https://img.shields.io/badge/Demo%20Video-Watch-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](ADD VIDEO URL) -->

</div>

## Table of Contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Email Processing Workflow](#5-email-processing-workflow)
6. [Database Models](#6-database-models)
7. [Screenshots](#7-screenshots)
8. [Project Structure](#8-project-structure)
9. [Installation & Setup](#9-installation--setup)
10. [API Reference](#10-api-reference)
11. [Deployment](#11-deployment)
12. [Challenges](#12-challenges)
13. [Engineering Highlights](#13-engineering-highlights)
14. [Future Improvements](#14-future-improvements)

# 1. Overview

MailFlow is a queue-based bulk email delivery platform built to explore scalable backend architecture and asynchronous job processing.

Instead of sending thousands of emails within a single HTTP request, MailFlow creates individual email jobs, pushes them into a BullMQ queue, and processes them through background workers. This ensures the API remains responsive while email delivery is handled independently.

The system allows users to create campaigns, select recipient groups, schedule future deliveries, and monitor delivery progress through a real-time dashboard.

# 2. Features

| #   | Feature               | Description                                        |
| --- | --------------------- | -------------------------------------------------- |
| 1   | Authentication        | JWT-based authentication with protected routes     |
| 2   | Campaign Management   | Create and manage email campaigns                  |
| 3   | Group-Based Sending   | Send emails to multiple recipient groups           |
| 4   | Additional Recipients | Add custom recipients manually                     |
| 5   | Queue Processing      | Background email processing using BullMQ           |
| 6   | Scheduled Delivery    | Schedule campaigns for future execution            |
| 7   | Email Tracking        | Track sent, failed, pending, and processing emails |
| 8   | Progress Monitoring   | View campaign delivery progress in real time       |
| 9   | Dashboard UI          | Clean SaaS-style dashboard                         |
| 10  | Responsive Design     | Mobile and desktop friendly                        |

# 3. Tech Stack

**Client:** TypeScript, React, TailwindCSS, Shadcn/ui, Axios

**Server:** NestJS, PostgreSQL, Prisma ORM, BullMQ, Redis, JWT Authentication

# 4. System Architecture

![System Architecture](./assets/sad.png)

A high-level overview of the frontend, backend, queue system, Redis, workers, and email service.

# 5. Email Processing Workflow

![Workflow Diagram](./assets/wfd.png)

The workflow demonstrates how campaigns are transformed into individual email jobs and processed asynchronously through BullMQ workers.

# 6. Database Models

![Er-diagram](./assets/er.png)

# 7. Screenshots

## 7.1 Dashboard

![Dashboard](./assets/dashboard.png)

## 7.2 Grapups Management

![groups](./assets/groups.png)

## 7.3 Create Campaign and Progress Tracking

![campaign-creation](./assets/mail.gif)

# 8. Project Structure

```txt
mailflow/
│
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── hooks/
│       └── utils/
│
└── server/
    ├── prisma/
    │   └── schema.prisma
    │
    └── src/
        ├── auth/
        ├── campaigns/
        ├── contacts/
        ├── groups/
        ├── queue/
        ├── workers/
        ├── mail/
        └── common/
```

# 9. Installation & Setup

- Prerequisites: Node.js v18+, PostgreSQL, Redis.
- Clone repository and install dependencies:

```bash
git clone <YOUR_REPOSITORY_URL>
cd mailflow
cd server
npm install
cd ../client
npm install
```

- Configure backend environment variables:

```bash
cd server
cp .env.example .env
```

```env
NODE_ENV=development
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
REDIS_HOST=localhost
REDIS_PORT=6379
MAIL_PROVIDER_API_KEY=
```

- Configure frontend environment variables:

```env
VITE_API_URL=http://localhost:3000
```

Note: Email sending (SMTP / provider integration) and Swagger UI are not implemented in this branch and are planned for a future update. `server/src/mail/mail.service.ts` contains a placeholder `sendEmail()` that must be implemented before sending real emails.

- Set up the database:

```bash
cd server
npx prisma migrate dev
```

- Start Redis:

```bash
redis-server
```

- Run backend:

```bash
cd server
npm run start:dev
```

- Run frontend:

```bash
cd client
npm run dev
```

# 10. API Reference

> Swagger documentation: coming soon (not enabled in this branch).

## Authentication

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | /auth/register      | Register a new user  |
| POST   | /auth/login         | Login user           |
| POST   | /auth/refresh-token | Refresh access token |

## Groups

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | /groups     | Create group      |
| GET    | /groups     | Get all groups    |
| GET    | /groups/:id | Get group details |
| DELETE | /groups/:id | Delete group      |

## Contacts

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| POST   | /contacts     | Create contact |
| GET    | /contacts     | Get contacts   |
| DELETE | /contacts/:id | Delete contact |

## Campaigns

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /campaigns     | Create campaign      |
| GET    | /campaigns     | Get campaigns        |
| GET    | /campaigns/:id | Get campaign details |

# 11. Deployment

### Frontend

<!-- ADD FRONTEND URL -->

### Backend

<!-- ADD BACKEND URL -->

### Database

PostgreSQL

### Queue Infrastructure

Redis + BullMQ

# 12. Challenges

- Designing a queue-based architecture instead of synchronous email delivery
- Handling recipient deduplication when combining groups and custom emails
- Managing scheduled email delivery through delayed jobs
- Tracking delivery progress efficiently for thousands of email jobs
- Updating campaign progress without introducing unnecessary server load

# 13. Engineering Highlights

- Queue-based architecture using BullMQ and Redis
- Background workers for asynchronous email processing
- Scheduled email delivery using delayed jobs
- Campaign progress tracking through EmailJob aggregation
- Recipient deduplication before job generation
- Modular NestJS architecture
- JWT authentication with protected APIs
- Relational data modeling using Prisma and PostgreSQL
- Separation of API requests and background processing

# 14. Future Improvements

- [ ] CSV contact import
- [ ] Email templates
- [ ] Retry failed emails automatically
- [ ] Campaign analytics dashboard
- [ ] WebSocket live updates
- [ ] Multi-organization support
- [ ] Email open and click tracking

<div align="center">

## License

This project is licensed under the MIT License.

</div>
