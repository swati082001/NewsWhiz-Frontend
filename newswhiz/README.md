
# 💬 NewsWhiz 

This is the frontend for **NewsWhiz**, a chatbot that answers questions using real-time news sources and Retrieval-Augmented Generation (RAG) pipeline.

---

## ✨ Features

- 🔹 Clean chat interface for querying the news
- 🔹 Bot response animation and markdown formatting
- 🔹 Scrollable chat view with reset session button
- 🔹 Session ID based chat memory
- 🔹 Connects to deployed backend for Gemini answers

---

## ⚙️ Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Axios**
- **React-Markdown**

---

## 📁 Folder Overview

```
├── components/
│   └── ChatBox.jsx
├── App.jsx
├── main.jsx
├── index.css
└── .env
```

---

## 🔌 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

```env
VITE_API_URL=https://newswhiz-backend.onrender.com/api
```

### 3. Start development server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🌍 Deployment

- Hosted on: [Vercel](https://vercel.com/)
- Live URL: `https://news-whiz.vercel.app/`

---


## 🧠 Chat Flow

1. User enters a query
2. Frontend sends query to backend with session ID
3. Backend:
   - Retrieves related articles from Qdrant
   - Builds prompt for Gemini
   - Sends back the response
4. UI renders the bot’s reply with markdown and animation

