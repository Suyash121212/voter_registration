const { expect } = require("chai");

describe("VotingSystem", function () {
    let VotingSystem, votingSystem, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        VotingSystem = await ethers.getContractFactory("VotingSystem");
        votingSystem = await VotingSystem.deploy();
        await votingSystem.deployed();
    });

    it("Should register and vote correctly", async function () {
        await votingSystem.vote(1);
        const votes = await votingSystem.getVotes(1);
        expect(votes).to.equal(1);
    });
});
