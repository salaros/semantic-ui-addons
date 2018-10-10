MKFILE_PATH	:= $(abspath $(lastword $(MAKEFILE_LIST)))
MKFILE_DIR 	:= $(dir $(MKFILE_PATH))

.PHONY: all

all: build

clean:
	@cd $(MKFILE_DIR)
	@rm -rf dist
	@rm -rfv semantic-ui/src/theme*
	@rm -rfv semantic-ui/src/definitions
	@rm -rfv semantic-ui/src/*.less

install:
	@npm install --only=dev

install-sui: install
	@cd $(MKFILE_DIR)/node_modules/semantic-ui
	@gulp --gulpfile $(MKFILE_DIR)/node_modules/semantic-ui/gulpfile.js install

build-sui: install-sui
	@cd $(MKFILE_DIR)/semantic-ui
	@gulp --gulpfile $(MKFILE_DIR)/semantic-ui/gulpfile.js build

build: clean build-sui
	@cd $(MKFILE_DIR)
	@gulp css:concat

