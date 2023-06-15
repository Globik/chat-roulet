FROM node:latest
EXPOSE 443
    
WORKDIR /app
COPY ./ ./
RUN npm install

ENTRYPOINT npm run start