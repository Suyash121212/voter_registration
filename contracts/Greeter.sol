// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidateCount;
    mapping(address => bool) public voters;

    event Voted(address indexed voter, uint indexed candidateId);
    event VoterRegistered(address indexed voter); // Event for voter registration

    constructor() {
        // Adding some initial candidates
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function register() public {
        require(!voters[msg.sender], "Voter has already registered.");
        voters[msg.sender] = true; // Mark the voter as registered
        emit VoterRegistered(msg.sender); // Emit the registration event
    }

    function vote(uint _candidateId) public {
        require(voters[msg.sender], "Voter not registered."); // Check if the voter is registered
        require(!voters[msg.sender], "Voter has already voted.");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    function getVotes(uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID.");
        return candidates[_candidateId].voteCount;
    }
}
