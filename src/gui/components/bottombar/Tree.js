import React from 'react';

import styles from '../../styles/gui.css';

export class Tree extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		alert('Buy Trees');
	}

	render () {
		return <div className={styles.tree}>
			<button className={styles.tree__btn} onClick={this.onClick}>🌳</button>
		</div>;
	}
}
