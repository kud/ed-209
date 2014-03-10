NODEMON = $(which nodemon)
FOREVER = $(which forever)

install:
	@ echo "❯ Installing..."
	@ npm install
	@ cp -i config.json.dist config.json

daemon:
	$(FOREVER) start $(NODEMON) --exitcrash index.js

start:
	@ echo "❯ Starting..."
	@ nodemon index.js
