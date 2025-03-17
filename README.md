# Justdoit-v1.0

This project is a React application built with Vite. It includes a basic setup for a betting game with user registration, betting options, and an admin panel.

## Table of Contents

- [Justdoit-v1.0](#justdoit-v10)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Setting Up the Backend (Server)](#setting-up-the-backend-server)
    - [Setting Up the Frontend (Client)](#setting-up-the-frontend-client)
    - [Build for Production](#build-for-production)
    - [Linting and Formatting](#linting-and-formatting)
    - [Adding New Packages](#adding-new-packages)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)

### Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/Justdoit-v1.0.git
   cd Justdoit-v1.0
   ```

2. Install Dependencies:
   ```bash
   yarn install
   ```

### Setting Up the Backend (Server)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install server dependencies:

   ```bash
   yarn install
   ```

3. Set up the MySQL database:

   - Start your MySQL server and create a new database:

     ```sql
     CREATE DATABASE bet;
     ```

   - Copy `.env.example` into `.env` file in the `server` directory:

     ```bash
     cp .env.example .env
     ```

4. Start the server:

   ```bash
   node index.js
   ```

   This will start the Express server on [http://localhost:3001](http://localhost:3001).

### Setting Up the Frontend (Client)

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install client dependencies:

   ```bash
   yarn install
   ```

3. Copy `.env.example` into `.env` file in the `client` directory:

   ```bash
   cp .env.example .env
   ```

4. Start the client:

   ```bash
   yarn dev
   ```

   This will start the Vite development server and you can view the application in your browser at [http://localhost:5173](http://localhost:5173).

### Build for Production

To build the application for production:

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Run the build command:

   ```bash
   yarn build
   ```

   The production-ready files will be generated in the `dist` directory.

### Linting and Formatting

To run ESLint:

```bash
yarn lint
```

To run Prettier:

```bash
yarn format
```

### Adding New Packages

To add a new package to the project, use the following command:

```bash
yarn add <package-name>
```

For example, to add axios for making HTTP requests:

```bash
yarn add axios
```

To add a development dependency, use the -D flag:

```bash
yarn add -D <package-name>
```

For example, to add jest for testing:

```bash
yarn add -D jest
```