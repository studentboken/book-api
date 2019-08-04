#!/usr/bin/env bash

output="$(npm run-script check-duplicate-code)"
echo "$output"

extract="$(echo $output | grep -o "[0-9]\{,\} matches found across [0-9]\{,\} files")"
failed="$(echo $extract | cut -d " " -f1)"
files="$(echo $extract | cut -d " " -f5)"

if [[ $failed -gt 0 ]]; then
  echo -e "\e[31mThere are duplicate code. $failed duplications for $files files\e[0m"
  exit 1
else
  echo -e "\e[32mNo duplicate code found. $files were checked\e[0m"
fi
