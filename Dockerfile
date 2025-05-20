FROM node:23-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN yarn install
COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]