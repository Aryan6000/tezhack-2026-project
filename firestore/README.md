# Firestore Setup Guide

## 1. Security Rules
Paste `firestore.rules` content into:
**Firebase Console → Firestore → Rules → Edit rules → Publish**

## 2. Indexes
Paste `firestore.indexes.json` content into:
**Firebase Console → Firestore → Indexes → Add composite index**

Or deploy via CLI:
```bash
firebase deploy --only firestore
```

## 3. Admin User Setup (REQUIRED)
After creating admin account in Firebase Auth, manually create a Firestore document:

Collection: `users`
Document ID: `<admin_uid>` (copy from Firebase Auth → Users → UID column)

Fields:
```
uid       (string)  → same as document ID
email     (string)  → admin@yourdomain.com
fullName  (string)  → Admin
role      (string)  → admin
```

Without this document, admin login will show "Access denied".

## 4. Storage Rules
Paste into Firebase Console → Storage → Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /complaint-images/{allPaths=**} {
      allow read:  if true;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```
