import React from 'react';

import styles from '../../styles/gui.css';

export class Balance extends React.Component {
	render () {
		const balance = this.props.value;
		return <div className={styles.balance}>💰 {balance}</div>;
	}
}
