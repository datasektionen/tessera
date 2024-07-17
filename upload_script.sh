#!/bin/bash

# Ensure the build directory exists
if [ ! -d "build" ]; then
  echo "Build directory does not exist. Please run 'npm run build' first."
  exit 1
fi

# Sync the build directory with the S3 bucket
aws s3 sync build/ s3://tessera-staging/
