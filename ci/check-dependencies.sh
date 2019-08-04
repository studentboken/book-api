#!/usr/bin/env bash

npm audit
violations="$(($(npm audit --parseable | wc -l) - 1))"

if [[ $violations -gt 0 ]]; then
  echo -e "\e[31mFound $violations vulnerabilities\e[0m"
  curl -s "https://badgen.net/badge/dependency%20vulnerabilities/$violations/red" > build/badges/dependency-check.svg
  exit 1
else
  echo -e "\e[32mFound $violations vulnerabilities\e[0m"
  curl -s "https://badgen.net/badge/dependency%20vulnerabilities/$violations/green" > build/badges/dependency-check.svg
fi
