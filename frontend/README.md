# 🎟️ Redeem System — Next.js + Node.js + Prisma + PostgreSQL

A full-stack **Redeem Code Management System** built using **Next.js (TypeScript)** for frontend and **Node.js + Express + Prisma + PostgreSQL** for backend.  
It includes role-based authentication (Admin/User), redeem code generation, redemption tracking, and a beautiful dashboard with responsive UI and smooth animations.

---

## 🚀 Features

### 👨‍💼 Admin
- Generate new redeem codes (with type, limit, and expiry date)
- View redemption history of all users
- Manage and track active/expired codes

### 👤 User
- Redeem codes using a clean and interactive form
- See instant feedback via toast notifications
- View personal redemption history

### 🔐 Authentication
- Role-based access (Admin/User)
- JWT-based authentication and authorization
- Auto role persistence after login (Navbar updates on refresh)

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js 14 (TypeScript, App Router)
- TailwindCSS + ShadCN UI Components
- Zustand (for global role state)
- React Hot Toast (for notifications)
- Axios (API integration)

### **Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL (Database)
- JWT Authentication
- Bcrypt (for password hashing)

---

## ⚙️ Setup Instructions

Role Persistence (Navbar Refresh Issue)

To ensure the correct dashboard (Admin/User) shows after refresh:

The role is saved in Zustand store and synchronized with localStorage.

On page refresh, the app rehydrates the role automatically.

The Navbar updates instantly to show the correct dashboard buttons.


