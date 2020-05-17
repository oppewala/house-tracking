validate:
	go vet cmd/gateway/main.go
	go vet cmd/scraper/main.go cmd/scraper/api.go cmd/scraper/mediator.go cmd/scraper/queueinit.go
	go vet cmd/management/main.go

build:
	go test cmd/management/main.go

run:
	docker-compose up --build