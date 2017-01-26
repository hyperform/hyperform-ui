DEBUG :=

NODE_ENV := production
ifeq ($(DEBUG), 1)
    NODE_ENV := development
endif
export NODE_ENV

WEBPACK := node_modules/.bin/webpack
WEBPACK_FLAGS := -p
ifeq ($(DEBUG), 1)
    WEBPACK_FLAGS := -d --display-reasons --display-chunks --display-modules --profile
endif


all: dist/hyperform-ui.js

dist/hyperform-ui.js: src/index.js
	$(WEBPACK) $(WEBPACK_FLAGS)

src/index.js: src/type/*.js
	@touch $@
