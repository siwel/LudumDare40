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
		this.setState({showingPopup: !this.state.showingPopup,});
	}

	//<button className={styles.shopClose__btn} onClick={this._onClick}>Close</button>

	render() {
		const {slotNumber, tree} = this.props;
		const {showingPopup, updateHack} = this.state;

		console.log("Rendering details", tree);

		
		const popup = tree && (
			<div>
				<div className={styles.shopWrapper}>
					<div className={styles.shopClose__btn__sell} onClick={this._onClick}></div>
					<div className={styles.sellModal}>
						<TreeTile
							buyMode={false}
							type={tree.treeData}
							tree={tree}
							slotNumber={slotNumber}
						/>
	
					</div>
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
