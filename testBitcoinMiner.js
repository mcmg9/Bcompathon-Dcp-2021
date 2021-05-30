const BTCMiner = require('bitcoin-miner');
// View this block in Block Explorer:  https://insight.bitpay.com/block/00000000000000000020cf2bdc6563fb25c424af588d5fb7223461e72715e4a9
// Get it in JSON format: https://insight.bitpay.com/api/block/00000000000000000020cf2bdc6563fb25c424af588d5fb7223461e72715e4a9
const block = {
    version: 536870912,
    previousblockhash: '00000000000000000061abcd4f51d81ddba5498cff67fed44b287de0990b7266',
    merkleroot: '871148c57dad60c0cde483233b099daa3e6492a91c13b337a5413a4c4f842978',
    time: 1515252561,
    bits: '180091c1'
};
let nonce = 45291990 // initial nonce

const miner = new BTCMiner(block);

const data = [];
var i;
var j;
for(i = 0; i < 10; i++){
  var data2 = [];
  for(j = 0; j < 10000; j++){
      var temp = {num:nonce+j, miner2:miner};
      data2[j] = temp;
  }
  data.push(data2);
  nonce += 10000;
}

var i;
for(i = 0; i < 10; i++){
    console.log(data[i][0].num);
}

// Calculate the target based on current dificulty for this block (block.bits)
const target = data[0][0].miner2.getTarget();
console.log('The target for this block is:');
console.log(target.toString('hex'));

let hash;
let found = false;

console.log('\n[Start Mining with initial nonce:', nonce, ']');
while (nonce < (45291990+10000) && !found) { // check the next 1000 nonces starting from 45291990
    hash = data[0][0].miner2.getHash(nonce);
    found = data[0][0].miner2.checkHash(hash);
    console.log(hash.toString('hex'), nonce, found ? '<- nonce FOUND!!' : '');
    if (found) {
        miner.verifyNonce(block, nonce);
    }
    nonce++;
}