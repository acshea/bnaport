#!/bin/bash
FABRIC_START_TIMEOUT=15
# Exit on first error, print all commands.
set -e

Usage() {
	echo ""
	echo "Usage: ./startFabric.sh [-d || --dev]"
	echo ""
	echo "Options:"
	echo -e "\t-d or --dev: (Optional) enable fabric development mode"
	echo ""
	echo "Example: ./startFabric.sh"
	echo ""
	exit 1
}

Parse_Arguments() {
	while [ $# -gt 0 ]; do
		case $1 in
			--help)
				HELPINFO=true
				;;
            --dev | -d)
				FABRIC_DEV_MODE=true
				;;
		esac
		shift
	done
}

Parse_Arguments $@

if [ "${HELPINFO}" == "true" ]; then
    Usage
fi

#Detect architecture
ARCH=`uname -m`

# Grab the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ "${FABRIC_DEV_MODE}" == "true" ]; then
    # DOCKER_FILE="${DIR}"/localfabric/docker-compose-dev-2-peer.yml
    DOCKER_FILE="${DIR}"/localfabric/docker-compose-dev.yml
else
    # DOCKER_FILE="${DIR}"/localfabric/docker-compose-2-peer.yml
    DOCKER_FILE="${DIR}"/localfabric/docker-compose.yml
fi

ARCH=$ARCH docker-compose -f "${DOCKER_FILE}" down
ARCH=$ARCH docker-compose -f "${DOCKER_FILE}" up -d

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
echo "sleeping for ${FABRIC_START_TIMEOUT} seconds to wait for fabric to complete start up"
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" -e "CORE_PEER_LOCALMSPID=Org1MSP" peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/my-channel.tx

# Join peer0.org1.example.com to the channel.
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b mychannel.block

#echo fetching block
#docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer1.org1.example.com peer channel fetch config -o orderer.example.com:7050 -c mychannel mychannel.block

# Join peer1.org1.example.com to the channel.
#echo joining peer1
#docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer1.org1.example.com peer channel join -b mychannel.block

if [ "${FABRIC_DEV_MODE}" == "true" ]; then
    echo "Fabric Network started in chaincode development mode"
fi
