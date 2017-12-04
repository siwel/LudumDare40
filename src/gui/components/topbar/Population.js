import React from 'react';
import co2btn from '../../../../assets/gui/icn_pp-x2.png'
import shortNumber from 'short-number';


import styles from '../../styles/gui.css';

export class Population extends React.Component {
	render () {
		const population = this.props.value;
		return <div className={styles.population}><img className={styles.popImg} src={co2btn} /><span>{shortNumber(population)}</span></div>;
	}
}
