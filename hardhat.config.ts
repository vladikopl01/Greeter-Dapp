import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-solhint';
import '@typechain/hardhat';
import '@typechain/ethers-v5';
import 'solidity-coverage';

import { HardhatUserConfig, task } from 'hardhat/config';
import { secretConfig } from './utils/config';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      gas: 99999999,
      gasPrice: 20000000000,
      blockGasLimit: 999999999,
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${secretConfig.infuraApiKey}`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${secretConfig.infuraApiKey}`,
    },
  },
  etherscan: {
    apiKey: secretConfig.etherscanApiKey,
  },
};

export default config;
