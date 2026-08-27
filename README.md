# AfDB Core Backend — Enterprise Data Engine

> Central data engine for the African Development Bank enterprise platform. Exposes RESTful APIs consumed by the Beta tier and manages business logic, database operations, and external integrations (FileNet, SAP, Azure Graph, e-signature).

## Technology Stack
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB 7 + Mongoose ODM
- **Cache:** Redis / ioredis
- **Queue:** BullMQ
- **Auth:** JWT + RBAC
- **Docs:** Swagger/OpenAPI
- **Logging:** Winston

## Getting Started

```bash
npm install
npm run dev
```

API runs on [http://localhost:4001/api/v1](http://localhost:4001/api/v1)

## Repository Purpose
This is the **Core tier backend** — the data engine of the platform:
- RESTful API services for all enterprise entities
- Business logic layer for CRUD operations
- MongoDB data management with Mongoose ODM
- Redis-cached session data and role-permission lookups
- External system integrations: FileNet, SAP, Azure Graph, e-signature
- BullMQ job queues for async processing

## Architecture
```
PRESENTATION → afdb_core_frontend / afdb_beta_frontend
API GATEWAY  → Next.js API Routes / Express
BUSINESS     → Node.js / TypeScript / Express / BullMQ
DATA ACCESS  → Mongoose ODM / Redis Client
DATA         → MongoDB (primary) / Redis (cache)
EXTERNAL     → FileNet / SAP / Azure Graph / E-Signature
```

## License
Private — African Development Bank Consultancy Project
