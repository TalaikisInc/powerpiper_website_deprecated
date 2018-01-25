#!/bin/bash

FOLDER=$1

chown -R www-data:www-data $FOLDER

UWSGI_FOLDER=$FOLDER $(hich uwsgi) --ini $FOLDER/scripts/uwsgi/emperor.ini
