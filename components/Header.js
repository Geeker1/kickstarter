import React from 'react';

import { Menu } from 'semantic-ui-react';

const style={
	marginTop: "10px"
}

export default ()=>{
	return (
		<Menu style={style}>
			<Menu.Item>CrowdCoin</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item>Campaigns</Menu.Item>
				<Menu.Item>+</Menu.Item>
			</Menu.Menu>
		</Menu>
	)
}

