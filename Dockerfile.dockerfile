FROM node:11.6.0-alpine AS builder
COPY . ./hr-management-frontend/
WORKDIR /hr-management-frontend/
RUN npm i
RUN $(npm bin)/ng build --configuration="production"

FROM nginx:1.15.8-alpine
COPY --from=builder /hr-management-frontend/dist/static/ /usr/share/nginx/html