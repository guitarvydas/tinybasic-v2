#!/bin/bash
target=tinybasic
pytranspiler=tinybasic2python
jstranspiler=tinybasic2js
shtranspiler=tinybasic2sh
cltranspiler=tinybasic2cl
trap 'catch' ERR

catch () {
    echo '*** fatal error in tinybasic/run.bash'
    exit 1
}
set -e
echo '*** building transpilers'
../grasem/run.bash ${target}.grasem >_.js
cat foreign.js _.js >${target}.js
../grasem/run.bash ${pytranspiler}.grasem >_.js
cat foreign.js _.js >${pytranspiler}.js
../grasem/run.bash ${jstranspiler}.grasem >_.js
cat foreign.js _.js >${jstranspiler}.js
../grasem/run.bash ${shtranspiler}.grasem >_.js
cat foreign.js _.js >${shtranspiler}.js
../grasem/run.bash ${cltranspiler}.grasem >_.js
cat foreign.js _.js >${cltranspiler}.js


echo '*** using transpilers'
echo "*** identity - BASIC in, BASIC out"
node ${target}.js <test.bas

echo "*** tinybasic to python - BASIC in, Python out"
node ${pytranspiler}.js <test2.bas >out.py
cat out.py

echo "*** python run"
python out.py

echo "*** tinybasic to js - BASIC in, Js out"
node ${jstranspiler}.js <test2.bas >out.js
cat out.js

echo "*** js run"
node out.js

echo "*** tinybasic to /bin/sh - BASIC in, sh out"
node ${shtranspiler}.js <test2.bas >out.sh
cat out.sh

echo "*** sh run"
source out.sh

echo "*** tinybasic to cl - BASIC in, Common Lisp out"
node ${cltranspiler}.js <test2.bas >out.lisp
cat out.lisp

echo "*** cl run"
sbcl --load "out.lisp" --quit

# wasm
