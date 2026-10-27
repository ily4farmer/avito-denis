FROM node:22.23.4-alpine AS build

LABEL version="1.0.0"

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


RUN echo BUILD SUCCESSFUL

FROM node:22.23.4-alpine AS production

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]