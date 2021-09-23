#!/bin/bash
eslint . -f node_modules/eslint-html-reporter/reporter.js -o lintreport.html
typedoc --out docs src/