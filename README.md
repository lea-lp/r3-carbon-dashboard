# 🌱 R3 Carbon Dashboard

Projet réalisé dans le cadre de ma candidature au [poste de **Développeuse Fullstack**](https://www.welcometothejungle.com/fr/companies/r3-group/jobs/developpeur-se-fullstack-nantes_nantes) chez [R3 Group](https://www.r3.fr/).

L'objectif : construire un mini dashboard de visualisation de facteurs d'émission carbone
en utilisant la stack technique de [R3](https://www.r3.fr/), sur un sujet au cœur de leur métier.

---

## 🎯 Démarche

En sortant d'une année de formation intensive sur Unreal Engine et Blender,
je retourne au développement web avec l'envie de monter en compétence côté backend.
Plutôt que de simplement le dire en entretien, j'ai préféré le montrer.

Ce projet m'a permis de :
- Prendre en main **NestJS** et **TypeORM** pour la première fois
- Mettre en place une **BDD PostgreSQL** via Docker
- Concevoir et exposer des **API REST** depuis zéro
- Consommer ces APIs avec **React Query** et **Axios**
- Utiliser **Chakra UI** et **Recharts** pour la dataviz

Les données utilisées proviennent de la **Base Empreinte® de l'ADEME**,
référence officielle des facteurs d'émission carbone en France —
la même base qu'utilisent les outils de R3 pour les bilans carbone.

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18, TypeScript, Vite |
| UI | Chakra UI |
| Data fetching | TanStack React Query + Axios |
| DataViz | Recharts |
| Backend | NestJS, TypeScript |
| ORM | TypeORM |
| Base de données | PostgreSQL 16 |
| Infrastructure | Docker, Docker Compose |
| Versioning | Git, GitHub |

---

## 🌐 Demo

👉 [Voir le dashboard en ligne](https://superb-dream-production-30f9.up.railway.app/)

**API** : `https://r3-carbon-dashboard-production.up.railway.app/`

---

## 📡 Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/sectors` | Liste tous les secteurs |
| GET | `/sectors/:id` | Détail d'un secteur |
| GET | `/emissions` | Liste tous les facteurs d'émission |
| GET | `/emissions?sectorId=xxx` | Facteurs filtrés par secteur |
| GET | `/emissions/:id` | Détail d'un facteur d'émission |

---

## 📊 Données

Les facteurs d'émission sont issus de la **Base Empreinte® ADEME 2026**,
exprimés en **kgCO₂e** (kilogrammes d'équivalent CO₂) par unité fonctionnelle.

5 secteurs couverts : Transport · Énergie · Agriculture · Industrie · Bâtiment

---

## 💡 Pistes d'évolution

- Connexion directe à l'API Base Empreinte ADEME pour des données en temps réel
- Ajout d'un simulateur de bilan carbone simplifié
- Authentification utilisateur
- Export PDF du dashboard
- Tests unitaires backend (Jest) et frontend (Vitest)

---

## 👩‍💻 Auteure

**Léa Leipp** — Développeuse Front-End Senior | En transition vers le Fullstack  
[linkedin.com/in/lea-leipp](https://linkedin.com/in/lea-leipp) · lea.leipp@gmail.com