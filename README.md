# User Management System

## Project Overview & Purpose

This project is a **User Management System** built as part of the **Purple Merit Technologies technical assessment**.

The application provides a secure authentication system with **role-based access control**. Users can log in, manage their profiles, update personal information, and change passwords. Admin users have additional access to admin-only dashboards and user management views.

The system focuses on:
- Secure authentication
- Clean and responsive UI
- Proper authorization
- Scalable backend architecture

---

## Tech Stack Used

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **Axios**
- **Zustand** (State Management)
- **React Hook Form**
- **Zod** (Validation)
- **React Hot Toast**

### Backend
- **Node.js**
- **Express.js**
- **Postgress**
- **Prisma**
- **JWT (JSON Web Token)**
- **bcrypt** (Password Hashing)
- **CORS**
- **ZOD**

### Tools & Utilities
- Git & GitHub
- Postman (API Testing)
- Nodemon

---

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>

---
### Backend setup 
cd backend
npm install

### backend/.env
PORT=
DATABASE_URL=
JWT_SECRET=


npm run dev

## run on this url
http://localhost:4000


### Frotend setup
cd frontend
npm install
npm run dev

## run on this url

http://localhost:3000


##Authentication & Authorization

JWT-based authentication
Passwords are securely hashed using bcrypt
Protected routes require a valid JWT token
Role-based authorization:
Admin-only routes restricted to ADMIN users
Users cannot access admin pages
Unauthorized users are redirected to login


##Features

Authentication
Login with email and password
Secure JWT token handling
Logout functionality with token removal
Navigation Bar
Displays logged-in user name and role
Role-based menu options
Logout button
User Profile
View profile details
Update name and email
Change password
View role and account status
Success and error notifications
Fully responsive UI
Admin Dashboard
View list of users
Role-based access
Protected admin routes



## Testing

Backend logic tested with unit tests
APIs verified using Postman
Validation handled using Zod
Deployment Instructions
Backend Deployment
npm start


## Deployment Instructions
Can be deployed on:

Render
Railway
AWS EC2

Frontend Deployment
npm run build
npm start


Can be deployed on:

Vercel
Netlify


## Author
Sanuj Kumar
Full Stack Developer
Purple Merit Technologies Technical Assessment


