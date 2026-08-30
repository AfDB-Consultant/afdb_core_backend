<div align="center">

# AfDB Core Backend — Enterprise Data Engine

### Live Reference Application — Consultancy Proposal Support

<br/>

| | |
|---|---|
| **Prepared By** | [Eng. Depute N.Alphonse, PMP®](https://atradezone.ca/deputenalphonse) |
| **Role** | Senior Web Frontend Developer Consultant (TCIS) |
| **Live API** | [afdb-core-api.atradezone.ca](https://afdb-core-api.atradezone.ca) |
| **GitHub Org** | [github.com/AfDB-Consultant](https://github.com/AfDB-Consultant) |

</div>

---

## About This Application

> Words on a page can say a lot. Code says more.

This is a **live reference application** built to demonstrate the exact patterns described in the consultancy proposal for **Senior Web Frontend Developer Consultant (TCIS)** at the African Development Bank.

### What This Repo Does

This is the **Core Tier Backend** — the data engine of the platform:

- RESTful API services for all enterprise entities
- Business logic layer for CRUD operations
- MongoDB data management with Mongoose ODM
- Redis-cached session data and role-permission lookups
- Team management and activity tracking
- External system integrations: FileNet, SAP, Azure Graph, e-signature
- BullMQ job queues for async processing

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 20 LTS |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Cache** | Redis 7 / ioredis |
| **Queue** | BullMQ |
| **Auth** | JWT + RBAC (validated by Beta Backend) |
| **Docs** | Swagger/OpenAPI |
| **Logging** | Winston |
| **CI/CD** | GitHub Actions → Docker Hub → AWS EC2 |

## Live URLs

| Service | URL |
|---------|-----|
| **Data API** | [https://afdb-core-api.atradezone.ca](https://afdb-core-api.atradezone.ca) |
| **Health Check** | [https://afdb-core-api.atradezone.ca/health](https://afdb-core-api.atradezone.ca/health) |

## Getting Started

```bash
npm install
npm run dev
```

API runs on [http://localhost:4001/api/v1](http://localhost:4001/api/v1)

> **Prerequisites:** MongoDB Atlas or local MongoDB, Redis on port 6379.

## Architecture

```
PRESENTATION → afdb_core_frontend / afdb_beta_frontend
API GATEWAY  → Next.js API Routes / Express
BUSINESS     → Node.js / TypeScript / Express / BullMQ
DATA ACCESS  → Mongoose ODM / Redis Client
DATA         → MongoDB Atlas (primary) / Redis (cache)
EXTERNAL     → FileNet / SAP / Azure Graph / E-Signature
```

## Related Repositories

| Repository | Role | Live URL |
|-----------|------|----------|
| [`afdb_beta_frontend`](https://github.com/AfDB-Consultant/afdb_beta_frontend) | Auth Portal UI | [afdb-beta.atradezone.ca](https://afdb-beta.atradezone.ca) |
| [`afdb_beta_backend`](https://github.com/AfDB-Consultant/afdb_beta_backend) | Authentication Gateway | [afdb-api.atradezone.ca](https://afdb-api.atradezone.ca) |
| [`afdb_core_frontend`](https://github.com/AfDB-Consultant/afdb_core_frontend) | Enterprise Dashboard UI | [afdb-core.atradezone.ca](https://afdb-core.atradezone.ca) |

## Contact

**Eng. Depute N.Alphonse, PMP®** — [depute@atradezone.ca](mailto:depute@atradezone.ca) — [Portfolio](https://atradezone.ca/deputenalphonse)

---

<div align="center">*© 2026 Eng. Depute N.Alphonse, PMP®. Open-source reference application.*</div>
