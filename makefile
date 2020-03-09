run:
	make -j2 run-gateway run-scraper
	
run-gateway:
	go run ./cmd/gateway

run-scraper:
	go run ./cmd/scraper

build:
	go build -o ./cmd/gateway/main ./cmd/gateway
	go build -o ./cmd/scraper/main ./cmd/scraper

docker-build:
	docker build -t oppewala/ht-gateway:latest ./cmd/gateway/
	docker build -t oppewala/ht-scraper:latest ./cmd/scraper/