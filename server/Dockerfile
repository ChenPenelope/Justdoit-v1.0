# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy backend code
COPY server/ .

# Install dependencies again to ensure all files are properly linked
RUN npm install

# Copy frontend code and build it
COPY client/ ./client/
WORKDIR /app/client
RUN npm install
RUN npm run build

# Return to server directory
WORKDIR /app

# Expose the backend port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]