import React from 'react';

import styles from '../../styles/gui.css';
import {TreeTile} from "../shared/TreeTile";
import GameStateManager from "../../../managers/GameStateManager";
import {TreeListItem} from "../shared/TreeListItem";

export class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            showingShow: false,
            selectedTree: GameStateManager.TREES.LudumTree
        }
    }

    onClick() {
        this.setState({showingShow: !this.state.showingShow})
    }

    onTreeItemClick(treeData) {
        this.setState({selectedTree: treeData})
    }

    render() {

        //This is so hacky, but #gamejam - no time to refactor

        const treeList = Object.values(GameStateManager.TREES).map(treeData =>
            <TreeListItem
                click={() => {
                    this.onTreeItemClick(treeData)
                }}
                key={treeData.displayName}
                type={treeData}
            />);

        const shopButton = <div className={styles.slotItem}>
            <button className={styles.tree__btn} onClick={this.onClick}>🕳</button>
        </div>;

        if (this.state.showingShow === true) {
            return (
                <div className={styles.slotItem}>
                    <button className={styles.tree__btn} onClick={this.onClick}>🕳</button>

                    <div className={styles.shopWrapper}>
                        <div className={styles.shopModal}>
                        
                            <div className={styles.shopHeader}>
                                <h1>Sapling Shop</h1>
                                <button className={styles.shopClose__btn} onClick={this.onClick}>Close</button>
                            </div>

                            <div className={styles.shopContent}>

                                <div className={styles.storeTreeList}>
                                    {treeList}
                                </div>

                                <TreeTile
                                    type={this.state.selectedTree}
                                    buyMode
                                    slotNumber={this.props.slotNumber}
                                />
                            </div>
                        </div>
                    </div>

                </div>);
        }

        return shopButton;

    }
}