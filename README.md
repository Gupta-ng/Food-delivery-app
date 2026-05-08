# 🍔 Foodie — Food Delivery App

A full-stack **Food Delivery Web Application** built with **React** (frontend) and **Node.js + Express** (backend), featuring user authentication, a food menu, cart management, and restaurant browsing.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

---

## ✅ Features

- 🏠 **Home Page** — Hero slider, featured foods, restaurant cards, testimonials
- 🍽️ **Menu Page** — Browse food items per restaurant with search functionality
- 🛒 **Cart** — Add/remove items, update quantity, view total
- 🔐 **Authentication** — Register & Login with JWT tokens (bcrypt password hashing)
- 📱 **Responsive Design** — Mobile-friendly using Bootstrap 5
- 🔍 **Search** — Filter food items by name on home and menu pages
- 🏪 **Restaurant Browsing** — Browse by restaurant and see their specific menu

---

## 🛠️ Tech Stack

### Frontend (client/)
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| React Router v7 | Client-side routing |
| Bootstrap 5 + React-Bootstrap | Styling & UI components |
| Axios | HTTP requests |
| Context API | Cart state management |

### Backend (server/)
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| bcryptjs | Password hashing |
| jsonwebtoken (JWT) | Authentication tokens |
| dotenv | Environment variable management |
| mongoose | MongoDB ODM (optional) |
| nodemon | Development auto-reload |

---

## 📁 Project Structure

```
Food-delivery-app/
│
├── README.md
├── .gitignore
├── package.json                    # Root scripts
│
├── client/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                  # Root component with routes
│   │   ├── index.js                # React entry point
│   │   ├── App.css
│   │   ├── Context/
│   │   │   └── CartContext.js      # Global cart state
│   │   ├── Screens/
│   │   │   ├── Home.js             # Homepage with hero slider
│   │   │   ├── Menu.js             # Food menu page
│   │   │   └── Cart.js             # Shopping cart page
│   │   └── components/
│   │       ├── Navbar.js           # Navigation bar
│   │       ├── Footer.js           # Footer
│   │       ├── Login.js            # Login form
│   │       └── Register.js         # Registration form
│   └── package.json
│
└── server/                         # Node.js Backend
    ├── index.js                    # Express server entry point
    ├── .env.example                # Environment variable template
    ├── package.json
    ├── models/
    │   └── userModel.js            # In-memory user store
    └── routes/
        ├── authRoutes.js           # POST /api/auth/register & /login
        └── foodRoutes.js           # GET /api/foods
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Gupta-ng/Food-delivery-app.git
cd Food-delivery-app
```

### 2. Setup the Server
```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set your JWT_SECRET

# Start the server (development)
npm run dev
# Server runs on http://localhost:5000
```

### 3. Setup the Client
```bash
# In a new terminal
cd client

# Install dependencies
npm install

# Start the React app
npm start
# App opens at http://localhost:3000
```

### 4. Open the app
Visit **http://localhost:3000** in your browser 🎉

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Health check | No |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get JWT token | No |
| GET | `/api/foods` | Get all food items | No |

### Example: Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

### Example: Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "username": "john"
}
```

---

## 🖼️ Screenshots

> *(Add screenshots of your application here)*

| Home Page | Menu | Cart |
|---|---|---|
| *screenshot* | *screenshot* | *screenshot* |

---

## 🔮 Future Improvements

- [ ] Connect to MongoDB Atlas for persistent user/order storage
- [ ] Add order history page
- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Real-time order tracking
- [ ] Admin dashboard to manage menu items
- [ ] Email confirmation on registration
- [ ] Protected routes (redirect to login if not authenticated)
- [ ] Deployment (Vercel for frontend, Railway/Render for backend)

---

## 👨‍💻 Author

**Gupta-ng**  
GitHub: [@Gupta-ng](https://github.com/Gupta-ng)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
