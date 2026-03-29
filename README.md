# JobBoard MVP - Testing AI tools - playground

A full-stack job board application built with Next.js, Prisma, SQLite, and Tailwind CSS.

## Features

- 📋 Browse job listings with search and filter
- 🔍 Filter by job type, category, and location
- 📄 View detailed job descriptions
- ✍️ Apply to jobs with a cover letter
- 🏢 Post new job listings as an employer
- ⭐ Featured job highlighting

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Seed with sample data
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── jobs/          # Job CRUD API
│   │   └── applications/  # Application submission API
│   ├── jobs/[id]/         # Job detail page
│   │   └── apply/         # Job application page
│   ├── post-job/          # Post a new job page
│   └── page.tsx           # Home page with job listings
├── components/
│   ├── JobCard.tsx        # Job listing card
│   ├── SearchBar.tsx      # Search input component
│   ├── ApplyForm.tsx      # Job application form
│   └── PostJobForm.tsx    # Post a job form
└── lib/
    └── prisma.ts          # Prisma client singleton
```
