# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

# Install dependencies again to ensure all files are properly linked
RUN npm install

# Expose the backend port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]