# Calculator Service
Exercise for Web Development Course - https://docs.google.com/document/d/1R4T4fGA5pt1w6ElWLhKVhKrreuQ4m5-lSrwepodqf_w/edit#

# Prerequisites
1. nodejs
2. npm
3. docker


# Install:
1. git clone https://github.com/Zvikush90/calculator-service.git
2. cd calculator-service
3. npm install

# Usage:

## Server:
node server.js

## Client (Example)
node client.js

## Tests (Unit and Integration)
1. node server.js
2. npm test

## Docker

### Build Calculator Container
docker build -t zvikush90:calculator-service .
docker run -p 3000:3000 zvikush90:calculator-service
docker ps

### Compose 

docker-compose up
