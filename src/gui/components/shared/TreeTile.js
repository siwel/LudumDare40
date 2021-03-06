import React from 'react';
import {Legend, Line, LineChart, Tooltip, XAxis} from 'recharts';

import styles from '../../styles/gui.css';
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";


/**
 * The tree tile represents the state of a tree - it is used to both but and sell trees
 */
export class TreeTile extends React.Component {
    constructor(props) {
        super(props);
        this.onBuy = this.onBuy.bind(this);
        this.onSell = this.onSell.bind(this);
    }


    onBuy() {
        console.log(`Attempting to buy ${this.props.type.displayName} for slot ${this.props.slotNumber}`);
        PubSubWrapper.publish(PubSubTopics.PURCHASE_REQUEST, {tree: this.props.type, slotNumber: this.props.slotNumber});
    }

    onSell() {
        console.log(`Selling ${this.props.type.displayName} in slot ${this.props.slotNumber}`);
        PubSubWrapper.publish(PubSubTopics.SELL_REQUEST, {tree: this.props.tree, slotNumber: this.props.slotNumber});
    }

    shouldComponentUpdate(nextProps)
    {
        if (nextProps.type.displayName === this.props.type.displayName && nextProps.updateHack === this.props.updateHack)
        {
            return false;
        }

        return true;
    }

    render() {
        const {buyMode, slotNumber, tree, type} = this.props;
        const sellValue = tree ? tree.getValue() : 69; // Should never use this if tree doesn't exist
        console.log("Rendering TreeTile", sellValue);

        const action = buyMode === true ? 'BUY' : 'SELL';
        //const tree = type;


        const valueData = type.valueOverTime.map(value => ({'Sale Value': value}));



        for(let i = 0; i < valueData.length; i++)
        {
            valueData[i]['Age'] = Math.round(type.maxAge / (valueData.length - 1)) * i; 
            valueData[i]['o2 Production'] = type.o2OverTime[i];
        }

        valueData[valueData.length - 1]['Age'] = type.maxAge;

        const onClick = buyMode === true ? this.onBuy : this.onSell;
        const price = buyMode === true ? type.saplingPrice : sellValue;
        const buttonClass = buyMode === true ? styles.shopBuyButton : styles.shopSellButton;

        console.log("Sell value", sellValue, price);

        return (
            <div className={styles.treeTile}>

                <h1>{type.displayName}</h1>

                <LineChart className={styles.shopGraph} width={400} height={100} data={valueData}>
                    <Tooltip/>
                    <Legend />
                    <XAxis unit=" Days" dataKey='Age' stroke='#ffffff'/>
                    <Line type='monotone' dataKey='Sale Value' stroke='#8884d8' strokeWidth={2}/>
                    <Line type='monotone' dataKey='o2 Production' stroke='#feaafe' strokeWidth={2}/>
                </LineChart>


                <div className={buttonClass} onClick={onClick}>
                    <div className={styles.coinIcon}></div>
                    <div className={styles.shopButtonText}>
                        <span className={styles.shopButtonActionText}>{`${action}`}</span>
                        <br />
                        <span>{`$${price}`}</span>
                    </div>
                </div>

            </div>
        )

    }
}
