import * as dotenv from 'dotenv';
import env = require('env-var');

dotenv.config({ path: '.env_basic' });
dotenv.config({ path: '.env_secret' });

export const secretConfig = {
  infuraApiKey: env.get('INFURA_API_KEY').asString(),
  etherscanApiKey: env.get('ETHERSCAN_API_KEY').asString(),
  contractOwnerPrivateKey: env.get('CONTRACT_OWNER_PRIVATE_KEY').asString(),
};

export const baseConfig = {
  gasPriceInGwei: env.get('GAS_PRICE_IN_GWEI').default(50).asInt(),
  gasLimit: env.get('GAS_LIMIT').default(5000000).asInt(),
  gweiDecimals: 9,
  ethDecimals: 18,
  showLogs: env.get('SHOW_LOGS').default('true').asBool(),
};

export const contractConfigs = {
  contractName: {},
};

export const supportExternalNetworkChainIds = [
  1, // MAINNET
  42, // KOVAN
];
