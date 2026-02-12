# Real-Time Chat Microservices Ecosystem

Scaffolded WhatsApp-clone architecture with independently deployable microservices, event-driven messaging, and a React 19 frontend.

## Services
- **auth-service** (Express + TypeScript + Prisma/PostgreSQL): registration/login, JWT, premiumStatus flag.
- **chat-service** (Express + TypeScript + MongoDB + Kafka + Socket.IO): message persistence and tick updates.
- **presence-service** (Express + TypeScript + Redis): online/last seen caching.
- **group-service** (Express + TypeScript + Prisma/PostgreSQL): group CRUD and member/admin management.
- **media-service** (Express + TypeScript + Multer): media upload and CDN-style link responses.
- **frontend** (React 19 + TypeScript + Tailwind + Redux Toolkit + Lucide): shell UI for chats.

## Architecture Notes
- Microservice + MVC folder structure (`models`, `dtos`, `services`, `controllers`, `routes`).
- Event-driven flow via Kafka producer in chat-service.
- Tick mapping:
  - `SENT`: Kafka producer send success.
  - `DELIVERED`: Socket.IO delivery acknowledgement.
  - `READ`: Socket.IO read event (can be wired from viewport/active chat client events).

## Run with Docker
```bash
docker compose up --build
```

This starts PostgreSQL, MongoDB, Redis, Kafka, Zookeeper, all backend services, and the frontend.

## Environment Variables
Each service includes a `.env.example` for local runs. All credentials and keys are sourced from env vars.
