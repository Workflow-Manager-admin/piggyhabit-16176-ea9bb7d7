#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-16176-ea9bb7d7/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

