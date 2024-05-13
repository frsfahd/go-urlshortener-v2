# syntax=docker/dockerfile:1

# Stage 1: Build the npm project
FROM node:18.16.0-alpine3.17 AS npm-builder
WORKDIR /app
COPY web/package*.json /app/
RUN npm install
COPY web/ /app/
RUN npm run build

# Stage 2: Build the Go binary
FROM golang:1.21.0-alpine AS go-builder
WORKDIR /app
COPY --from=npm-builder /app/dist /app/web/dist/
COPY go.mod go.sum /app/
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd

# Stage 3: Final stage where we put everything together
FROM alpine:latest
WORKDIR /app
COPY --from=go-builder /app/main /app/.env /app/web/dist /app/
# ENV PORT=8080 DB_URL=mongodb://192.168.224.1:27017 DB_NAME=shortin_db DB_COLLECTION=links
EXPOSE 8080
CMD ["./main"]

