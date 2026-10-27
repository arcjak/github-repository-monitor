# GitHub Repository Monitor

A full-stack application built with TypeScript, Express, and React that retrieves GitHub repository information and allows users to maintain a temporary watchlist.

## Features

- Search public GitHub repositories by owner and repository name.
- Display repository descriptions, stars, forks, and programming languages.
- Add and remove repositories from an in-memory watchlist.
- Display loading indicators and API errors.
- Validate GitHub API responses using Zod.
- Automated backend testing with Vitest and Supertest.

## Technology Stack

**Frontend:** React, TypeScript, Vite

**Backend:** Node.js, Express, TypeScript

**API:** GitHub REST API

**Validation:** Zod

**Testing:** Vitest, Supertest

## Running Locally

### Backend

From the project root:

```bash
npm install
npm run dev
```

The backend runs at `http://localhost:3000`.

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Testing

From the project root:

```bash
npx vitest run
```

To build the frontend:

```bash
cd frontend
npm run build
```

## Limitations

- The frontend watchlist is stored in React state and resets when the page refreshes.
- No user authentication or database persistence.
- The application currently runs locally.
- Additional backend reporting functionality is not exposed through the frontend.

## Purpose

This project was developed to practice full-stack TypeScript development, REST API integration, asynchronous programming, React state management, component composition, validation, and automated testing.