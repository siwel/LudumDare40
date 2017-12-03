import React from 'react';

import styles from '../../styles/gui.css';
import Slot from "./Slot";
import GameStateManager from "../../../managers/GameStateManager";

export class BottomBar extends React.Component {
    render() {

        let shops = [];
        for (let i = 0; i < GameStateManager.CONSTANTS.SLOTS; i++) {
            shops.push(<Slot slotNumber={i} key={i}  />);
        }

        return (<div className={styles.bottomBar}>
            {shops}
        </div>);
    }
}
