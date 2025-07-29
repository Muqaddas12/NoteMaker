# Notes Dashboard Frontend

This is the **frontend** of a responsive Notes Dashboard built with **React**, **Vite**, and **Tailwind CSS**. It allows users to:

* Sign up / Sign in using email and OTP (UI only)
* Create, edit, and delete notes
* Store notes locally in the browser (localStorage)
* Notes are stored per user (based on email, frontend only)

> 🔐 This project currently handles UI only. Backend integration (authentication & database) is under development.

---

## 📆 Tech Stack

* **React + Vite** (with React Router)
* **Tailwind CSS**
* **localStorage** for temporary note storage

---

## 🚀 Features

* Responsive layout for both desktop and mobile
* Sign Up / Sign In pages with OTP verification UI
* Dashboard with:

  * User welcome section
  * Create/Edit/Delete notes
  * Per-user note storage using localStorage
* Auth-based route protection (basic frontend logic)

---

## 🧱 Folder Structure

```
src/
├── assets/               # Images and logos
├── components/
│   ├── SignUp.jsx
│   ├── SignIn.jsx
│   ├── Dashboard.jsx
│   └── PrivateRoute.jsx
├── App.jsx
├── main.jsx
├── index.css
└── App.css
```

---

## 💪 Setup Instructions

1. **Clone this repo**

```bash
git clone https://github.com/Muqaddas12/NOTEMAKER.git
cd notes-dashboard-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the project** (Vite)

```bash
npm run dev
```

Frontend runs locally at: `http://localhost:5173`

---

## 🔧 Backend (Coming Soon)

* Authentication API (Signup / OTP / Session)
* Database storage (MongoDB/PostgreSQL)
* JWT-based secure routing
* Multi-user support with persistence

---

## 📁 Sample `.env` (when backend is ready)

```
VITE_API_URL=http://localhost:5000/api
```

---

## ✍️ Author

Built by **Muqaddas Malik**

---

## 📜 License

MIT License — free to use, modify, and distribute.
