# 🔖 Smart Bookmark App

Smart Bookmark App is a full-stack web application that allows users to save and organize bookmarks using folders.  
The goal of this project was not only to build a useful product, but also to deeply understand **authentication, real-time updates** in a modern Next.js application.

🌐 Live Demo: https://smart-bookmark-app-hemanth.vercel.app/

---

## ❓ Problem Statement

Most bookmark tools are either:
- Browser-specific
- Not private
- Lack organization (folders, search)
- Do not update in real time

I wanted to build a **simple, cloud-based bookmark manager** where:
- Users authenticate using Google
- Each user sees only their own data
- Bookmarks can be organized into folders
- UI updates instantly without refresh

---

## 🧠 Key Challenges & How I Solved Them

### 1. Google Authentication & Redirect Issues
**Problem:**  
After Google login, users were sometimes redirected to an unexpected Supabase URL or not redirected properly.

**Solution:**  
- Used Supabase OAuth with `redirectTo`
- Set correct environment variables (`NEXT_PUBLIC_URL`)
- Handled auth state using `onAuthStateChange`
- Implemented route protection using `useCurrentUser`

---

### 2. Protecting Routes (Auth Guard)
**Problem:**  
Unauthenticated users could access `/bookmark` directly.

**Solution:**  
- Created a reusable `useCurrentUser` hook
- Redirected unauthenticated users to the home page
- Redirected authenticated users away from public pages

---

### 3. User-Specific Data (Privacy)
**Problem:**  
Ensuring User A cannot see User B’s folders or bookmarks.

**Solution:**  
- Stored `user_id` with every folder and bookmark
- Queried data using `user_id = currentUser.id`
- Used Supabase Row Level Security (RLS)

---

### 4. Folder-Bookmark Relationship
**Problem:**  
When creating a bookmark, users needed the option to select a folder.

**Solution:**  
- Fetched user-specific folders from Supabase
- Allowed selecting a folder in the bookmark modal
- Stored `folder_id` in the bookmark table
- Displayed bookmarks based on selected folder

---

### 5. Real-Time UI Updates
**Problem:**  
Bookmarks and folders did not update instantly across tabs.

**Solution:**  
- Used Supabase real-time subscriptions
- Updated UI state on insert/delete events
- Avoided full page refreshes

---


## 🚀 Features

- 🔐 Google OAuth (Supabase)
- 👤 Private, user-scoped bookmarks
- 📁 Folder creation & management
- 🔖 Bookmark creation with folder selection
- 🔄 Real-time updates
- 📱 Responsive UI
- ⚡ Fast performance

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend / Services**
- Supabase (Auth, DB, Realtime)
- PostgreSQL

---
