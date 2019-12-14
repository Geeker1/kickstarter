import React, {useState} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import createCampaignInstance from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { useRouter } from 'next/router';

const ContributeForm =({address})=>{

	const [inputValue, setInputValue] = useState("");
	const [loadingBtn, setloadingBtn] = useState(false);
	const [errorVisibilty, setErrorVisibility] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const router = useRouter();

	const contribute = async event =>{
		event.preventDefault();
		setloadingBtn(true);
		const accounts = await web3.eth.getAccounts();
		const campaign = createCampaignInstance(address);
		try{
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(inputValue, 'ether')
			});
			router.push(`/campaigns/${address}`,`/campaigns/${address}`
			  , {shallow: true})
		} catch(err){
			setErrorMessage(err.message);
			setErrorVisibility(true);
		}
		setloadingBtn(false);
	}

	return(
		<Form onSubmit={contribute} error={errorVisibilty}>
			<Form.Field>
				<label>Amount to Contribute</label>
				<Input
					label='ether'
					value={inputValue}
					onChange={(e)=>setInputValue(e.target.value)}
					labelPosition='right' />
				<Message
					error
					header='Oops!'
					content={errorMessage}
				/>
			</Form.Field>
			<Button loading={loadingBtn} primary>
				Contribute!
			</Button>
		</Form>
	)
}


export default ContributeForm;
