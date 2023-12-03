# Use a Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Expose the container's port (change 8080 to the port your Vue app uses)
EXPOSE 2304

# Command to start the application
CMD ["npm", "run", "serve"]

