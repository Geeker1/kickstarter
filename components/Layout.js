import React from 'react';
import Header from "./Header";
import { Container } from 'semantic-ui-react';


export default ({children})=>{
	return(
		<Container>
			<Header/>
			{ children }
			<h1>I'm a footer </h1>
		</Container>
	)
}