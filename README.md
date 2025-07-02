📚 Book Manager
A full-stack application to manage books using Docker, PostgreSQL, Express (Node.js), and a React.js frontend.

🚀 Getting Started
Follow the steps below to get the project up and running locally.

1. Clone the Repository

git clone https://github.com/your-username/book-manager.git
cd book-manager



3. Start the Services with Docker
Ensure Docker and Docker Compose are installed on your machine.

docker-compose up
This will:
Start the PostgreSQL database on port 5433
Run the database init script with seed data (if configured)

💻 Run the Application
Frontend
cd frontend
npm install
npm run dev
This will start the React frontend on http://localhost:3000.

Backend
In a new terminal:

cd backend
npm install
npm run dev
This will start the Node.js Express API server on http://localhost:5000.

🔐 User Roles
Admin Users have permission to edit the table of all books.

Regular users have read-only access to the book list.

🧾 Environment Variables
Ensure the following environment variables are defined in .env files in backend/:

env
Copy
Edit
# backend/.env
DATABASE_URL="postgresql://postgres:books@localhost:5433/book_manager"
ACCESS_TOKEN="your_access_token_here"
REFRESH_TOKEN="your_refresh_token_here"🐘 Database
PostgreSQL is used as the database.

The schema and dummy data are initialized using init.sql via Docker.

📂 Project Structure
css
Copy
Edit
book-manager/
├── backend/
│   ├── src/
│   └── .env
├── frontend/
│   └── src/
├── docker-compose.yml
└── README.md
