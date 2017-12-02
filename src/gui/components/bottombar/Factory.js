import React from 'react';

import styles from '../../styles/gui.css';

export class Factory extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		alert('Buy Factories');
	}

	render () {
		return <div className={styles.factory}>
			<button className={styles.factory__btn} onClick={this.onClick}>🏭</button>
		</div>;
	}
}
