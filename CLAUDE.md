# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**r3-carbon-dashboard** — A data visualization mini-app for the ADEME Base Empreinte (the official French reference database of carbon emission factors by activity).

## Architecture

Monorepo with two services backed by PostgreSQL:

- `frontend/` — UI (not yet scaffolded)
- `backend/` — API (not yet scaffolded)
- `docker-compose.yml` — Spins up PostgreSQL 16 (`r3carbon` DB, user `r3user`, port 5432)

## Running the database

```bash
docker compose up -d
```

PostgreSQL connection: `postgres://r3user:r3password@localhost:5432/r3carbon`
