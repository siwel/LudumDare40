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
        PubSubWrapper.publish(PubSubTopics.PURCHASE_REQUEST, {tree: tree})
    }

    shouldComponentUpdate(nextProps)
    {
        if(nextProps.type.displayName === this.props.type.displayName)
        {
            return false;
        }

        return true;
    }

    render() {


        const action = this.props.buyMode === true ? 'BUY' : 'SELL';
        const tree = this.props.type;


        const valueData = tree.valueOverTime.map(value => ({'Sale Value': value}));



        for(let i = 0; i < valueData.length; i++)
        {
            valueData[i]['Age'] = Math.round(tree.maxAge / (valueData.length - 1)) * i; 
            valueData[i]['o2 Production'] = tree.o2OverTime[i];
        }

        valueData[valueData.length - 1]['Age'] = tree.maxAge;

        return (
            <div className={styles.treeTile}>

                <h1>{tree.displayName}</h1>

                <LineChart width={400} height={100} data={valueData}>
                    <Tooltip/>
                    <Legend />
                    <XAxis unit=" Days" dataKey='Age' />
                    <Line type='monotone' dataKey='Sale Value' stroke='#8884d8' strokeWidth={2}/>
                    <Line type='monotone' dataKey='o2 Production' stroke='#feaafe' strokeWidth={2}/>
                </LineChart>


                <div onClick={() => this.onBuy(tree)}>{`${action} for $${tree.saplingPrice}`}</div>

            </div>
        )

    }
}
