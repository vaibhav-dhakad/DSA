FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY src ./src
RUN mkdir -p uploads && npm run build
EXPOSE 4005
CMD ["npm", "run", "start"]
