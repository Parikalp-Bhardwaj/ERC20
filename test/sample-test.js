const { expect } = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num)


describe("ERC20Token", function () {
  let owner,erc20,ownerAdd,erc,add1,add2,addAll;
  let initialSupply;

  
  beforeEach(async()=>{

    initialSupply = ethers.utils.parseEther("100000")
    let Owner = await ethers.getContractFactory("Owner");
    let ERC20 = await ethers.getContractFactory("MyERC20");
    owner = await Owner.deploy()
    
    erc20 = await ERC20.deploy(initialSupply)
    await erc20.deployed();

    
    [ownerAdd,erc,add1,add2,allAdd]  = await ethers.getSigners()

    
  })
  describe("Deveploment ",()=>{})
  it("should track name and symbol",async()=>{
    expect(await erc20.name()).to.equal("Your Token");
    expect(await erc20.symbol()).to.equal("YRT")
    let supply = await erc20._totalSupply();
    console.log(ethers.utils.formatEther(supply))
  })

  it("should have 1000*10**18; total Supply",async()=>{
    let supply = await erc20._totalSupply();
    expect(await erc20.totalSupply()).to.equal(supply)
    console.log("ownerBal 1 ",await erc20.balanceOf(owner.address))
  })
  it("should have 0 token and 0 address",async()=>{
    expect(await erc20.balanceOf(add1.address)).to.equal(0);
  })
  it("owner should have all the supply", async () => {
    const ownerBalance = await erc20.balanceOf(ownerAdd.address);
    expect(ownerBalance).to.equal(initialSupply);
});

  describe("Transfer Money",()=>{

    it("should transfer to address 1",async()=>{
      const transferAmount = ethers.utils.parseEther("1000");
      let Transfer1 = await erc20.balanceOf(add1.address);
      await expect(Transfer1).to.equal(0);
      await erc20.transfer(add1.address,transferAmount);
      Transfer1 = await erc20.balanceOf(add1.address);
      expect(Transfer1).to.equal(transferAmount);
    })

    it("should transfer to address 1 and address 1 to address 2",async()=>{
      const transferAmount = ethers.utils.parseEther("1000");
      await erc20.transfer(add1.address,transferAmount);
      let bobBalance = await erc20.balanceOf(add2.address);
        expect(bobBalance).to.equal(0);

      await erc20.connect(add1).transfer(add2.address,transferAmount)
      await expect(await erc20.balanceOf(add2.address)).to.equal(transferAmount)

    })
    it("should emit",async()=>{
      const transferAmount = ethers.utils.parseEther("1000");
      await erc20.transfer(add1.address,transferAmount);
      await expect(erc20.connect(add1).transfer(add2.address,transferAmount))
      .to.emit(erc20,"Transfer")
      .withArgs(add1.address,add2.address,transferAmount)
    })
   
  })

  describe("Insufficient Balance",()=>{
    it("Should fail if sender doesn’t have enough tokens",async()=>{
      let initialBalance  = await erc20.balanceOf(add2.address);
      await expect(erc20.connect(add1).transfer(add2.address,1)).to.be.revertedWith("Insufficient Token")
      await expect(await erc20.balanceOf(add2.address)).to.equal(initialBalance)
    })

  })



});
