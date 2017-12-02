import React from 'react';

import styles from '../../styles/gui.css';

export class Info extends React.Component {
	render () {
		const {title} = this.props;
		return <div className={styles.info}>{title}</div>;
	}
}
