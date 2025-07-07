#!make
# include .env
# export $(shell sed 's/=.*//' .env)


app-start:
	docker compose up -d

app-sstart:
	docker compose up

app-stop:
	docker compose stop

app-restart-dev:
	docker compose stop
	docker compose start

app-restart-prod:
	docker compose stop
	docker compose start

app-rebuilding-docker:
	docker compose down
	docker compose up -d --build

init:
	docker compose pull
	docker compose up -d --build

	@echo "System ready!"


update:
	docker compose pull
	docker compose up -d

