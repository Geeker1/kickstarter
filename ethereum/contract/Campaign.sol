pragma solidity ^0.4.17;


contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string image) public{
        address newCampaign = new Campaign(minimum, msg.sender, image);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }

}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public image;
    mapping(address => bool) public approvers;
    uint public approversCount;


    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator, string image) public{
        manager = creator;
        minimumContribution = minimum;
        image = image;
    }

    // A little bug in contribute function that shows up
    // in the react side and obsructs my code

    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        // Memory copies values, storage references those values
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(request.approvalCount >= approversCount/2);
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
        ){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }

}



