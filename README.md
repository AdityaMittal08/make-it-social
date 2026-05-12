# Make It Social

A robust, full-stack social media platform engineered to connect users through a seamless and interactive interface. The application features a dynamic frontend, a secure RESTful API, and a highly optimized relational database designed to handle complex social interactions like industry-standard reaction logic and infinite scroll feeds.

## Features

* **Secure Authentication:** User registration and login utilizing JWT-based authentication for protected routes and API endpoints.
* **Dynamic Feed & Explore:** View the latest posts from connections or explore new content and trending news.
* **Advanced Interactions:** Robust post engagement allowing users to seamlessly react to, comment on, and share content.
* **Social Connectivity:** A comprehensive follower system to connect with other users and build a network.
* **Custom User Profiles:** Personalized profile pages tracking user activity, posts, and network statistics.

## Tech Stack

### Frontend
* **Framework:** React (via Vite)
* **Styling:** Tailwind CSS, PostCSS
* **Routing:** React Router (Protected Auth Routes)
* **API Communication:** Axios

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Authentication:** JSON Web Tokens (JWT) & bcrypt
* **Architecture:** Modular MVC-inspired structure (Routes, Controllers, Services)

### Database
* **System:** PostgreSQL
* **Data Models:** Normalized tables for Users, Posts, Comments, Reactions, Followers, and News/Tokens.

## Project Structure

```text
make-it-social/
├── client/                 # React Frontend environment
│   ├── src/
│   │   ├── api/            # Axios instances and API route handlers
│   │   ├── components/     # Reusable UI elements (Auth, Profile, Feed, etc.)
│   │   ├── context/        # React Context for state management (AuthContext)
│   │   └── App.jsx         # Main application entry point
│   ├── tailwind.config.js  # Tailwind utility configuration
│   └── vite.config.js      # Vite bundler configuration
│
└── server/                 # Node/Express Backend environment
    ├── src/
    │   ├── config/         # Database and environment configurations
    │   ├── database/       # DB initialization scripts (init_db.js)
    │   ├── middlewares/    # Custom Express middlewares (verifyJWT)
    │   ├── models/         # Raw SQL schema definitions
    │   ├── modules/        # Domain-specific logic (Auth, Users, Posts, etc.)
    │   └── utils/          # Helper functions (Token generation, Pagination, Error handling)
    └── server.js           # Express server entry point
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* [PostgreSQL](https://www.postgresql.org/) (running locally or accessible via a remote URL)
* [Git](https://git-scm.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adityamittal08/make-it-social.git](https://github.com/adityamittal08/make-it-social.git)
    cd make-it-social
    ```

2.  **Backend Configuration:**
    * Navigate to the `server` directory:
        ```bash
        cd server
        ```
    * Install the backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the root of the `server/` directory and configure your environment variables. You will need your PostgreSQL credentials and a secret key for JWT authentication:
        ```env
        PORT=5000
        DB_USER=postgres
        DB_PASSWORD=your_database_password
        DB_HOST=localhost
        DB_PORT=5432
        DB_NAME=make_it_social
        JWT_SECRET=your_super_secret_jwt_key
        JWT_REFRESH_SECRET=your_super_secret_refresh_key
        ```
    * Initialize the database (this will run the `.sql` model files to create your tables):
        ```bash
        node src/database/init_db.js
        ```
    * Start the backend development server:
        ```bash
        npm run dev
        # or npm start
        ```

3.  **Frontend Configuration:**
    * Open a new terminal window/tab and navigate to the `client` directory:
        ```bash
        cd client
        ```
    * Install the frontend dependencies:
        ```bash
        npm install
        ```
    * Start the Vite development server:
        ```bash
        npm run dev
        ```

4.  **Access the Application:**
    Open your web browser and navigate to the URL provided by Vite (typically `http://localhost:5173`). The backend API will be running on `http://localhost:5000`.

---