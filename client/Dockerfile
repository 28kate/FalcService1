# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire content of the current directory to /app in the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Set the command to run your app using npm start
CMD ["npm", "start"]
