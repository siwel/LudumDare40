import React from 'react';

import styles from '../../styles/gui.css';
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";
import {TreeTile} from './TreeTile';

// TODO this should be in the bottombar folder really
export default class TreeDetails extends React.Component {
	// Proptypes
	// tree: Tree

	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
		this.state = {
			showingPopup: false,
		}

		PubSubWrapper.subscribe(PubSubTopics.SELL_SUCCESS, this._onSale.bind(this));
	}

	//onBuy(tree) {
	//	console.log(`Attempting to buy ${tree.displayName}`);
	//	PubSubWrapper.publish(PubSubTopics.PURCHASE_REQUEST, {tree: tree})
	//}

	_onSale(topic, data) {
		this.setState({showingPopup: false});
	}

	_onClick() {
		this.setState({showingPopup: !this.state.showingPopup});
	}

	render() {
		const {slotNumber, tree} = this.props;

		console.log("Rendering details", tree);

		
		const popup = tree && (
			<div className={styles.shopWrapper}>
				<div className={styles.shopModal}>

					<div className={styles.shopHeader}>
						<h1>Sell Tree</h1>
						<button className={styles.shopClose__btn} onClick={this._onClick}>Close</button>
					</div>

					<TreeTile
						type={tree.treeData}
						tree={tree}
						slotNumber={slotNumber}
					/>

				</div>
			</div>
		);

		const button = (
			<div className={styles.slotItem}>
				<button className={styles.tree__btn} onClick={this._onClick}>🌳</button>
				{this.state.showingPopup && popup}
			</div>
		);

		return button;
	}
}
