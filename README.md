

---

# 🧾 Form Management System

A **full-stack web application** for managing form entries using **Google OAuth login**, **JWT authentication**, and **role-based access control**. Built with the **MERN stack** and deployed on **Vercel (Frontend)** and **Render (Backend)**.

---

## ✅ What It Is

This app allows users to log in via **Google**, and based on their role (**admin** or **guest**), they can either:

- ✅ **View** form entries *(guest)*
- ✏️ **Create, edit, delete** form entries *(admin)*

👉 **Live URLs:**
- 🔗 Frontend: [https://booking-list-assignment-intern.vercel.app](https://booking-list-assignment-intern.vercel.app)
- 🔗 Backend: [https://booking-list-assignment-intern.onrender.com](https://booking-list-assignment-intern.onrender.com)

---

## 🛠 Technologies Used

### 🧠 Frontend (React.js)
- React.js (Functional Components + Hooks)
- React Router DOM
- Material UI (MUI)
- Google OAuth via `@react-oauth/google`

### 🧰 Backend (Node.js + Express)
- Express.js
- MongoDB with Mongoose
- Passport.js (Google OAuth strategy)
- JSON Web Token (JWT)
- Role-based middleware

### 🛠 Other Tools
- dotenv (for environment variables)
- CORS (Cross-Origin Resource Sharing)
- Render (for backend deployment)
- Vercel (for frontend deployment)

---

## 🔄 How It Works (Flow)

1. 🔐 **Login**
   - User logs in via Google on the frontend
   - Token is sent to backend
   - Backend validates Google token → creates user → issues a JWT token

2. 🪪 **Token Storage**
   - JWT is stored in browser localStorage
   - Sent in headers for every protected API request

3. 👮 **Role Assignment**
   - Admin manually assigns a role (`admin` or `guest`) using `/set-role`

4. 🔐 **Protected Routes**
   - Middleware verifies JWT
   - Role-based access control ensures only admins can write/edit/delete

5. 📋 **Form Management**
   - Admins can add, update, delete forms
   - Guests can only read form data

---

## 🎯 Purpose

- ✅ Practice real-world authentication (Google OAuth + JWT)
- ✅ Demonstrate role-based access control (RBAC)
- ✅ Build a complete MERN CRUD app with protected APIs

---

## 🔐 Routes & Access Control

### 🔑 Auth Routes

| Method | Route                     | Auth Required | Role     | Description                        |
|--------|---------------------------|----------------|----------|------------------------------------|
| GET    | `/auth/google`            | ❌ No          | -        | Starts Google OAuth login          |
| GET    | `/auth/google/callback`   | ❌ No          | -        | Handles Google OAuth callback      |
| POST   | `/set-role`               | ✅ Yes         | Any      | Sets the role (admin/guest)        |

---

### 📄 Form Routes

| Method | Route               | Auth Required | Role     | Description                         |
|--------|---------------------|---------------|----------|-------------------------------------|
| GET    | `/forms`            | ✅ Yes        | Any      | Get all forms                       |
| POST   | `/forms`            | ✅ Yes        | Admin    | Add a new form                      |
| PUT    | `/forms/:id`        | ✅ Yes        | Admin    | Edit form by ID                     |
| DELETE | `/forms/:id`        | ✅ Yes        | Admin    | Delete form by ID                   |

---

## 🌍 Environment Variables

### 📁 `.env` (Backend)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://booking-list-assignment-intern.onrender.com/auth/google/callback
````



---

## ▶️ How to Run Locally

### 🧪 Backend

```bash
cd backend
npm install
npm run dev
```

### 💻 Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Deployed Links

* 🌐 **Frontend**: [https://booking-list-assignment-intern.vercel.app](https://booking-list-assignment-intern.vercel.app)
* ⚙️ **Backend**: [https://booking-list-assignment-intern.onrender.com](https://booking-list-assignment-intern.onrender.com)

---

## 👨‍💻 Author

**Mohd Saif Khan**

> A MERN stack project demonstrating secure, role-based CRUD functionality with clean frontend and backend separation.

---
