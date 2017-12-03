import React from 'react';
import {LineChart, Line, Tooltip, YAxis, XAxis, Label} from 'recharts';

import styles from '../../styles/gui.css';


/**
 * The tree tile represents the state of a tree - it is used to both but and sell trees
 */
export class TreeListItem extends React.Component {



    render() {

        const tree = this.props.type;

        return (
            <div className={styles.treeListItem}>

                <h3 onClick={this.props.click}>{tree.displayName}</h3>

            </div>
        )

    }
}
