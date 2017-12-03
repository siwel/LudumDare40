import React from 'react';

import styles from '../../styles/gui.css';

import { Shop } from './Shop';
import { Info } from './Info';
import { Factory } from './Factory';

export class BottomBar extends React.Component {
	render() {
		const {title} = this.props;
		return <div className={styles.bottomBar}>
			<Shop />
			<Info title={title} />
			<Factory />
		</div>;
	}
}
