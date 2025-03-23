#!/bin/bash

# Ensure the 'database' folder exists
if [ ! -d "database" ]; then
  echo "Creating 'database' folder..."
  mkdir database
fi

# Check if a parameter is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <param>"
  exit 1
fi

# Check the parameter value
if [ "$1" == "dev" ]; then
  echo "Running in development mode..."
  bun ./src/main.ts
else
  echo "Invalid parameter. Supported parameter: dev"
  exit 1
fi