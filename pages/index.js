import React, { useState, useEffect } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from "../components/Layout";
import Link from 'next/link';

const Home = (props)=>{

	const renderCampaigns=()=>{
		const items = props.campaigns.map(address=>{
			return {
				header: address,
				description: (
					<Link href="/campaigns/[address]" as={`/campaigns/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true
			}
		});

		return <Card.Group items={items}/>
	}

	return(
		<Layout>
		<div>
			<h1>Campaign list</h1>

			<Link href="/campaigns/new">
			<Button
			  floated="right"
			  content="Create Campaign"
			  icon="add circle"
			  primary
			/>
			</Link>
			{ renderCampaigns() }
		</div>
		</Layout>
	)
}

Home.getInitialProps =  async function getInitialProps(){
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return { campaigns }
};

export default Home;
