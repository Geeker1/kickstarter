import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "../../../components/Layout";
import createCampaignInstance from "../../../ethereum/campaign";
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';

const CampaignDetail = (props)=>{
	const router = useRouter();
	const { address } = router.query;

	const renderCards = ()=>{
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = props;

		const items = [
			{
				header: manager,
				meta: 'Address of Manager',
				description: 'The manager created this campaign and can create requests',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: minimumContribution,
				meta: 'Minimun Contribution [wei]',
				description: 'You must contribute at least this much wei to become an approver'
			},
			{
				header: requestsCount,
				meta: 'Number of Requests',
				description: 'A request tries to withdraw money from the contract. Requests must be approverd'
			},
			{
				header: approversCount,
				meta: 'Number of Approvers',
				description:'Number of people that have donated to this campaign'
			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: 'Campaign Balance [ether]',
				description: 'This balance ishow much money this campaign has left to spend'
			}

		];

		return <Card.Group items={items}/>
	}

	return (
		<Layout>
			<h4>Address is: {address}</h4>
			<Grid>
				<Grid.Row>
					<Grid.Column width={10}>
						{ renderCards() }

					</Grid.Column>
					<Grid.Column width={6}>
						<ContributeForm address={address}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
					<Link href="/campaigns/[address]/requests"
							as={`/campaigns/${address}/requests`}>
						<Button primary>
							View Requests
						</Button>
					</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	)
}

CampaignDetail.getInitialProps =  async function getInitialProps(props){
	const campaignInstance = createCampaignInstance(props.query.address);
	const getSummary = await campaignInstance.methods.getSummary().call();
	return {
		minimumContribution: getSummary[0],
		balance: getSummary[1],
		requestsCount: getSummary[2],
		approversCount: getSummary[3],
		manager: getSummary[4]
	};
};

export default CampaignDetail;
