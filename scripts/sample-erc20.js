const hre = require("hardhat");
const fs = require("fs")


async function main(){
    const accounts = await hre.ethers.getSigners()


   const initialSupply = ethers.utils.parseEther("100000")

    const ERC20 = await hre.ethers.getContractFactory("MyERC20");
    const Erc20 = await ERC20.deploy(initialSupply);
    
    console.log("ERC20 deployed to: ",Erc20.address)


    const Addresses = {
        ERC20Address:Erc20.address
  
    }

    const AddressJson = JSON.stringify(Addresses)
    
    fs.writeFileSync("./client/src/artifacts/Addresses.json",AddressJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

