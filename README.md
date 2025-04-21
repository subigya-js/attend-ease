# @attend-ease

## 👋 Introduction

**AttendEase** is a smart attendance management system powered by face recognition. It’s built to help organizations manage employee attendance efficiently with secure facial authentication, fallback mechanisms, and user-friendly dashboards for both employees and admins.

This project was developed as a full-stack learning experience in just **10 days**, dedicating around **3 hours per day** — combining frontend, backend, and computer vision technologies.

---

## ✨ Features

- 🔐 **Authentication** – Secure login and registration
- 🏢 **Organization Management** – Create or join organizations with unique Org IDs
- 📸 **Face Registration** – Capture and register live face per organization using `transformers.js`
- 🧠 **Smart Attendance** – Mark attendance via real-time face match
- 🔐 **Fallback with Passkey** – Use secret passkey if face match fails
- 🔄 **Retry Limits** – 5 face match retries, 3 passkey retries per day
- 📆 **Attendance Calendar** – Color-coded attendance view (Present/Absent/Holiday)
- 👑 **Admin Controls** – Mark holidays, manage users/admins, view complete attendance data
- 📊 **User Dashboard** – Attendance history in an interactive calendar view

---

## 🧰 Tech Stack

### 🔹 Frontend
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Transformers.js](https://huggingface.co/docs/transformers.js/index)

### 🔸 Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for authentication


---

## 📊 Attendance Workflow

1. **Login/Register**  
2. **Create/Join** an organization  
3. **Face Registration** (unique per org)  
4. **Mark Attendance** with live face  
   - If face fails 5x → fallback to passkey  
   - If passkey fails 3x → wait until next day  
5. **Dashboard View** with color-coded calendar:
   - 🟢 Present
   - 🔴 Absent
   - 🟠 Holidays/Weekends

---

## 👥 Roles

| Role     | Description                                                              |
|----------|--------------------------------------------------------------------------|
| Employee | Join orgs, register face, mark attendance, view own calendar             |
| Admin    | Create orgs, manage holidays, assign/revoke admins, view all attendance  |

> 🔐 **Admins are also employees** of the organization they manage.

---

## 🧪 Face Recognition Logic

- Face registration & recognition is handled **client-side** using `transformers.js`
- Face embeddings are securely stored **per organization**
- Face match via **cosine similarity**
- Fallback with secret **passkey** per org

---

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/subigya-js/attend-ease.git
   ```

   ```
   cd attend-ease
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   ```

   ```
   cd backend && npm install
   ```

3. Set up environment variables (see [Configuration](#configuration) section)

## ⚙️ Configuration
### Backend

Create a `.env` file in the `backend/` directory with the following variables:

```
PORT=3001
MONGO_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string for JWT signing.

### Frontend

Create a `.env.local` file in the `frontend/` directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

## 🏃‍♂️ Running the Application

1. Start the backend server:
   ```
   cd backend
   ```
   ```
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   ```

   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.
---
## 🙌 Contributing
Contributions are welcome! Feel free to fork this repo and open a pull request.

#### 1. Fork the project
#### 2. Create your feature branch
```
git checkout -b feature-name
```

#### 3. Commit your changes
```
git commit -m "Added something awesome"
```

#### 4. Push to GitHub
```
git push origin feature-name
```

#### 5. Open a Pull Request 🎉
---

## 👨‍💻 Author

**Subigya Subedi**  
[📧 LinkedIn](https://www.linkedin.com/in/subigya-js/)  
[💻 GitHub](https://github.com/subigya-js)  
[💼 Portfolio](https://subigyasubedi.com.np/)

---

## ⭐️ Show Some Love

If you found this project helpful or inspiring, please ⭐️ this repo — it means a lot!




