import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import { Greeter } from '../../typechain/Greeter';
import { Greeter__factory } from '../../typechain/factories/Greeter__factory';
import { contractConfig } from '../../utils/config';

export const deployParams = {
  greeterContract: {
    defaultGreeting: contractConfig.greeterContract.greeting,
    addresses: [
      {
        address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        text: 'Address 1',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        text: 'Address 2',
      },
      {
        address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        text: 'Address 3',
      },
      {
        address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
        text: 'Address 4',
      },
      {
        address: '0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',
        text: 'Address 5',
      },
    ],
  },
};

export async function setupGreeterContract(greeterContractOwnerWallet: SignerWithAddress): Promise<Greeter> {
  // DEPLOY CONTRACT
  const greeterContract = await new Greeter__factory(greeterContractOwnerWallet).deploy(
    deployParams.greeterContract.defaultGreeting,
  );

  return greeterContract;
}
