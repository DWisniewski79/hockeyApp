# Use LTS (Long Term Support) version for stability
FROM node:22-alpine

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (informative only, docker-compose does the mapping)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]