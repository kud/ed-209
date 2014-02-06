install:
	@ echo > Installing...
	@ npm install
	@ cp -i config.json.dist config.json

start:
	@ echo > Starting...
	@ nodemon index.js
