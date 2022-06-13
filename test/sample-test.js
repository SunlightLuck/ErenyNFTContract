const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

let ErenyToken;
let tokenContract

describe("Ereny Token Contract", function () {
  beforeEach(async function() {
    ErenyToken = await ethers.getContractFactory("ErenyToken");

    tokenContract = await ErenyToken.deploy();
    await tokenContract.deployed();
  });
  it("Counter works correctly", async function () {
    const [addr1, addr2] = await ethers.getSigners();
    await tokenContract.mint(addr1.address, "HEY");
    expect(BigNumber.from(await tokenContract.count())).to.deep.equal(BigNumber.from("1"))
    await tokenContract.mint(addr2.address, "SSS");
    expect(BigNumber.from(await tokenContract.count())).to.deep.equal(BigNumber.from("2"))
    await tokenContract.mint(addr2.address, "SSSSS");
    expect(BigNumber.from(await tokenContract.count())).to.deep.equal(BigNumber.from("2"))
  });
  
  it("Commodity works correctly", async function () {
    const [addr1, addr2] = await ethers.getSigners();
    await tokenContract.mint(addr1.address, "SSSSS");
    await tokenContract.setToCommodity(addr1.address, BigNumber.from("0"), BigNumber.from("100"));
    expect(await tokenContract.isCommodity(0)).to.deep.equal(true);
    await tokenContract.buy(addr2.address, 0);
    expect(await tokenContract.isCommodity(0)).to.deep.equal(false);
    expect(await tokenContract.ownerOf(0)).to.deep.equal(addr2.address);
  });
});
