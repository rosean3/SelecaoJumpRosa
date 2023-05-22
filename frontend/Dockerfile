FROM node:16.18.1-alpine as install-step

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:16.18.1-alpine as frontend

WORKDIR /app
COPY --from=install-step /app/node_modules ./node_modules

COPY . .
RUN npm install -g @angular/cli@14.2.10
RUN ng build --configuration production --output-path=/frontend-dist

FROM nginx:1.23.2-alpine

COPY --from=frontend /frontend-dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443