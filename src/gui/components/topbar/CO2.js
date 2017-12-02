import React from 'react';

import styles from '../../styles/gui.css';

export class CO2 extends React.Component {
	render () {
		const co2 = this.props.value;
		return <div className={styles.co2}>
			<span className={styles.co2__label}>CO<sub>2</sub></span>
			<svg className={styles.co2__graph} viewBox="0 0 100 25">
				<path d={`M0 0 h ${100 - co2} L0 25`} fill={"#0F0"} />
			</svg>
		</div>;
	}
}
