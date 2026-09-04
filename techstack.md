# Tech Stack — Public Issue Resolution Tracker

## Overview

This project uses a fast, JavaScript-first stack suited to a hackathon: React and Tailwind CSS for the interface, with Firebase providing authentication, database, file storage, and hosting.

## Frontend

### Core

| Technology | Purpose |
| --- | --- |
| Vite | Fast development server and production build tool |
| React | Component-based user interface |
| JavaScript | Frontend application language |
| Tailwind CSS | Utility-first responsive styling |

### Recommended Libraries

| Library | Purpose |
| --- | --- |
| React Router | Client-side pages and protected routes |
| Firebase SDK | Connect the application to Firebase services |
| React Hook Form | Manage report and status-update forms |
| Zod | Form validation schemas |
| Lucide React | Accessible interface icons |
| Sonner | Toast notifications for actions and errors |

## Backend and Cloud Services

Firebase provides the backend services for the MVP, so a separate server is not required initially.

| Technology | Purpose |
| --- | --- |
| JavaScript | Cloud Function logic and Firebase integration |
| Firebase Authentication | Citizen, officer, and administrator sign-in |
| Cloud Firestore | Store users, issues, departments, updates, and duplicate links |
| Firebase Storage | Store issue and resolution evidence images |
| Cloud Functions for Firebase | Run privileged operations, duplicate scoring, and server-side validation |
| Firebase Hosting | Deploy the Vite production build |

## Data Design in Firestore

| Collection | Contents |
| --- | --- |
| `users` | Profile data and role: `CITIZEN`, `OFFICER`, or `ADMIN` |
| `issues` | Core report details, status, priority, assignment, and tracking ID |
| `departments` | Department names and descriptions |
| `issueUpdates` | Timestamped public status updates linked to an issue |
| `evidence` | Evidence metadata and Firebase Storage URLs |
| `duplicateIssues` | Links between primary and duplicate reports with similarity scores |

## Architecture

```text
React + Vite + Tailwind CSS
            |
            v
      Firebase SDK
       |     |      |
       v     v      v
    Auth  Firestore Storage
              |
              v
      Cloud Functions
  (duplicate scoring, secure actions)
```

## Key Implementation Choices

- Use Firebase Authentication custom claims or Firestore role documents for role-based access.
- Enforce permissions with Firestore Security Rules and Storage Security Rules.
- Run duplicate detection in a Cloud Function so the logic is consistent and protected.
- Use Firestore real-time listeners for live status updates where useful.
- Store only file paths and metadata in Firestore; keep actual images in Firebase Storage.

## Suggested Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── issues/
│   ├── dashboard/
│   └── ui/
├── pages/
│   ├── Home.jsx
│   ├── ReportIssue.jsx
│   ├── PublicIssues.jsx
│   ├── IssueDetails.jsx
│   ├── TrackIssue.jsx
│   ├── AdminDashboard.jsx
│   └── OfficerDashboard.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   ├── firebase.js
│   ├── authService.js
│   ├── issueService.js
│   ├── evidenceService.js
│   └── duplicateService.js
├── hooks/
├── utils/
├── App.jsx
└── main.jsx

functions/
├── index.js
└── package.json
```

## MVP Deployment

1. Create a Firebase project and enable Authentication, Firestore, Storage, Functions, and Hosting.
2. Build the React application with Vite.
3. Deploy the frontend to Firebase Hosting.
4. Deploy Cloud Functions for duplicate detection and privileged administrative actions.

## Why This Stack

- It is quick to set up and avoids maintaining a separate backend server.
- Firebase bundles the database, authentication, storage, deployment, and real-time updates needed by the MVP.
- React, Vite, JavaScript, and Tailwind CSS allow rapid interface iteration during the hackathon.
