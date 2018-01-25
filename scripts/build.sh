#!/bin/bash

FRONTEND_PORT=$1
API_PORT=$2
HOST=127.0.0.1

# TODO start go api

#############################################################
# SERVICE TESTS
#############################################################

timeout 1 bash -c 'cat < /dev/null > /dev/tcp/${HOST}/${API_PORT}'
if [ "$?" -ne 0 ]; then
    echo "Connection to 127.0.0.1 on API port $API_PORT failed, exiting."
    exit 1

timeout 1 bash -c 'cat < /dev/null > /dev/tcp/${HOST}/${FRONTEND_PORT}'
if [ "$?" -ne 0 ]; then
    echo "Connection to 127.0.0.1 on FRONTEND port $FRONTEND_PORT failed, exiting."
    exit 1

# test real end point domain connectivity + tls
# test admin uwsgi and end connectivity + tls
# stagging THEN
# deployment
# nginx conf (from no to ssl)
