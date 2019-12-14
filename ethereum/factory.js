import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0xe0DfB989E66ee06194E3391C8B06100F5E7494dd"
);


export default instance;
