import React, { useState } from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


const CampaignNew = (props)=>{

	const [minimumContribution, setState] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const [errorVisibilty, setErrorVisibility] = useState(false);
	const [loadingBtn, setloadingBtn] = useState(false);

	const router = useRouter();

	const onSubmit = async (e)=>{

		e.preventDefault();
		setloadingBtn(true);
		setErrorVisibility(false);

		try{
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createCampaign(minimumContribution)
				.send({ from: accounts[0] });
			router.push('/');
		} catch(err){
			setErrorMessage(err.message);
			setErrorVisibility(true);
		}
		setloadingBtn(false);
	}

	return(
		<>
		<Layout>
			<h3> Create a Campaign!</h3>

			<Form onSubmit={onSubmit} error={errorVisibilty}>
				<Form.Field>
					<label> Minimum Contribution </label>
					<Input label='wei'
						labelPosition='right'
						value={minimumContribution}
						onChange={event => setState(event.target.value)}
						/>
				</Form.Field>
				<Message
					error
					header='Oops!'
					content={errorMessage}
				/>
				<Button loading={loadingBtn} primary> Create! </Button>
			</Form>
		</Layout>
		</>
	);
};

export default CampaignNew;
