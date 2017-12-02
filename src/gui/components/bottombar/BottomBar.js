import React from 'react';

import styles from '../../styles/gui.css';

import { Tree } from './Tree';
import { Info } from './Info';
import { Factory } from './Factory';

export class BottomBar extends React.Component {
	render() {
		const {title} = this.props;
		return <div className={styles.bottomBar}>
			<Tree />
			<Info title={title} />
			<Factory />
		</div>;
	}
}
