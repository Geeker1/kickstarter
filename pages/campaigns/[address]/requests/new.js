import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../../../ethereum/web3';
import createCampaignInstance from '../../../../ethereum/campaign';
import Link from 'next/link';

const NewRequest = (props)=>{

	const [state, setState] = useState({
		value: '',description:'',recipient: ''
	});

	const router = useRouter();
	const { address } = router.query;
	const [errorMessage, setErrorMessage] = useState('');
	const [errorVisibilty, setErrorVisibility] = useState(false);
	const [loadingBtn, setloadingBtn] = useState(false);

	const onSubmit = async e =>{
		e.preventDefault();
		setloadingBtn(true);
		setErrorMessage('');
		setErrorVisibility(false);

		const { description, value, recipient } = state;
		try{
			const account = await web3.eth.getAccounts();
			const campaign = createCampaignInstance(address);

			await campaign.methods.createRequest(
				description,
				web3.utils.toWei(value, 'ether'),
				recipient
			).send({
				from: account[0]
			});
			router.push(`/campaigns/${address}/requests`);
		} catch(err){
			setErrorMessage(err.message);
			setErrorVisibility(true);
		}
		setloadingBtn(false);
	}

	return(
		<Layout>
		<Link href={`/campaigns/[address]/requests`} as={`/campaigns/${address}/requests`}>
			<a>Back</a>
		</Link>
			<h3>Create a Request</h3>
			<Form onSubmit={onSubmit} error={errorVisibilty}>
				<Form.Field>
					<label>Description</label>
					<Input
						value={state.description}
						onChange={e=>setState({...state,
							description: e.target.value})}
					/>
				</Form.Field>
				<Form.Field>
					<label>Value in Ether</label>
					<Input
						value={state.value}
						onChange={e=>setState({...state,
							value: e.target.value})}
					/>
				</Form.Field>
				<Form.Field>
					<label>Recipient</label>
					<Input
						value={state.recipient}
						onChange={e=>setState({...state,
							recipient: e.target.value})}
					/>
				</Form.Field>
				<Message
					error
					header='Oops!'
					content={errorMessage}
				/>
				<Button loading={loadingBtn} primary>
					Create!
				</Button>
			</Form>
		</Layout>
	)
}

export default NewRequest;
