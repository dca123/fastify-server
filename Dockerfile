FROM node:16-alpine

WORKDIR /app

RUN npm install -g pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

# Bundle app source
COPY . .

RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "start" ]