#!/bin/bash

# Exit on first error, print all commands.
set -e

#Detect architecture
ARCH=`uname -m`

# Grab the current directorydirectory.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Shut down the Docker containers that might be currently running.
DOCKER_FILE="${DIR}"/localfabric/docker-compose.yml

ARCH=$ARCH docker-compose -f "${DOCKER_FILE}" stop
