#!/bin/sh
BASEDIR=$(dirname $0)

cd $BASEDIR/..

java -cp bin:libs/* -Denvironment=development org.ase.peer_marker.Main
