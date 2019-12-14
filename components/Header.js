import React from 'react';
import Link from 'next/link';
import { Menu } from 'semantic-ui-react';

const style={
	marginTop: "10px"
}

export default ()=>{
	return (
		<Menu style={style}>
			<Link href='/'>
			<a className='item'>CrowdCoin</a>
			</Link>
			<Menu.Menu position="right">
				<Link href='/'>
				<a className='item'>Campaigns</a>
				</Link>

				<Link href='/campaigns/new'>
				<a className='item'>+</a>
				</Link>
			</Menu.Menu>
		</Menu>
	)
}

