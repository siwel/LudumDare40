import React from 'react';

import styles from '../../styles/gui.css';

import { CO2 } from './CO2';
import { Population } from './Population';
import { Balance } from './Balance';

export class TopBar extends React.Component {
	//shouldComponentUpdate(nextProps, nextState) {
	//	return (
	//		this.props.CO2Level !== nextProps.CO2Level &&
	//		this.props.population !== nextProps.population &&
	//		this.props.balance !== nextProps.balance
	//	);
	//}

	render () {
		const {CO2Level, population, balance} = this.props;
		return <div className={styles.topBar}>
			<CO2 value={CO2Level} />
			<Population value={population} />
			<Balance value={balance} />
		</div>;
	}
}
