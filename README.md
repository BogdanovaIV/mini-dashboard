# 🚀 Mining Pools Dashboard

A mini-dashboard to view mining pool statistics with a modern React UI and a mock Node.js API backend. Includes dark/light theme toggle, modal details view, sorting/filtering, and basic testing.

## 📁 Project Structure

mini-dashboard/<br>
├── client/ # React frontend<br>
├── server/ # Express mock API server<br>
└── README.md<br>


## 🖥️ Features

- ⚡ Displays mining pools in a responsive table
- 🌗 Toggle between light and dark themes
- 🔍 Sort and filter pools by name, hashrate, etc.
- 📊 Modal view with detailed pool stats
- ✅ Unit tests with React Testing Library
- 🧪 Mock API using Express

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mini-dashboard.git
cd mini-dashboard
```

### 2. Start the backend (Node + Express)

```bash
cd server
npm install
node index.js
```

This starts the mock API server at: http://localhost:8000/api

### 3. Start the frontend (React)

```bash
cd server
npm install
node index.js
```

This starts the React app at: http://localhost:3000

## 🛠 Tech Stack
React 19 + Material UI (MUI)

Node.js + Express (mock server)

Axios + Jest + React Testing Library
