all:
	@make install
	@make bot
install: bootstrap
	@npm install
bootstrap:
	ln -sf ${PWD}/plugins-available/utility_pack.js ${PWD}/plugins-enabled/utility_pack.js
	ln -sf ${PWD}/listeners-available/core.js ${PWD}/listeners-enabled/core.js
full-bootstrap:
	for f in `ls plugins-available`; do \
		rm -f plugins-enabled/$$f ; \
		ln -sf ${PWD}/plugins-available/$$f ${PWD}/plugins-enabled/$$f ; \
	done
	for f in `ls listeners-available`; do \
		rm -f listeners-enabled/$$f ; \
		ln -sf ${PWD}/listeners-available/$$f ${PWD}/listeners-enabled/$$f ; \
	done
bot:
	@node index
