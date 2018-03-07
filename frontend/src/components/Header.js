import React from 'react';
import Favicon from 'react-favicon';

export default class Header extends React.Component{
	render () {
		return(
			<Header>
				<Favicon url="http://oflisback.github.io/react-favicon/public/img/github.ico" />
				<h1>React todoApp</h1>
			</Header>
		)
	}
}