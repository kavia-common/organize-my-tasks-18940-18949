#!/bin/bash
cd /home/kavia/workspace/code-generation/organize-my-tasks-18940-18949/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

