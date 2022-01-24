import { ethers } from 'hardhat';
import { BigNumber, ContractTransaction, Wallet } from 'ethers';
import { baseConfig } from './config';

export const nullAddress = '0x0000000000000000000000000000000000000000';

export function getWalletByPrivateKey(privateKey: string): Wallet {
  try {
    return new ethers.Wallet(privateKey, ethers.provider);
  } catch (error) {
    throw new Error(`Invalid privateKey: ${privateKey}`);
  }
}

export function parseBigNumber(value: string, decimals: number): BigNumber {
  return ethers.utils.parseUnits(value, decimals);
}

export async function logTransactionGasUsage(methodName: string, tx: ContractTransaction): Promise<void> {
  if (baseConfig.showLogs) {
    const gasLimit = tx && tx.gasLimit && tx.gasLimit.toNumber();
    const confirmedTx = await tx.wait();
    const useGas = confirmedTx.gasUsed && confirmedTx.gasUsed.toNumber();
    const percentUse = gasLimit && useGas && Number((useGas * 100) / gasLimit).toFixed(2);
    console.log(
      `\tMethod name - ${methodName}, useGas - ${useGas} of ${gasLimit} ${percentUse ? `(${percentUse} %)` : ''}`,
    );
  }
}
