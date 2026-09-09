FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build both Vite CSR and SSR
RUN npm run build

# Expose port
EXPOSE 3000

# Start SSR server
CMD ["npm", "start"]
