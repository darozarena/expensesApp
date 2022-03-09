.DEFAULT_GOAL := check

init:
	@echo "Initialising the project"
	@./.scripts/init.sh

start:
	@echo "🏃‍♀️ Starting project"
	@npm run dev

localdb:
	@echo "🤖 Local database starting (docker)..."
	@sh ./.scripts/local-db.sh

services:
	@echo "Starting external services (docker)..."
	@sh ./.scripts/start-services.sh

clean:
	@echo "🛁 Cleaning..."
	@npm run clean

clean_all:
	@echo "🧨 Clean all"
	@rm -Rf node_modules package-lock.json

build:
	@echo "👩‍🏭 Building..."
	@npm run build

deploy-production:
	@echo "👆📦 Deploying to PRODUCTION ⚠️..."
	@./.scripts/deploy-production-architecture.sh
