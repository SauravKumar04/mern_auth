## Live Demo 
- https://mern-auth-zovp.vercel.app/
  
# 🛠️ Authentication System

A full-stack authentication system built with **Node.js**, **Express**, **MongoDB**, and **React**, featuring:

- ✅ User Registration & Login
- 🔐 JWT-based Sessions (stored in secure cookies)
- ✉️ Email Verification with OTP
- 🔁 Password Reset flow with OTP
- 🎨 Cartoonish Frontend using TailwindCSS

---

## 💡 Key Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| 🔐 Secure Auth        | Passwords hashed with `bcrypt`, JWT tokens stored in `HttpOnly` cookies     |
| ✉️ Email Verification | OTP-based email verification with styled HTML emails via Brevo (SMTP)       |
| 🔁 Password Reset     | OTP verification followed by secure password update flow                    |
| 🔒 Protected Routes   | `userAuth.js` middleware checks JWT token and protects backend routes       |
| 🎨 Cartoon UI         | Fun, responsive user interface built with `TailwindCSS`                     |
| 📦 Modular Codebase   | Clean, maintainable MVC-style structure for backend and frontend separation |
| 🔍 Environment Config | `.env` support for environment-based secure configuration                   |
| 💌 SMTP Integration   | Integrated Brevo SMTP for production-ready email delivery                   |


---

## ⚙️ Tech Stack

| Layer         | Technologies Used                                  |
|---------------|-----------------------------------------------------|
| **Frontend**  | React, React Router, TailwindCSS                    |
| **Backend**   | Node.js, Express.js                                 |
| **Database**  | MongoDB (via Atlas)                                 |
| **Auth**      | JWT, bcrypt                                         |
| **Email**     | Brevo SMTP, Nodemailer                              |
| **Config**    | dotenv                                              |
| **Others**    | Axios, Cookie-parser                                |


## Test It Out
- 🔐 Register a new user
- ✉️ Check your email for OTP (styled)
- ✅ Verify email
- 🔁 Test password reset
- 🔒 Try accessing a protected route

## Screenshots
- ## Home
  <img width="1440" alt="Screenshot 2025-06-26 at 12 51 55 PM" src="https://github.com/user-attachments/assets/c5412038-1b3e-4f79-bd6d-623d19d5b1b0" />
- ## Create Account
  <img width="1440" alt="Screenshot 2025-06-26 at 12 52 11 PM" src="https://github.com/user-attachments/assets/b27c36cf-d859-4559-a8f9-0baddf7e1987" />
- ## Login
  <img width="1440" alt="Screenshot 2025-06-26 at 12 52 23 PM" src="https://github.com/user-attachments/assets/7c011025-e065-4bee-9cca-bfb0f8f37a9d" />
- ## Logged In User
  <img width="1440" alt="Screenshot 2025-06-26 at 12 57 36 PM" src="https://github.com/user-attachments/assets/23692dd3-22df-41d5-b97a-8c00d65b3200" />
- ## Verify Email
  <img width="1429" alt="Screenshot 2025-06-26 at 12 58 00 PM" src="https://github.com/user-attachments/assets/fc3d57f6-65d7-4e59-ab40-c8dbfc0164e5" />
- ## Reset Password
  <img width="1440" alt="Screenshot 2025-06-26 at 12 58 24 PM" src="https://github.com/user-attachments/assets/e26bbf98-9dbb-4b81-8b08-a45dffef75c2" />

 ## 🚧 What's Next?
- Add profile update + avatar upload
- Enable social login (Google, GitHub)
- Role-based access (admin/user)
- Improve error handling and UX
- Add full test coverage (Jest, Supertest)

## 🙌 Contributing
- Contributions are welcome! Follow these steps:
- Fork the repository
- Create your feature branch (git checkout -b feature-name)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature-name)
- Open a Pull Request











