const SCHEDULER_URL = new URL('https://scheduler-v3.distributed.computer');

/** Main program entry point */
async function main() {
  const compute = require('dcp/compute');
  const wallet = require('dcp/wallet');
  let startTime;

  let nonce = 0 // initial nonce

  const data = [];
  var i;
  var j;
  for(i = 0; i < 10; i++){
    var data2 = [];
    for(j = 0; j < 10000; j++){
        data2[j] = nonce + j;
    }
    data.push(data2);
    nonce += 10000;
  }

  function workFunction(datum) {
        progress(0);
        let result = 1;
        var k;
        for(k = 0; k < 10000; k++){
            result += datum[k];
        }
        progress(1);
        return result;
    }

  const job = compute.for(data, workFunction);

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