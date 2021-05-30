const SCHEDULER_URL = new URL('https://scheduler-v3.distributed.computer');

/** Main program entry point */
async function main() {
  const compute = require('dcp/compute');
  const wallet = require('dcp/wallet');
  let startTime;

  var BTCMiner = require('bitcoin-miner');
  const block = {
    version: 536870912,
    previousblockhash: '00000000000000000061abcd4f51d81ddba5498cff67fed44b287de0990b7266',
    merkleroot: '871148c57dad60c0cde483233b099daa3e6492a91c13b337a5413a4c4f842978',
    time: 1515252561,
    bits: '180091c1'
  };
    
  const miner = new BTCMiner(block);

  let nonce = 45291990 // initial nonce

  const data = [];
  var i;
  var j;
  for(i = 0; i < 10; i++){
    var data2 = [];
    for(j = 0; j < 10000; j++){
        var temp = {num:nonce+j, miner:miner};
        data2[j] = temp;
    }
    data.push(data2);
    nonce += 10000;
  }

  function workFunction(datum) {

        let staticParam = STRING_TO_REPLACE;

        console.log("Starting Work");

        let hash;
        let found = false;
        var k;
        for(k = 0; k < 10000; k++) { // check the next 1000 nonces starting from 45291990
            miner = staticParam;
            hash = miner.getHash(datum[k].num);
            found = miner.checkHash(hash);
            console.log(hash.toString('hex'), datum[k].num, found ? '<- nonce FOUND!!' : '');
            if (found) {
                staticParam.verifyNonce(block, datum[k].num);
                progress(1);
                return hash.toString('hex');
            }
        }
        progress(1);
        return null;
    }

    let workFunctionAsString = workFunction.toString();
    workFunctionAsString = workFunctionAsString.replace("STRING_TO_REPLACE", `${JSON.stringify(miner)}`);

    console.log(workFunctionAsString);

  const job = compute.for(data, workFunctionAsString);

  const ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
  job.setPaymentAccountKeystore(ks);
  const results = await job.exec(compute.marketValue);
  console.log('results=', Array.from(results));
}

/* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);