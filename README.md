# Justdoit-v1.0

Justdoit-v1.0 is a React application built with Vite. It features a betting game with user registration, betting options, and an admin panel. The project includes a backend powered by Node.js and Express, with a MySQL database for data storage.

---

## Table of Contents

- [Justdoit-v1.0](#justdoit-v10)
  - [Table of Contents](#table-of-contents)
  - [Getting Started with Docker](#getting-started-with-docker)
  - [Using a Local Database](#using-a-local-database)
  - [Linting and Formatting](#linting-and-formatting)
  - [Notes](#notes)

---

## Getting Started with Docker

Follow these steps to set up the project using Docker:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Justdoit-v1.0.git
   cd Justdoit-v1.0
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd client
   yarn install
   ```

3. **Set Up Frontend Environment Variables**:
   Copy the example `.env` file into a new `.env` file:
   ```bash
   cp .env.example .env
   ```

4. **Build the Frontend**:
   Build the frontend into static files and copy them into the backend folder:
   ```bash
   yarn build
   yarn copy:dist
   ```

5. **Set Up Backend Environment Variables**:
   Navigate to the backend folder and copy the example `.env` file:
   ```bash
   cd ../server
   cp .env.example .env
   ```
   - If you want to use a remote database, register for a free database on [Render](https://render.com).
   - Set `USE_LOCAL_DB=false` and update `RENDER_DB_URL` with the database URL provided by Render.

6. **Run the Application with Docker**:
   Build and start the backend and database containers:
   ```bash
   docker compose up --build -d
   ```

   The server will be available at [http://localhost:3001/Justdoit-v1.0/](http://localhost:3001/Justdoit-v1.0/).

---

## Using a Local Database

If you prefer to use a local MySQL database, follow these steps:

1. **Set Up the MySQL Database**:
   - Start your MySQL server and create a new database:
     ```sql
     CREATE DATABASE bet;
     ```
   - Set `USE_LOCAL_DB=true` in the `.env` file located in the `server/` directory.

2. **Start the Backend Server**:
   Start the backend server with hot reload:
   ```bash
   yarn dev
   ```
   The backend will be available at [http://localhost:3001](http://localhost:3001).

3. **Start the Frontend**:
   Navigate to the `client` directory and start the Vite development server:
   ```bash
   cd ../client
   yarn dev
   ```
   The frontend will be available at [http://localhost:5173/Justdoit-v1.0](http://localhost:5173/Justdoit-v1.0).

---

## Linting and Formatting

To maintain code quality, use the following commands:

- **Run ESLint**:
  ```bash
  yarn lint
  ```

- **Run Prettier**:
  ```bash
  yarn format
  ```

---

## Notes

- Ensure that Docker is installed and running on your system if you are using the Docker setup.
- For local database usage, make sure your MySQL server is running and accessible.

---

Enjoy building and customizing Justdoit-v1.0!