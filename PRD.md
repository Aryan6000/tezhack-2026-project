# Product Requirements Document: Public Issue Resolution Tracker

## 1. Product Summary

The Public Issue Resolution Tracker is a web platform that lets citizens report civic issues, identify potentially duplicate reports, and follow resolution progress publicly. Department officers and administrators can triage reports, assign responsibility, update progress, and publish resolution evidence.

The hackathon MVP prioritizes transparent issue tracking and duplicate-report linking so that citizens can see when an issue is already receiving attention instead of submitting fragmented, invisible complaints.

## 2. Problem Statement

Public complaints are often hard to report, easy to duplicate, and difficult to track. Citizens typically do not know whether an issue has already been reported, which department owns it, or whether work is underway. Authorities meanwhile receive repeated reports without a clear way to group them and communicate progress.

## 3. Goals

- Let a citizen submit a public civic issue with a category, location, and description.
- Detect and surface possible duplicate reports before submission.
- Preserve duplicate reports by linking them to an existing issue; never silently discard them.
- Give administrators a simple workflow to prioritize and assign issues.
- Give officers a way to publish status updates and resolution evidence.
- Make an issue's status history visible to the public.

## 4. Non-Goals for the Hackathon MVP

- Integration with real government ticketing systems.
- Automated legal escalation, payment, or enforcement workflows.
- Guaranteed real-time notifications.
- Advanced machine-learning duplicate detection.
- Full multilingual support and native mobile applications.

## 5. Users and Roles

| Role | Primary need | Permissions |
| --- | --- | --- |
| Citizen | Report and track public issues | Create issues, view possible duplicates, browse public issues, view status timelines |
| Department Officer | Resolve assigned issues | View assigned issues, post updates, change status, add resolution evidence |
| Administrator | Triage and manage the system | View all issues, assign departments, set priority, manage duplicate links, view dashboard metrics |

## 6. Core User Flows

### 6.1 Citizen reports an issue

1. Citizen opens **Report an Issue**.
2. Citizen enters a title, category, location, description, and optional evidence.
3. The system checks for similar existing issues.
4. If matches are found, the system displays them with similarity, location, and current status.
5. The citizen can view an existing issue or continue with a new report.
6. On submission, the system creates an issue and displays a tracking ID.

### 6.2 Administrator triages an issue

1. Administrator opens the dashboard and reviews new issues.
2. Administrator sets a priority and assigns a department.
3. The system records the assignment as a visible timeline update.
4. The assigned officer can now work on the issue.

### 6.3 Officer updates resolution progress

1. Officer opens assigned issues.
2. Officer changes the status and adds a plain-language update.
3. Officer optionally uploads resolution evidence when resolving the issue.
4. The public issue page shows the updated timeline.

### 6.4 Citizen tracks progress

1. Citizen searches using a tracking ID or opens a public issue.
2. Citizen sees the category, location, priority, assigned department, status, and timeline.
3. If the report is linked as a duplicate, the citizen can navigate to the primary issue.

## 7. Functional Requirements

### 7.1 Authentication and access control

- The system must support Citizen, Officer, and Administrator roles.
- Officers may access only their assigned issues unless also an administrator.
- Administrators may manage every issue and department assignment.
- Public issue pages must be viewable without authentication.

### 7.2 Issue submission

- The report form must collect: title, category, location, and description.
- The form must allow optional image evidence.
- Category options must include at least Roads & Infrastructure, Sanitation, Electricity, Water, and Other.
- The system must validate required fields before submitting.
- A successful submission must create a unique tracking ID and default to `SUBMITTED` status.

### 7.3 Duplicate detection and grouping

- The system must check potential duplicates before an issue is created.
- Matching must consider category, location, and description similarity.
- The MVP duplicate score should use a transparent weighted calculation:

  - Location similarity: 40 points
  - Category match: 30 points
  - Description similarity: 30 points

- A score of 70% or higher must be shown as a possible duplicate.
- The warning must provide **View Existing Issue** and **Continue Anyway** actions.
- Continuing anyway must retain the submitted report and link it to the selected primary issue when applicable.

### 7.4 Issue management

- Administrators must be able to set priority: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`.
- Administrators must be able to assign an issue to a department.
- Officers and administrators must be able to add timeline updates.
- Status changes must support: `SUBMITTED`, `ACKNOWLEDGED`, `IN_PROGRESS`, `RESOLVED`, and optional `CLOSED`.
- Each update must record the author, timestamp, status, and message.

### 7.5 Public issue discovery and tracking

- Users must be able to browse public issues.
- The public list must support filtering by category, location, status, and priority.
- An issue details page must show core issue data, evidence, current status, assigned department, and a chronological timeline.
- A tracking page must allow lookup by tracking ID.

### 7.6 Dashboards

- The administrator dashboard must show total issues and counts by status.
- The dashboard must show recent issues with their department and status.
- The officer dashboard must list assigned issues with priority and current status.

## 8. User Stories and Acceptance Criteria

| ID | User story | Acceptance criteria |
| --- | --- | --- |
| US-01 | As a citizen, I want to report an issue so authorities can act on it. | Required fields validate; successful submission returns a tracking ID and creates a `SUBMITTED` issue. |
| US-02 | As a citizen, I want to know whether an issue already exists. | The form displays potential matches at or above 70% similarity before final submission. |
| US-03 | As a citizen, I want duplicate reports to remain visible. | A continued report is saved and can be linked to a primary issue; it is not deleted. |
| US-04 | As an administrator, I want to assign and prioritize issues. | An administrator can select a department and priority, and the issue reflects both immediately. |
| US-05 | As an officer, I want to post progress updates. | An assigned officer can add a status and message that appears on the public timeline. |
| US-06 | As a citizen, I want to track an issue. | A public details page shows the issue's current status and chronological updates. |

## 9. Data Model

| Entity | Essential fields |
| --- | --- |
| Users | id, name, email, password hash, role, created_at |
| Issues | id, tracking_id, title, description, category, location, latitude, longitude, priority, status, created_by, department_id, created_at |
| Departments | id, name, description |
| Issue Updates | id, issue_id, status, message, created_by, created_at |
| Evidence | id, issue_id, file_url, uploaded_by, created_at |
| Duplicate Issues | id, original_issue_id, duplicate_issue_id, similarity_score, created_at |

## 10. Key Screens

- **Landing page:** value proposition, report CTA, track CTA, and recent public issues.
- **Report issue:** report form with inline duplicate warning or modal.
- **Public issues:** filterable issue list.
- **Issue details:** issue facts, evidence, assigned department, duplicate links, and status timeline.
- **Track issue:** tracking-ID lookup with a direct path to issue details.
- **Admin dashboard:** metrics, recent issues, assignment, priority, and duplicate management.
- **Officer dashboard:** assigned issue queue and update form.

## 11. Technical Direction

Suggested hackathon stack:

- Frontend: Vite, React, TypeScript, Tailwind CSS.
- Client tooling: React Router, TanStack Query, React Hook Form, Zod, and Lucide React.
- Backend and data: Supabase for PostgreSQL, authentication, storage, and APIs; or Node.js/Express with PostgreSQL and Prisma.
- Authentication: Supabase Auth for speed, or JWT with bcrypt for a custom backend.

## 12. API Surface (if using a custom backend)

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/issues/check-duplicates` | Return possible duplicate issues and scores |
| POST | `/api/issues` | Create an issue |
| GET | `/api/issues` | List/filter public issues |
| GET | `/api/issues/:id` | Get issue details |
| PATCH | `/api/issues/:id` | Update issue metadata, priority, or status |
| PATCH | `/api/issues/:id/assign` | Assign a department |
| POST | `/api/issues/:id/updates` | Add a status update |

## 13. Quality, Safety, and Privacy Requirements

- Protect administrative and officer actions with role-based authorization.
- Validate and sanitize all user input.
- Restrict uploaded evidence to safe file types and sizes.
- Do not expose private account information on public issue pages.
- Display user-facing status updates in clear, non-technical language.
- Make status, priority, and form controls accessible by keyboard and understandable without color alone.

## 14. MVP Success Criteria

The hackathon MVP is complete when the team can demonstrate this end-to-end journey:

1. A citizen reports a pothole near Assam Engineering College.
2. The system detects an existing similar pothole report and shows the duplicate warning.
3. The citizen views the existing report or submits and links a new report.
4. An administrator assigns the Roads Department and sets priority to `HIGH`.
5. An officer changes the issue to `IN_PROGRESS` and posts an inspection update.
6. The public issue page displays the full progress timeline.

## 15. Delivery Plan

| Phase | Outcome |
| --- | --- |
| 1. Foundation | Project setup, database, authentication, and roles |
| 2. Reporting | Issue form, storage, issue list, and details page |
| 3. Duplicate detection | Similarity scoring, warning UI, and duplicate links |
| 4. Operations | Admin assignment/priority controls and officer updates |
| 5. Demo polish | Public tracking timeline, seeded demo data, responsive UI, and presentation flow |

## 16. Nice-to-Have Enhancements

- Map-based location selection and issue browsing.
- Email or in-app notifications for status changes.
- Real-time dashboard and timeline updates.
- AI or embedding-based duplicate detection.
- Analytics for resolution time, category trends, and department workload.
- Multilingual citizen experience.
