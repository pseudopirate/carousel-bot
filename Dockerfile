FROM mhart/alpine-node:14

WORKDIR /app
COPY src ./src
COPY tsconfig.json package.json package-lock.json ./
RUN  npm ci
RUN npm run build && npm prune --production

CMD npm start
