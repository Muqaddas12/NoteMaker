# 📘 HD NoteMaker - Frontend

Welcome to the frontend of the **HD NoteMaker** application. This is a responsive React-based user interface for authenticating users via OTP, allowing sign up and sign in. The app interacts with a secure Express.js backend hosted on Render.

---

## 🚀 Features

* ⚡ OTP-based Sign In & Sign Up
* 🎨 Responsive UI with Tailwind CSS
* 🔐 JWT-based authentication with cookie support
* 🔁 OTP resend with cooldown and expiry
* 👀 Password visibility toggle (OTP input)
* 📱 Mobile-first design with form-image split layout

---

## 🛠️ Technologies Used

* React
* React Router
* Axios
* Tailwind CSS
* React Icons

---

## 📁 Folder Structure

```
src/
├── assets/              # Logo and visual images
├── components/          # (Optional) Reusable components
├── pages/
│   ├── SignIn.jsx       # OTP-based sign in page
│   └── SignUp.jsx       # OTP-based sign up page
├── App.jsx              # Routing and base layout
└── main.jsx             # ReactDOM entry point
```

---

## 🔧 Environment Configuration

Update the backend API base URL in `SignIn.jsx` and `SignUp.jsx`:

```js
const API_BASE = "https://notemaker-backend-v3fg.onrender.com/api";
```

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🌐 Routes

* `/signin` → Sign in with email and OTP
* `/` → Sign up with name, dob, email and OTP
* `/dashboard` → Redirected if authenticated (via JWT cookie)

---

## 🔐 Auth Logic Summary

* OTP sent via `/auth/send-otp` on sign up/sign in
* JWT cookie set on successful sign in via `/auth/signin`
* Auth check via `/auth/check` endpoint using `credentials: include`

---

## 📱 Mobile Design Note

* Right-side image column is **hidden on mobile**.
* Form layout stacks vertically with scrollable overflow.

---

## ✨ Upcoming Features

* Forgot password flow
* User profile page
* Dark mode toggle

---

## 👨‍💻 Author

* Built with ❤️ by Muqaddas Malik

For backend setup or deployment, refer to the backend README.
