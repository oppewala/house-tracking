FROM golang:alpine as builder

RUN mkdir /app
WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

WORKDIR /app/cmd/management
RUN go build -o main .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app .

ENTRYPOINT /app/cmd/management/main

EXPOSE 8080