#!/usr/bin/env bash

output="$(npm test)"
exitCode=$?
echo "$output"

if [[ ! $exitCode -eq 0 ]]; then
  if [[ $(echo "$output" | grep -c "Couldn't find any files to test") -gt 0 ]]; then
    echo -e "\e[31mThere are no tests available\e[0m"
    exit 0
  else
    echo -e "\e[31mTests failed with error code $exitCode\e[0m"
    exit $exitCode
  fi
fi

tests="$(echo $output | grep -o "# tests [0-9]\{0,\}" | cut -d " " -f3)"
passed="$(echo $output | grep -o "# pass [0-9]\{0,\}" | cut -d " " -f3)"
failed="$(echo $output | grep -o "# fail [0-9]\{0,\}" | cut -d " " -f3)"

if [[ $failed -gt 0 ]]; then
  echo -e "\e[31mTests failed. $failed failed and $passed passed out of $tests tests\e[0m"
  exit 1
else
  echo -e "\e[32mTests succeeded. All $passed tests passed out of $tests tests\e[0m"
fi
