# Bcompathon-Dcp-2021
Submission for the Bcompathon 2021 Dcp project

The idea for the project was a proof-of-concept for a distributed bitcoin miner using the bitcoin-miner module (more like a bitcoin mining simulator).

Although it was not properly implemented to be used with dcp, there is a demo of the bitcoin miner and how it works (testBitcoinMiner.js). There is also a file that shows how the miner would interact with dcp (how I would handle large numbers and distribute the workload)(noMining.js).

Note: these were made using v3 of dcp, if you need to run it with updated dcp, remove the '-v3' from the first line at the top of the files

install bitcoin-miner: npm install bitcoin-miner

run: node index.js
