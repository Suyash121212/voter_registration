const { ethers } = window.ethers;

let contract;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        console.log('Connected account:', account);

        const contractAddress = "  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with actual deployed address
        const abi = [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
              }
            ],
            "name": "Voted",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
              }
            ],
            "name": "VoterRegistered",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "candidateCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "candidates",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
              }
            ],
            "name": "getVotes",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
              }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "voters",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
      ]; // Use the ABI from VotingSystem.sol

        contract = new ethers.Contract(contractAddress, abi, signer);

        document.getElementById("voting").style.display = "block";
    } else {
        console.error('MetaMask is not installed');
    }
}

// async function registerVoter() {
//   try {
//       // Assuming 'contract' is your contract instance
//       const tx = await contract.register({ gasLimit: await contract.estimateGas.register() });
//       await tx.wait(); // Wait for the transaction to be mined
//       console.log("Voter registered successfully!");
//   } catch (error) {
//       console.error("Error registering voter:", error);
//   }
// }
async function registerVoter() {
  try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Call your contract's register function
      const tx = await contract.register({ gasLimit: 1000000 });
      
      // Wait for the transaction to be confirmed
      await tx.wait();

      console.log("Voter registered successfully!");
      alert("Voter registered successfully!");

  } catch (error) {
      console.error('Error registering voter:', error);
      alert('Error registering voter. Please try again.');
  }
}



async function castVote() {
    const candidateId = document.getElementById("candidateId").value;
    const tx = await contract.vote(candidateId);
    await tx.wait();
    alert("Vote cast successfully!");
}

async function getVoteResults() {
    const candidateId = document.getElementById("candidateId").value;
    const voteCount = await contract.getVotes(candidateId);
    document.getElementById("resultsDisplay").innerText = `Candidate ${candidateId} has ${voteCount.toString()} votes.`;
}
