import web3 from './web3';
import Campaign from './build/Campaign.json';


function createCampaignInstance(address){
	const instance = new web3.eth.Contract(
		JSON.parse(Campaign.interface),
		address
	);
	return instance;
};


export default createCampaignInstance;
