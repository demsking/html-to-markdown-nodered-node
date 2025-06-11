shell:
	tmuxinator

stop:
	tmux kill-session -t node-red-contrib-to-markdown

lint:
	pre-commit run --all-files

fix:
	ruff check . --fix

test:
	npm run test

#
## Dependencies
install:
	npm install

outdated: install
	npm outdated

update:
	npm update
	devbox update
	pre-commit autoupdate


#
## Packaging
package: lint test
	npm pack

publish: package
	git commit package.* -m "Release $(APP_VERSION)"
	npm publish --access public
	git tag v$(APP_VERSION)
	git push --tags origin main
