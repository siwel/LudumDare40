import React from 'react';

import styles from '../../styles/gui.css';
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";
import {TreeTile} from './TreeTile';


export default class TreeDetails extends React.Component {
	// Proptypes
	// tree: Tree

	//onBuy(tree) {
	//	console.log(`Attempting to buy ${tree.displayName}`);
	//	PubSubWrapper.publish(PubSubTopics.PURCHASE_REQUEST, {tree: tree})
	//}

	_onClick() {
		// TODO probably remove
		console.log("AAAAA");
	}

	render() {
		const {tree} = this.props;
		if (tree) console.log("ID", tree.id);

		if (!tree) return null;

		return (
			<div display="none" onClick={this._onClick.bind(this)}>
				<TreeTile 
					type={tree.treeData}
				/>
			</div>
		);

	}
}
