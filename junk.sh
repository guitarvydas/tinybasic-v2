#!/bin/sh
x=5
echo 5 4 ${x}
if [ ! ${x} -eq 4 ]
then
echo 3
fi

