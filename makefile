run:
	make -j3 run-gateway run-scraper run-management
	
run-gateway:
	go run ./cmd/gateway

run-scraper:
	go run ./cmd/scraper

run-management:
	go run ./cmd/management

build:
	go build -o ./cmd/gateway/main ./cmd/gateway
	go build -o ./cmd/scraper/main ./cmd/scraper
	go build -o ./cmd/management/main ./cmd/management

docker-build:
	docker build -t oppewala/ht-gateway:latest ./cmd/gateway/
	docker build -t oppewala/ht-scraper:latest ./cmd/scraper/