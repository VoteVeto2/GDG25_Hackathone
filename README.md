# Counter App

A full-stack counter application built with React and Express.

## 📋 Overview

## ✨ Features

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and dev server
- **CSS** - Styling

### Backend

- **Express 4.18.2** - Web framework
- **CORS** - Cross-origin resource sharing
- **Node.js** - Runtime environment

## 📁 Project Structure

```
GDG25_Hackathone/
├── backend/
│   ├── package.json
│   └── server.js          # Express server with API endpoints
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Component styles
│   │   └── main.jsx       # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js     # Vite configuration
├── package.json           # Root package with scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd GDG25_Hackathone
```

2. Install all dependencies (root, backend, and frontend):

```bash
npm run install:all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:

- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

#### Run Separately

**Backend:**

```bash
npm run dev:backend
# or
cd backend && npm run dev
```

**Frontend:**

```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

## 🔌 API Endpoints

### GET `/api/counter`

Get the current counter value and total interactions.

**Response:**

```json
{
  "counter": 5,
  "totalInteractions": 12
}
```

### POST `/api/counter/increment`

Increment the counter by 1.

**Response:**

```json
{
  "counter": 6,
  "message": "Counter incremented"
}
```

### POST `/api/counter/decrement`

Decrement the counter by 1.

**Response:**

```json
{
  "counter": 5,
  "message": "Counter decremented"
}
```

### POST `/api/counter/reset`

Reset the counter to 0.

**Response:**

```json
{
  "counter": 0,
  "message": "Counter reset"
}
```

### GET `/api/interactions`

Get all interaction history.

**Response:**

```json
{
  "interactions": [
    {
      "id": 1,
      "action": "increment",
      "value": 1,
      "timestamp": "2025-10-28T12:00:00.000Z"
    }
  ]
}
```

### DELETE `/api/interactions`

Clear all interaction history.

**Response:**

```json
{
  "message": "Interactions cleared"
}
```

## 🎯 Usage

1. Open the application in your browser (default: `http://localhost:5173`)
2. Use the **Increment** button to increase the counter
3. Use the **Decrement** button to decrease the counter
4. Use the **Reset** button to set the counter back to 0
5. Click **Show History** to view all interactions
6. Click **Clear History** to remove all recorded interactions

## 🔧 Configuration

### Frontend Proxy (Vite)

The frontend is configured to proxy API requests to the backend. Check `frontend/vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
```

### Backend Port

The backend server runs on port 3001 by default. You can modify this in `backend/server.js`.

## 📦 Build for Production

Build the frontend for production:

```bash
cd frontend
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

ISC

## 👥 Authors

GDG25 Hackathon Project

---

**Note:** This is a demonstration project created for learning purposes. The backend uses in-memory storage, so data will be lost when the server restarts.
