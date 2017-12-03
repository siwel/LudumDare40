import React from 'react';

import styles from '../../styles/gui.css';
import {Shop} from "./Shop";
import Slot from "./Slot";

export class BottomBar extends React.Component {
    render() {
        const SLOTS = 7;

        let shops = [];
        for (let i = 0; i < SLOTS; i++) {
            shops.push(<Slot slotNumber={i} key={i}  />);
        }

        return (<div className={styles.bottomBar}>
            {shops}
        </div>);
    }
}
