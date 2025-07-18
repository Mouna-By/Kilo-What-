# ⚡ Kilo-What? – Smart Energy Tracker

**Kilo-What?** is a full-stack web application that allows users to track and analyze their **electricity, water, and gas consumption** in a secure and personalized way. The platform offers dashboards, charts, PDF reports, and admin tools to monitor energy use over time.

---

## 🚀 Features

### 👤 User Features
- Secure **authentication** (register/login with JWT)
- Add, edit, and delete **personal energy consumption** entries
- View personalized **dashboard with statistics**
- Analyze **monthly trends** with interactive charts
- Export data as **PDF reports**

### 🛠️ Admin Features
- Secure **admin login** (role-based access)
- Admin-only **user management panel**
- View, edit, or delete users (future extensions possible)

---
## 🧰 Tech Stack

### 🔵 Frontend
- React.js
- Redux Toolkit
- React Router
- Bootstrap & Custom CSS
- Recharts
- html2pdf.js

### 🟢 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing

---

## 🔐 Role-Based Access

| Role   | Access                  |
|--------|-------------------------|
| User   | Dashboard, Consumption  |
| Admin  | Admin Panel Only        |

> Admins are created manually via MongoDB or Postman.



