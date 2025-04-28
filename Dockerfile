# Use Node LTS official image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose backend port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
