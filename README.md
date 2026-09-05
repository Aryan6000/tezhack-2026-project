# Public Issue Resolution Tracker

A modern civic engagement platform that helps citizens report local issues, spot duplicate complaints early, and track the progress of public service resolution.

Built for TezHack 2026, this application brings together citizen reporting, department triage, and public accountability in a single responsive web experience.

## Overview

The platform enables:

- Citizens to submit civic issues with category, severity, location, and optional evidence.
- Duplicate detection before submission to reduce repeated complaints.
- Real-time status tracking through a public issue timeline.
- Admin workflows for assignment, prioritization, and resolution actions.
- Department-level visibility into complaints that need attention.

## Problem it solves

Public complaints often get duplicated, remain invisible, and are difficult to track. This app creates a transparent system where citizens can report problems and follow how they are resolved, while agencies can manage requests more efficiently and responsibly.

## Key features

### For citizens
- Submit reports for roads, drainage, waste, lighting, parks, pollution, and other civic concerns
- Add supporting images and location information
- Check whether a similar issue already exists before final submission
- Track issue status using a unique complaint token
- View public issue progress and outcomes

### For administrators
- Review all complaints from a centralized dashboard
- Filter by status, category, and priority
- Set priority, severity, and department assignments
- Update issue progress and add admin notes
- Monitor trends across submitted and resolved issues

### For governance teams
- Reduce duplicate reporting noise
- Improve response transparency
- Create a better citizen feedback and resolution loop

## Tech stack

- React + Vite
- React Router
- Firebase Authentication
- Firestore Database
- Firebase Storage
- Tailwind CSS
- Framer Motion
- Lucide React

## Project structure

```bash
src/
├── components/
│   ├── Dropdown.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── admin/
│       └── AdminLayout.jsx
├── context/
│   ├── AdminAuthContext.jsx
│   └── AuthContext.jsx
├── lib/
│   └── firebase.js
├── pages/
│   ├── About.jsx
│   ├── Auth.jsx
│   ├── ExploreIssues.jsx
│   ├── Home.jsx
│   ├── ReportIssue.jsx
│   ├── TrackStatus.jsx
│   └── admin/
│       ├── Analytics.jsx
│       ├── Dashboard.jsx
│       ├── Departments.jsx
│       ├── Duplicates.jsx
│       ├── Login.jsx
│       ├── Priority.jsx
│       ├── ReportDetails.jsx
│       └── Reports.jsx
├── services/
│   └── complaintService.js
├── App.jsx
├── index.css
├── main.jsx
└── ...
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18 or later
- npm or yarn
- A Firebase project with:
  - Authentication enabled
  - Firestore enabled
  - Storage enabled

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd tezhack-2026-project
```

2. Install dependencies

```bash
npm install
```

3. Configure Firebase environment variables

Create a `.env` file in the root folder and add the following values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server

```bash
npm run dev
```

The app will be available at the local Vite URL shown in the terminal.

## Available scripts

```bash
npm run dev      # start local development server
npm run build    # create production build
npm run preview  # preview production build locally
npm run lint     # run ESLint checks
```

## Usage flow

1. A citizen visits the landing page.
2. They submit a civic issue with title, category, location, and description.
3. The app checks for similar problems and surfaces potential duplicates.
4. The issue is tracked through a complaint token.
5. Admins review, assign, and prioritize the complaint.
6. Responsible departments update the issue status until resolution.

## Application pages

- Home
- Report an Issue
- Explore Issues
- Track Status
- About
- Admin Login
- Admin Dashboard
- Admin Reports
- Duplicate Management
- Analytics and Priority Views

## Notes

This project is designed as a hackathon-ready MVP and focuses on functional civic reporting workflows with a polished front-end experience. It can be extended with advanced duplicate scoring, notifications, maps, analytics dashboards, and deeper backend automation.

## License

This project is currently unlicensed and intended for demonstration and hackathon use.

## Project context

This repository was created as part of the TezHack 2026 challenge and is structured to demonstrate a practical public service issue management platform.
