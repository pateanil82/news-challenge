# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining project files to the working directory
COPY . .

# Expose the port on which your React app will run
EXPOSE 5500

# Define environment variable
ENV NODE_ENV=production

# Build your React app
#RUN npm run build

# Run the React app when the container starts
CMD ["npm", "start"]
