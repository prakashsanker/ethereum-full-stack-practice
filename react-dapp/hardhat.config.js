require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/7ecf33525adf493abeaaf63a2d641f58",
      accounts: [
        `0x860656ce4011977b29548a67243f105f61ec8d0ecb8093184d0b817abb6ab983`,
      ],
    },
  },
};
