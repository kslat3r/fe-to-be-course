FROM node:8.11-alpine

# Fixes home
ENV HOME /root

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install

# Run
EXPOSE 3000
CMD [ "npm", "start" ]
