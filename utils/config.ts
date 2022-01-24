import * as dotenv from 'dotenv';
import env = require('env-var');

dotenv.config({ path: '.env_secret' });
dotenv.config({ path: '.env_basic' });

export const secretConfig = {
  infuraApiKey: env.get('INFURA_API_KEY').required(true).asString(),
  etherscanApiKey: env.get('ETHERSCAN_API_KEY').required(true).asString(),
  contractOwnerPrivateKey: env.get('CONTRACT_OWNER_PRIVATE_KEY').asString(),
};

export const baseConfig = {
  gasPriceInGwei: env.get('GAS_PRICE_IN_GWEI').default(10).asInt(),
  gasLimit: env.get('GAS_LIMIT').default(5000000).asInt(),
  gweiDecimals: 9,
  ethDecimals: 18,
  showLogs: env.get('SHOW_LOGS').required(false).default('true').asBool(),
};

export const contractConfig = {
  greeterContract: {
    greeting: 'Hello from Greeter contract!',
  },
};

export const supportExternalNetworkChainIds = [
  1, // MAINNET
  42, // KOVAN
];
