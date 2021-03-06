source ./setup_bin.sh

if [ -d ${PWD}/deployable ]; then
   rm -fr ${PWD}/deployable
fi

cd ../native/fabric-new-ts/contract
npm run build
cd -

mkdir -p ${PWD}/deployable/contract/dist
mkdir -p ${PWD}/deployable/contract/META-INF/statedb
cp -R ../native/fabric-new-ts/contract/dist/* ${PWD}/deployable/contract/dist
cp -R ../native/fabric-new-ts/contract/META-INF/statedb/* ${PWD}/deployable/contract/META-INF/statedb
cp ../native/fabric-new-ts/contract/package.json ${PWD}/deployable/contract
cp ../native/fabric-new-ts/contract/npm-shrinkwrap.json ${PWD}/deployable/contract
