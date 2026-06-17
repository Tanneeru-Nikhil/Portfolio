# Nikhil Tanneeru - Personal Portfolio Website

A premium, responsive, and "anti-gravity" personal portfolio website for **Nikhil Tanneeru**, a Java, MERN Full-Stack & Gen-AI Powered Developer. Built using React.js, Node.js, Express, Tailwind CSS, and Nodemailer SMTP integrations.

## 🚀 Key Features

*   **Premium Interactive Theme**: Sleek dark-mode aesthetic utilizing deep charcoal backgrounds (`#0D0D0D`) and metallic gold highlights (`#D4AF37`) with floating parallax animation layers.
*   **Sticky Header Navigation**: Glassmorphic fixed navigation bar with custom scroll anchors ("About", "Skills", "Projects", "Experience") and a fully responsive mobile menu toggle.
*   **Interactive Projects Hub**: Showcase of 5 major projects filterable by category (Full-Stack vs. Frontend) with collapsible key features drawers.
*   **Nodemailer Integration**: Contact form connected to an Express.js backend that dispatches message details directly as formatted HTML email cards using custom Gmail SMTP.
*   **Interactive Copy-to-Clipboard Email**: Fast-click copy button next to email indicators with custom status tooltip flags (`Copy` -> `Copied!`).

---

## 🛠️ Tech Stack

### Frontend
*   **Library**: React.js (Bootstrapped via Vite)
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide Icons & custom brand SVGs

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Security & Mail**: Nodemailer (SMTP configuration)

---

## 📂 Project Structure

```
├── backend/
│   ├── .env               # SMTP Environment Variables
│   ├── server.js          # Express API & Nodemailer integration
│   └── package.json       
└── frontend/
    ├── src/
    │   ├── components/    # Hero, SkillMatrix, Projects, Timeline, ContactFooter
    │   ├── App.jsx        
    │   └── main.jsx       
    ├── tailwind.config.js 
    └── package.json       
```

---

## ⚙️ Setup & Running

### 1. Prerequisites
Ensure you have **Node.js** (v18+ recommended) installed.

### 2. Backend Configuration
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-google-app-password
   ```
   *Note: If no SMTP credentials are provided, the server will automatically fall back to generating Ethereal mock email credentials and print a preview link to the terminal.*

4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Configuration
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173/` (or the port specified in terminal output).
