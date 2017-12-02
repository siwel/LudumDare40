import React from 'react';

import styles from '../../styles/gui.css';

import { CO2 } from './CO2';
import { Population } from './Population';
import { Balance } from './Balance';

export class TopBar extends React.Component {
	render () {
		const {co2, population, balance} = this.props;
		return <div className={styles.topBar}>
			<CO2 value={co2} />
			<Population value={population} />
			<Balance value={balance} />
		</div>;
	}
}
