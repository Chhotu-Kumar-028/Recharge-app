# 📱 Recharge Saathi

**🌍 Live Demo:** [https://recharge-app-ten.vercel.app/](https://recharge-app-ten.vercel.app/)

Recharge Saathi is a full-stack web application designed to help users manage, compare, and fund their mobile recharges. It provides a platform for data sharing, emergency recharges, and community-driven funding to ensure connectivity for everyone. 

## ✨ Key Features

- 🔍 **Compare Plans:** View and compare different recharge plans to find the best value.
- 🆘 **Emergency Recharge:** Request or provide emergency data/balance.
- 💸 **Recharge Funding & Donations:** Crowdfund for recharges or donate to help others stay connected.
- 📁 **Data Wallet:** Manage and store your data seamlessly.
- 👨‍👩‍👧‍👦 **Family Sharing:** Share data and plans with family members.
- 📶 **Free WiFi Mapping:** Discover free WiFi hotspots nearby.
- 🛡️ **Secure Authentication:** User registration and login using JWT and bcrypt.
- 📊 **Admin Dashboard:** Manage users, plans, and donations effectively.
- ⏰ **Automated Tasks:** Background cron jobs for monitoring and maintaining data.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Framer Motion (Animations)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Task Scheduling:** node-cron
- **File Uploads:** Multer
- **Email Service:** Nodemailer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chhotu-Kumar-028/Recharge-app.git
   cd recharge-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory (refer to `.env.example`).
   - Add your MongoDB connection string and JWT secret.
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```
   - Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm install
   ```
   - Create a `.env` file in the `frontend` directory if necessary (e.g., for API URLs).
   - Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
recharge-app/
├── backend/               # Node.js & Express API
│   ├── src/
│   │   ├── config/        # Database & Environment configurations
│   │   ├── controllers/   # Route controllers
│   │   ├── cron/          # Scheduled background jobs
│   │   ├── middleware/    # Custom Express middlewares (Auth, Error handling)
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API route definitions
│   │   └── utils/         # Helper functions
│   └── package.json
└── frontend/              # React & Vite Application
    ├── src/
    │   ├── assets/        # Static assets (images, icons)
    │   ├── components/    # Reusable UI components
    │   ├── contexts/      # React Contexts (Auth, Theme)
    │   ├── hooks/         # Custom React hooks
    │   ├── pages/         # Page components (Home, Dashboard, etc.)
    │   ├── services/      # API communication logic
    │   └── utils/         # Helper functions
    └── package.json
```

## 🌍 Deployment

- **Frontend:** Optimized for deployment on [Vercel](https://vercel.com/). Ensure that the build command is set to `npm run build` and the output directory is `dist`.
- **Backend:** Designed to be hosted on platforms like [Render](https://render.com/) or Heroku. Make sure to set up all environment variables in your hosting provider's dashboard.
- **Database:** MongoDB Atlas is recommended for production database hosting.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
