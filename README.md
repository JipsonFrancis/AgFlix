# AgFlix
Technical interview

# 🎬 AgFLIX – Movie Streaming Web App

AgFLIX is a full-stack movie browsing application built using the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to browse trending movies, like favorites, and manage authentication in a modern, responsive UI.

---

# 🚀 Project Setup Guide

## 📥 1. Clone the Repository

```bash
git clone https://github.com/JipsonFrancis/AgFlix
cd agflix

📦 2. Install Dependencies

Install dependencies for both backend and frontend before running the project.

Backend
cd backend
npm install
Frontend
cd frontend
pnpm install

⚠️ Make sure dependencies are installed before running the project to avoid missing module errors.

🗄️ 3. MongoDB Setup

This project requires MongoDB to run.

Option A: Local MongoDB
Install MongoDB Community Edition
Start MongoDB service on your machine
Option B: MongoDB Atlas (Recommended)
Create an account at https://www.mongodb.com/atlas
Create a cluster
Create a database named:
Enflix
Copy your MongoDB connection string
🔐 4. Environment Variables

Inside the backend folder, locate the .env file and update:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Do not modify other environment variables unless required.

🖥️ 5. Run Backend Server

Inside the backend directory:

npm run dev

Backend will run on:

http://localhost:5000
🌐 6. Run Frontend

Open a new terminal and run:

cd frontend
pnpm run dev

Frontend will run on:

http://localhost:5173
🎯 Application Flow
Start MongoDB (local or Atlas)
Run backend server (npm run dev)
Run frontend server (pnpm run dev)
Open browser and visit frontend URL
🧠 Architecture & Design Rationale
🏗️ System Architecture

The project follows a modular full-stack structure:

Frontend (React) → Handles UI and user interactions
Backend (Node.js + Express) → Handles API and business logic
Database (MongoDB) → Stores application data

The backend follows an MVC-inspired structure:

Models → Database schemas
Controllers → Business logic
Routes → API endpoints
⚛️ Why React?

React was chosen because:

Component-based architecture enables reusability
Efficient state management
Fast rendering performance
Scalable UI design
🧩 Why MERN Stack?

The MERN stack was selected because:

Entire application uses JavaScript
Seamless frontend-backend integration
Faster development cycle
Strong ecosystem support

Alternative stacks like PHP were considered, but MERN was preferred for:

Cleaner separation of concerns
Better scalability
Modern development workflow
🔍 Features
🎬 Browse trending movies (TMDB API)
❤️ Like / favorite system
🔐 User authentication (login/register)
⭐ Dynamic featured movie selection
📄 Pagination support
📱 Responsive UI design
⚠️ Notes
Search feature is partially implemented
API keys are currently exposed for development convenience
Replace MongoDB credentials before production deployment