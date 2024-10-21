const hre = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed address

    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const votingSystem = VotingSystem.attach(contractAddress);

    // Get the vote count for a candidate (e.g., candidate 1)
    const voteCount = await votingSystem.getVotes(1);
    console.log("Vote count for Candidate 1:", voteCount.toString());
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
