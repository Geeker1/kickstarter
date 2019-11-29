import React, { useState, useEffect } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from "../components/Layout";

const Home = (props)=>{

	const renderCampaigns=()=>{
		const items = props.campaigns.map(address=>{
			return {
				header: address,
				description: <a>View Campaign</a>,
				fluid: true
			}
		});

		return <Card.Group items={items}/>
	}

	return(
		<Layout>
		<div>
			<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
			<h1>Campaign list</h1>
			{ renderCampaigns() }
			<Button
			  content="Create Campaign"
			  icon="add circle"
			  primary
			/>
		</div>
		</Layout>
	)
}

Home.getInitialProps =  async function getInitialProps(){
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return { campaigns }
};

export default Home;
