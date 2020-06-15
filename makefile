validate:
	go vet cmd/management/main.go

build:
	go test cmd/management/main.go

run:
	docker-compose up --build