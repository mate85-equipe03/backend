#!/bin/sh

mkdir -p /home/sirius/data/$S3_BUCKET

chown 2000.2000 /tmp/application.conf
cp -f /tmp/application.conf /home/sirius/app/application.conf

/home/sirius/run.sh