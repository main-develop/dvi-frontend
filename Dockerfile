FROM node:20

WORKDIR /app

RUN npm install pm2 -g
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# CMD ["npm", "start"]
CMD ["pm2-runtime", "start", "npm", "--", "start"]
