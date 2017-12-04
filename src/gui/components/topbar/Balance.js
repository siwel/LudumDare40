import React from 'react';
import coin from '../../../../assets/gui/icn_coin-x2.png'
import shortNumber from 'short-number';
import styles from '../../styles/gui.css';

export class Balance extends React.Component {
	render () {
		const balance = this.props.value;
		return <div className={styles.balance}><img className={styles.popImg} src={coin} /> {shortNumber(balance)}</div>;
	}
}
