.PHONY: dev build prod down clean

dev:
	docker-compose -f docker-compose.dev.yml up --build

build:
	docker build -t weblaboratorio .

prod:
	docker-compose up -d --build

down:
	docker-compose down

clean:
	docker system prune -a -f

logs:
	docker-compose logs -f