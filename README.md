# RESQ — Emergency Hotline Directory

A full-stack emergency hotline directory built with Angular, Node.js, Express, and MongoDB Atlas. Includes a public directory and an admin dashboard for managing hotlines.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [Angular CLI](https://angular.dev/tools/cli)
  ```bash
  npm install -g @angular/cli
  ```

---

## Environment Setup
Create a `.env` file inside the `backend/` folder:

```
AWEB-Finals/
└── backend/
    └── .env   ← create this file
```

Add the following to your `.env` file:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/hotline_db
PORT=3000
```

To get your `MONGO_URI`:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free account
2. Create a free cluster (M0)
3. Go to **Database Access** → Add a database user with a username and password
4. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Go to your cluster → Click **Connect** → **Drivers**
6. Copy the connection string and replace `<username>` and `<password>` with your credentials

---

## Installation
### 1. Install backend dependencies
```bash
cd backend
npm install
```

### 2. Install frontend dependencies
```bash
cd ..
npm install
```

---

## Database Seeding

You need to seed the database before running the app.

### Step 1 — Set your admin credentials
Open `backend/src/seed-user.ts` and change the username and password:

```typescript
const ADMIN_USERNAME = 'your_username';   // ← change this
const ADMIN_PASSWORD = 'your_password';   // ← change this
```

### Step 2 — Seed hotline data
```bash
cd backend
npx ts-node src/seed.ts
```
You should see:
```
Connected to MongoDB Atlas
Seeded 16 hotlines successfully!
```

### Step 3 — Seed admin user
```bash
npx ts-node src/seed-user.ts
```
You should see:
```
Connected to MongoDB Atlas
Admin user "your_username" created successfully!
```

> Only run the seed scripts **once**. Running them again will overwrite existing data.

---

## Running the Application

You need **two terminals** open at the same time.

### Terminal 1 — Start Backend
```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB Atlas
Backend running at http://localhost:3000
```

### Terminal 2 — Start Frontend
```bash
ng serve
```

Then open your browser and go to:
```
http://localhost:4200
```

---

## Admin Access

Go to `http://localhost:4200/admin` and sign in with the credentials you set in `seed-user.ts`.

---

## Features

- Emergency hotline directory with search and category filters
- Save contacts as `.vcf` files
- Admin login authenticated via MongoDB
- Full hotline CRUD (Create, Read, Update, Delete)
- Categories: Police, Fire, Hospital, Ambulance, Barangay
- Data stored in MongoDB Atlas (cloud)

---

## Notes

- Both the backend and frontend must be running at the same time
- The backend runs on port `3000`, the frontend on port `4200`

---

## Tech Stack

- **Frontend** — Angular 19, Tailwind CSS
- **Backend** — Node.js, Express, TypeScript
- **Database** — MongoDB Atlas
- **Auth** — bcrypt password hashing