#!/bin/bash

echo "-------------------------------------------------"
echo "How to call: ./build.sh PORT [install]"
echo "-------------------------------------------------"
cd /home/powerpiper/frontend
if [ "$2" = "install" ]
then
  npm install
  npm run installdev
fi

FRONTEND_PORT=$1 npm run build
pm2 delete pp
FRONTEND_PORT=$1 pm2 start npm --name "pp" -- start
