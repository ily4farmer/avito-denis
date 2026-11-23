# 1. Base image
FROM node:22.23.4-alpine AS base

WORKDIR /app

RUN npm install -g pnpm@12.16.1

# 2. Development dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# 3. Production dependencies
FROM base AS deps-prod

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --prod --frozen-lockfile

# 4. Build application
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build

# 5. Production image
FROM node:22.23.4-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]