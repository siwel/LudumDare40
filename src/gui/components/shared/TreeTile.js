import React from 'react';
import {Legend, Line, LineChart, Tooltip, XAxis} from 'recharts';

import styles from '../../styles/gui.css';
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";


/**
 * The tree tile represents the state of a tree - it is used to both but and sell trees
 */
export class TreeTile extends React.Component {


    onBuy(tree) {
        console.log(`Attempting to buy ${tree.displayName}`);
        PubSubWrapper.publish(PubSubTopics.PURCHASE, {tree: tree})
    }

    render() {


        const action = this.props.buyMode === true ? 'BUY' : 'SELL';
        const tree = this.props.type;


        const valueData = tree.valueOverTime.map(value => ({'Sale Value': value}));


        return (
            <div className={styles.treeTile}>

                <h1>{tree.displayName}</h1>

                <LineChart width={400} height={100} data={valueData}>
                    <Tooltip/>
                    <Legend />
                    <Line type='monotone' dataKey='Sale Value' stroke='#8884d8' strokeWidth={2}/>
                </LineChart>


                <div onClick={() => this.onBuy(tree)}>{action}</div>

            </div>
        )

    }
}
