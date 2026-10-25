# Deep Tanawala — Interactive Full-Stack Developer Portfolio

> **Master of Computer Applications (MCA) Student | Aspiring Java Backend Developer & Software Engineer**  
> Location: Surat, Gujarat, India  
> LinkedIn: [tanawala-deep](https://www.linkedin.com/in/tanawala-deep-05a111399) • GitHub: [tanawaladeep](https://github.com/tanawaladeep) • Email: [deeptanawala2006@gmail.com](mailto:deeptanawala2006@gmail.com) • Phone: +91 7990233764

---

## 🌟 Executive Summary

This repository contains a modern, production-grade developer portfolio built specifically for **Deep Tanawala**, an MCA student specializing in **Core Java, Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Relational Database Management Systems (DBMS / SQL), and RESTful Backend Architecture**.

The portfolio features an editorial dark charcoal design, interactive live Java compilation & benchmark simulation, full-stack REST API with MongoDB persistence, strict Zod schema validations, and spam rate limiting.

---

## 🏗️ Architecture & Monorepo Structure

```
portfolio/
├── client/                     # Frontend Application (React + Vite + TypeScript)
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProjectModal, CodeSnippetPreview, StatusBadge, etc.
│   │   ├── sections/           # Hero, About, Skills, Projects, Education, Roadmap, Contact
│   │   ├── hooks/              # useScrollSpy, usePrefersReducedMotion
│   │   ├── services/           # api.ts (Backend REST API client with fallback resilience)
│   │   ├── data/               # portfolioData.ts, skillsData.ts
│   │   ├── types/              # index.ts (Full TypeScript models)
│   │   ├── App.tsx             # Main layout with Lenis smooth scrolling & scroll spy
│   │   ├── main.tsx            # React root mount
│   │   └── index.css           # Tailwind base, utilities, mesh grid, & custom glassmorphism
│   ├── tailwind.config.js      # Custom theme, Java amber accents, dark surface tokens
│   ├── tsconfig.json           # Strict TypeScript bundler configuration
│   └── package.json
│
├── server/                     # Backend Application (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/             # db.ts (MongoDB Mongoose connection with fallback)
│   │   ├── models/             # Project.ts, Contact.ts (Mongoose schemas)
│   │   ├── controllers/        # projectController.ts, contactController.ts
│   │   ├── routes/             # projectRoutes.ts, contactRoutes.ts
│   │   ├── validators/         # contactValidator.ts (Zod schemas)
│   │   ├── middleware/         # errorHandler.ts, rateLimiters
│   │   ├── data/               # seedProjects.ts (Initial auto-seeding project catalog)
│   │   ├── app.ts              # Express setup, Helmet, CORS, and route registration
│   │   └── server.ts           # Server bootstrap & graceful shutdown
│   ├── tsconfig.json
│   ├── .env.example            # Environment variable template
│   └── package.json
│
├── .gitignore
├── README.md                   # Complete documentation & deployment guide
└── package.json                # Root package for running concurrently
```

---

## ⚡ Tech Stack

### Frontend
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v3 with custom dark theme, glassmorphism, glowing accents & grid mesh
- **Animations**: Motion for React (framer-motion) + Lenis smooth scrolling (respects `prefers-reduced-motion`)
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Icons**: Lucide React + custom SVG GitHub & LinkedIn vectors

### Backend
- **Runtime & Framework**: Node.js + Express.js (TypeScript)
- **Database**: MongoDB with Mongoose ODM (includes fallback if DB is temporarily offline)
- **Validation**: Zod (strict runtime schema parsing on all requests)
- **Security**: Helmet HTTP headers, CORS origin whitelisting, Express Rate Limit (5 requests per 15 min on contact form)

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection URI (optional; server falls back gracefully if offline)

### 2. Installation
Clone or navigate to the repository folder:
```bash
# In the repository root directory
npm install
npm install --prefix client --legacy-peer-deps
npm install --prefix server
```

### 3. Environment Variables
Create a `.env` file inside the `server/` folder (or copy `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/deep_tanawala_portfolio
CLIENT_URL=http://localhost:5173
```

### 4. Running the Applications

#### Option A: Run Both Frontend & Backend Concurrently (Recommended)
```bash
npm run dev
```

#### Option B: Run Individually
In one terminal (Backend on `http://localhost:5000`):
```bash
npm run dev:server
```
In a second terminal (Frontend on `http://localhost:5173`):
```bash
npm run dev:client
```

---

## 📡 REST API Reference

### Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "service": "Deep Tanawala Developer Portfolio API",
  "uptime": 42.5,
  "database": "connected",
  "version": "1.0.0",
  "developer": {
    "name": "Deep Tanawala",
    "role": "MCA Student | Aspiring Java Backend Developer",
    "github": "https://github.com/tanawaladeep",
    "linkedin": "https://www.linkedin.com/in/tanawala-deep-05a111399"
  }
}
```

### Get All Projects
- **Endpoint**: `GET /api/projects`
- **Response**: Returns JSON list of projects sourced directly from MongoDB or static fallback. Configured with Deep Tanawala's authentic GitHub repositories (`https://github.com/tanawaladeep`):
  1. **QR Code Generator Android App** (`tanawaladeep/QR-Code-Generator-Android-App`)
  2. **Android Multi-Module Application Suite (Task 2 to 6)** (`tanawaladeep/Task-2--6-`)
  3. **Expense Tracker Mobile App** (`tanawaladeep/Task-2--6-/ExpenseTrackerApp`)
  4. **Weather Forecast Mobile App** (`tanawaladeep/Weather-Forecast-App`)
  5. **E-Commerce Product Catalog App** (`tanawaladeep/Task-2--6-/ECommerceProductCatalogApp`)

### Get Project by Slug
- **Endpoint**: `GET /api/projects/:slug`
- **Example**: `GET /api/projects/qr-code-generator-android-app`

### Submit Contact Message
- **Endpoint**: `POST /api/contact`
- **Rate Limit**: Max 5 requests per 15 minutes per IP
- **Payload**:
```json
{
  "name": "Tech Recruiter",
  "email": "recruiter@enterprise-tech.com",
  "subject": "Java Backend Internship Opportunity",
  "message": "Hello Deep, we reviewed your portfolio and would like to invite you for an interview."
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "Thank you! Your message has been received successfully. Deep will get back to you shortly.",
  "data": {
    "id": "6ade0294f99c...",
    "name": "Tech Recruiter",
    "email": "recruiter@enterprise-tech.com",
    "receivedAt": "2026-10-25T13:21:28.000Z",
    "storage": "mongodb"
  }
}
```

---

## 🧪 Testing with cURL / PowerShell

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Get projects
Invoke-RestMethod -Uri "http://localhost:5000/api/projects"

# Post contact form
$body = @{
  name = "HR Manager"
  email = "hr@company.com"
  subject = "Software Engineering Role"
  message = "We would love to discuss an entry-level Java backend role with you."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/contact" -Method POST -Body $body -ContentType "application/json"
```

---

## 🚢 Production Deployment Guide

### Frontend on Vercel
1. Link the repository to Vercel.
2. Set **Root Directory** to `client`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

### Backend on Render or Railway
1. Set **Root Directory** to `server`.
2. Set **Build Command** to `npm install && npm run build`.
3. Set **Start Command** to `npm start`.
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb+srv://<user>:<password>@cluster0.mongodb.net/portfolio`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`

---

## ✅ Quality & Verification Checklist

- [x] Responsive layout verified on Desktop, Tablet, and Mobile
- [x] Editorial typography with Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
- [x] Interactive Java code simulator with JVM execution output
- [x] Real-time MongoDB database connection with automatic seeding
- [x] Fallback resilience: client and server operate seamlessly whether database is online or offline
- [x] Client-side validation with React Hook Form + Zod
- [x] Server-side validation with Zod
- [x] Rate limiting (5 requests per 15 min) on contact form
- [x] Active section tracking via `useScrollSpy`
- [x] Accessible reduced-motion support via `usePrefersReducedMotion`
- [x] Production build passes with 0 errors (`npm run build:client` & `npm run build:server`)
- [x] Tested and verified with browser automation subagent
