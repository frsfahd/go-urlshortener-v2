# syntax=docker/dockerfile:1

# Stage 1: Build the Go binary
FROM golang:1.21.0-alpine AS go-builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY cmd/ ./cmd/
# RUN go generate ./...
RUN CGO_ENABLED=0 GOOS=linux go build -v -o main ./cmd/

# Stage 2: Build the npm project
FROM node:18.16.0-alpine3.17 AS npm-builder
WORKDIR /app
COPY web/package*.json ./
RUN npm install
COPY web/ ./
RUN npm run build

# Stage 3: Final stage where we put everything together
FROM debian:10
WORKDIR /app
COPY --from=go-builder /app/main ./
COPY --from=npm-builder /app/dist ./dist
ENV PORT=80 DB_URL=mongodb://192.168.224.1:27017 DB_NAME=shortin_db DB_COLLECTION=links
CMD ["./main"]

