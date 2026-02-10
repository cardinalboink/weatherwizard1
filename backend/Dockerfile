# FROM: tells Docker what base image to use as a starting point.
# RUN: executes commands inside the container.
# WORKDIR: changes the active directory.
# USER: changes the active user for the rest of the commands.
# EXPOSE: tells Docker which ports should be mapped outside the container.
# CMD: defines the command to run when the container starts.

# To run our container locally, we need to do two things:

# Build the container:
# $ docker build -t addressbook .
# Run the container:
# $ docker run -it -p 3000:3000 addressbook

# Dockerfile vs docker-compose.yml:
# Dockerfile is used to build a single container image, while docker-compose.yml is used to
# define and manage multi-container Docker applications. -- no need yet as we're setting up for backend only first

# 1. Base image: Node.js runtime: Use a small Linux image with Node 20 installed.
FROM node:20-alpine

# 2. Set working directory inside container: Inside the container, everything happens in /app.
WORKDIR /app

# 3. Copy dependency files first (for caching): Install dependencies inside the container. done before copying source code so Docker can cache it.
COPY package.json package-lock.json ./

# 4. Install dependencies (production only)
RUN npm install --production

# 5. Copy source code
COPY src ./src

# 6. Expose API port
EXPOSE 3001

# 7. Start the server
CMD ["node", "src/server.js"]

# in terminal, run:
# docker build -t weatherwizard-backend .
# docker run -it -p 3001:3001 weatherwizard-backend
