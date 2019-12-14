import React from 'react';
import Layout from '../../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import createCampaignInstance from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';
import _ from 'lodash';

const CampaignRequest = (props)=>{

	const router = useRouter();
	const { address } = router.query;
	const { Header, Row, HeaderCell, Body } = Table;

	const renderRow =()=>{
		return props.requests.map((request, index)=>{
			return <RequestRow
				key={index}
				id={index}
				request={request}
				address={address}
				approversCount={props.approversCount}
				/>
		})
	}

	return(
		<Layout>
			<h3>Requests</h3>
			<Link
				href="/campaigns/[address]/requests/new"
				as={`/campaigns/${address}/requests/new`} >
				<Button primary floated="right" style={{marginBottom: '10px'}}>
					Add Request
				</Button>
			</Link>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>
					{renderRow()}
				</Body>
			</Table>
			<div>
				Found {props.requestCount} requests !
			</div>
		</Layout>
	)
}

CampaignRequest.getInitialProps = async function getInitialProps(props){
	const campaign = createCampaignInstance(props.query.address);
	const requestCount = await campaign.methods
		.getRequestsCount()
		.call()

	const approversCount = await campaign.methods.approversCount().call()

	const requests = await Promise.all(
		_.times(requestCount).map((element, index)=>{
			return campaign.methods.requests(index).call()
		})
	);

	return { requests, requestCount, approversCount }
}

export default CampaignRequest
