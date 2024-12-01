FROM node:20

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx next telemetry disable
RUN npm run build

CMD ["npm", "start"]
