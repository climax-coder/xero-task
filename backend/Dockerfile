# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml)
COPY package*.json ./
# If you're using pnpm, uncomment the following line instead
# COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install
# If you're using pnpm, uncomment the following line instead
# RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your backend runs on
EXPOSE 3000

# Command to run your backend
CMD ["npm", "run", "dev"]
