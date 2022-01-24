import hre from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import { logTransactionGasUsage, nullAddress } from '../../utils/utilities';
import { deployParams, setupGreeterContract } from './greeter-contract-setup';
import { Greeter } from '../../typechain/Greeter';

describe.only('GreeterContract', () => {
  let greeterContract: Greeter;
  let user: SignerWithAddress;

  beforeEach(async () => {
    // GET WALLETS
    [user] = await hre.ethers.getSigners();

    greeterContract = await setupGreeterContract(user);
  });

  describe('Change greeting - public', () => {
    it('success - greet check default greeting', async () => {
      const actionWallet = user;

      const textChecks = await greeterContract.connect(actionWallet).greet();
      expect(textChecks).to.deep.eq(deployParams.greeterContract.defaultGreeting);
    });

    it('success - setGreeting new greeting', async () => {
      const actionWallet = user;
      const actionText = deployParams.greeterContract.addresses.find(i => i.address === actionWallet.address)!.text;

      const textChecksBefore = await greeterContract.connect(actionWallet).greet();
      expect(textChecksBefore).to.deep.eq(deployParams.greeterContract.defaultGreeting);

      const tx = await expect(greeterContract.connect(actionWallet).setGreeting(actionText)).not.to.be.reverted;
      await logTransactionGasUsage('setGreeting', tx as any);

      const textChecksAfter = await greeterContract.connect(actionWallet).greet();
      expect(textChecksAfter).to.deep.eq(actionText);
    });

    it('success - setGreeting same greeting', async () => {
      const actionWallet = user;
      const actionText = deployParams.greeterContract.addresses.find(i => i.address === actionWallet.address)!.text;

      const textChecksBefore = await greeterContract.connect(actionWallet).greet();
      expect(textChecksBefore).to.deep.eq(deployParams.greeterContract.defaultGreeting);

      const beforeTx = await expect(greeterContract.connect(actionWallet).setGreeting(actionText)).not.to.be.reverted;
      await logTransactionGasUsage('setGreeting', beforeTx as any);

      const textChecksAfterTx = await greeterContract.connect(actionWallet).greet();
      expect(textChecksAfterTx).to.deep.eq(actionText);

      const afterTx = await expect(greeterContract.connect(actionWallet).setGreeting(actionText)).not.to.be.reverted;
      await logTransactionGasUsage('setGreeting', afterTx as any);

      const textChecksAfterTxSame = await greeterContract.connect(actionWallet).greet();
      expect(textChecksAfterTxSame).to.deep.eq(actionText);
    });
  });
});
