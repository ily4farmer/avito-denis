# 1 Base image 
FROM node:22.23.4-alpine AS base

LABEL version="1.0.1"

RUN npm i -g pnpm   

WORKDIR /app

# 2 Add all dependencies for assembly
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

# 3 Production dependencies
FROM base AS deps-prod

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

# 4 Build the application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# 5 Final prod image
FROM node:22.23.4-alpine AS prod

WORKDIR /app

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
CMD ["node", "dist/main.js"]