// import { ethers } from 'hardhat';

// async function main() {
//   const Greeter = await ethers.getContractFactory('Greeter');
//   const greeter = await Greeter.deploy('Hello, Hardhat!');

//   await greeter.deployed();

//   console.log('Greeter deployed to:', greeter.address);
// }

// main().catch(error => {
//   console.error(error);
//   process.exitCode = 1;
// });

import hre from 'hardhat';
import { Overrides } from 'ethers';

import { Greeter } from '../typechain/Greeter';
import { Greeter__factory } from '../typechain/factories/Greeter__factory';
import { baseConfig, contractConfig, secretConfig, supportExternalNetworkChainIds } from '../utils/config';
import { getWalletByPrivateKey, parseBigNumber } from '../utils/utilities';

export async function deployGreeterContract(): Promise<void> {
  console.log(`\n\nDeploy Greeter config: ${JSON.stringify(contractConfig.greeterContract)}`);
  if (!secretConfig.contractOwnerPrivateKey || !baseConfig.gasPriceInGwei || !baseConfig.gasLimit) {
    throw new Error('Enviroment varables not specified');
  }

  console.log(JSON.stringify(secretConfig));

  console.log('\nGet network');
  const networkChainId = (await hre.ethers.provider.getNetwork()).chainId;
  console.log(`Network chain id: ${networkChainId}`);

  console.log('\nGet and check wallet');
  const wallet =
    supportExternalNetworkChainIds.indexOf(networkChainId) !== -1
      ? getWalletByPrivateKey(secretConfig.contractOwnerPrivateKey)
      : (await hre.ethers.getSigners())[0];
  console.log(`Wallet address: ${wallet.address}`);

  console.log('\nGet overrides');
  const overrides: Overrides = {
    gasPrice: parseBigNumber(baseConfig.gasPriceInGwei.toString(), baseConfig.gweiDecimals),
    gasLimit: baseConfig.gasLimit,
  };
  console.log(`Overrides: ${JSON.stringify(overrides)}`);

  console.log('\nDeploy Greeter contract');
  const deployParams: string[] = [contractConfig.greeterContract.greeting];
  console.log(`Deploy parameters: ${deployParams.join(', ')}`);
  const greeter = await new Greeter__factory(wallet).deploy(contractConfig.greeterContract.greeting, overrides);
  await greeter.deployed();
  console.log(`Deployed to address: ${greeter.address}`);
  console.log(`Transaction id: ${greeter.deployTransaction.hash}`);
  console.log('Waiting for confirmation transaction...');
  const transactionReceipt = await greeter.deployTransaction.wait();
  console.log(`Transaction confirmed in block: ${transactionReceipt.blockNumber}`);

  console.log('\nEtherscan verify script:');
  const etherscanVerifyScript = `npx hardhat verify --network <<network>> ${greeter.address} ${deployParams.join(' ')}`;
  console.log(etherscanVerifyScript);
}

async function main() {
  await deployGreeterContract();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
