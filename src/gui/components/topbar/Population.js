import React from 'react';

import styles from '../../styles/gui.css';

export class Population extends React.Component {
	render () {
		const population = this.props.value;
		return <div className={styles.population}>👪 {population}</div>;
	}
}
