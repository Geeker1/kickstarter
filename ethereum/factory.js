import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0x2eED455Ad9Adb6e1b8824cf9d9511AD59dB3b488"
);


export default instance;
