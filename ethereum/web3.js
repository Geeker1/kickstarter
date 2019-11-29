import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.ethereum){
	// We are in browser and metamask is running
	window.ethereum.autoRefreshOnNetworkChange = false;
	web3 = new Web3(window.ethereum);
	window.ethereum.enable()
	  .then()
	  .catch(err=> {throw new Error()})
	}
else{
	// We are on server *OR* the user is not running metamask
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/0a7496e587ed478dabfb89a3247f9da3'
	);

	web3 = new Web3(provider);
}


export default web3;