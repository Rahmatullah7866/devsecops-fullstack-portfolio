# Stage 1: Build the React static assets
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with non-root Nginx
FROM nginx:alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]