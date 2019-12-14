import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import createCampaignInstance from '../ethereum/campaign';

const RequestRow = props=>{

	const { Cell, Row } = Table;
	const { id, request, approversCount,address } = props;

	const onApprove = async e=>{
		const campaign = createCampaignInstance(address);
		const account = await web3.eth.getAccounts();

		try{
			await campaign.methods.approveRequest(id).send({
				from: account[0]
			});
		}catch(err){
			console.log(err);
		}
	}

	const onFinalize = async e=>{
		const campaign = createCampaignInstance(address);
		const account = await web3.eth.getAccounts();

		try{
			await campaign.methods.finalizeRequest(id).send({
				from: account[0]
			});
		}catch(err){
			console.log(err);
		}
	}

	const readyToFinalize = request.approvalCount > approversCount / 2

	return(
		<Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
			<Cell>{id}</Cell>
			<Cell>{request.description}</Cell>
			<Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
			<Cell>{request.recipient}</Cell>
			<Cell>{request.approvalCount}/{approversCount}</Cell>
			<Cell>
				{
				request.complete ? null : (
				<Button color="green" basic onClick={onApprove}>
					Approve
				</Button>
				)
				}
			</Cell>
			<Cell>
			{
				request.complete ? null :
				<Button color="teal" basic onClick={onFinalize}>
					Finalize
				</Button>
			}

			</Cell>
		</Row>
	)
}

export default RequestRow;
