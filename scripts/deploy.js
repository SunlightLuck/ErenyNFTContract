async function main() {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log('Deploying contract with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());
  const erenyContractFactory = await ethers.getContractFactory("ErenyToken");
  const erenyContract = await erenyContractFactory.deploy();
  
  console.log('ErenyContract address: ', erenyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(err); 
    process.exit(1);
  });