# Advanced Sample Hardhat Project

1. Clone project repository

2. Run `npm install` in project root directory

3. Create `.env_secret` file

```
INFURA_API_KEY={INFURA_API_KEY}, not required
ETHERSCAN_API_KEY={ETHERSCAN_API_KEY}, not required

CONTRACT_OWNER_ADDRESS={CONTRACT_OWNER_ADDRESS}, not required
CONTRACT_OWNER_PRIVATE_KEY={CONTRACT_OWNER_PRIVATE_KEY}, not required
```

4. Create `.env_basic` file

```
GAS_PRICE_IN_GWEI={GAS_PRICE_IN_GWEI}, default: 50
GAS_LIMIT={GAS_LIMIT}, default: 5000000
```

6. Run `npm run rebuild` in project root directory

7. Run tests: `npm run test`

8. Another scripts:

| Command                                     | Script               | Long version                                            |
| ------------------------------------------- | -------------------- | ------------------------------------------------------- | 
| Start local hardhat node                    | npm run node         | `npx hardhat node`                                      |
| Hardhat check                               | npm run check        | `npx hardhat check`                                     |
| Compile smart-contract                      | npm run compile      | `npx hardhat compile`                                   |
| Hardhat clean                               | npm run clean        | `npx hardhat clean`                                     |
| Rebuild artifacts and typechain             | npm run rebuild      | `npm run clean && nom run compile`                      |
| Logs full code of smart-contracs to console | npm run flatten      | `npx hardhat flatten`                                   |
| Hardhat test                                | npm run test         | `npx hardhat test`                                      |
| Hardhat detailed test                       | npm run test-verbose | `npx hardhat test --verbose`                            |
| Hardhat coverage                            | npm run coverage     | `npx hardhat coverage`                                  |
| Show all accounts on local node             | npm run accounts     | `npx hardhat accounts`                                  |
| Deploy smart-contract to local node         | npm run deploy       | `npx hardhat run scripts/deploy.ts --network localhost` |
| Quick lint                                  | npm run lint-quick   | `pretty-quick --staged --pattern "\*\*/_._(ts\|tsx)"`   |

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
