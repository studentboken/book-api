#!/usr/bin/env bash

output="$(npm run-script coverage)"
echo "$output"

coverage="$(echo "$output" | grep '^All files' | cut -d '|' -f 5 | tr -d ' ')"

echo -e "\e[32mCoverage is $coverage% \e[0m"
curl -s "https://badgen.net/badge/test%20coverage/$coverage%25/blue" > build/badges/coverage.svg
