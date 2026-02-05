# 📝 Full Stack Notes Application

A full stack Notes application that allows users to manage notes efficiently using a modern MERN-based architecture.
Built with React, Axios, Node.js, Express, and MongoDB, this app supports full CRUD operations via REST APIs.

---

## 🌐 Live Demo

Live Application URL:
https://backend-cohort-tkci.onrender.com/

GitHub Repository:
https://github.com/dev-hamza03/backend-cohort/tree/main/day-9

Note: The backend is hosted on Render free tier, so the first request may take some time due to cold start.

---

## 🚀 Features

- Create a new note with title and description
- View all notes
- Update note description
- Delete notes
- Real-time UI updates after API calls
- Fully deployed backend on Render

---

## 🛠️ Tech Stack

Frontend:
- React
- Axios
- HTML
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- REST API

Deployment:
- Render (Backend)

---

## 📡 API Endpoints

GET    /api/notes        → Fetch all notes  
POST   /api/notes        → Create a new note  
PATCH  /api/notes/:id    → Update note description  
DELETE /api/notes/:id    → Delete a note  

---

## 🧠 What I Learned

- Connecting frontend with backend using Axios
- Implementing CRUD operations with REST APIs
- Using React hooks (useState, useEffect)
- Managing application state after API responses
- Deploying backend on Render and understanding server cold start behavior
- End-to-end full stack application workflow

---

## ⚠️ Performance Note

The backend is hosted on Render free tier.
Initial API calls may be slow due to a cold start, but performance improves once the server is active.

---

## 📦 Installation & Setup (Local)

### 1. Clone the repository
```
git clone https://github.com/dev-hamza03/backend-cohort.git
```

### 2. Navigate to the project directory
``` 
cd backend-cohort/day-9
```

### 3. Install dependencies  
```
npm install  
```

### 4. Start the server  
```
npm run dev  
```

Make sure MongoDB is connected and environment variables are properly configured.

---

## 📌 Future Improvements

- User authentication (Login / Signup)
- User-specific notes
- Improved UI/UX
- Loading and error handling states
- Modal-based editing instead of browser prompt

---

## 👨‍💻 Author

Hamza Khan  
Learning MERN Stack and building real-world projects 
