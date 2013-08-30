all:
	@make install
	@make bot
install: bootstrap
	@npm install
bootstrap:
	ln -srf plugins-available/utility_pack.js plugins-enabled/utility_pack.js
	ln -srf listeners-available/core.js listeners-enabled/core.js
bot:
	@node index
