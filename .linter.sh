#!/bin/bash
cd /home/kavia/workspace/code-generation/cinenavigator-32613-ab6bdf9f/cinenavigator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

