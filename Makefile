all:
	@make install
	@make bot
install: bootstrap
	@npm install
bootstrap:
	ln -srf plugins-available/utility_pack.js plugins-enabled/utility_pack.js
	ln -srf listeners-available/core.js listeners-enabled/core.js
full-bootstrap:
	for f in `ls plugins-available`; do \
		rm -f plugins-enabled/$$f ; \
		ln -srf plugins-available/$$f plugins-enabled/$$f ; \
	done
	for f in `ls listeners-available`; do \
		rm -f listeners-enabled/$$f ; \
		ln -srf listeners-available/$$f listeners-enabled/$$f ; \
	done
bot:
	@node index
