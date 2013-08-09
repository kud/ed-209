all:
	@make install
	@make bot
install:
	@npm install
bot:
	@node index