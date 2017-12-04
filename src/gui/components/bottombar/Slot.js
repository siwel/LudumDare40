import React from 'react';

import styles from '../../styles/gui.css';
import {Shop} from "./Shop";
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";
import TreeDetails from '../shared/TreeDetails';


export default class extends React.Component {

    constructor() {
        super();

        this.state = {
            occupied: false
        };

        PubSubWrapper.subscribe(PubSubTopics.PURCHASE_SUCCESS, this._onPurchase.bind(this));
        PubSubWrapper.subscribe(PubSubTopics.SELL_SUCCESS, this._onSale.bind(this));
    }

    _onPurchase(msg, data)
    {
        // debugger;
        console.log("Slot on purchase", msg, data);

        if(data.getSlotNumber() === this.props.slotNumber)
        {
            this.setState({
                occupied: true,
                tree: data,
            });
        }
    }

    _onSale(msg, data)
    {
        console.log(data.slotNumber, this.props.slotNumber);
        if(data.slotNumber === this.props.slotNumber)
        {
            this.setState({occupied: false})
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if(nextState.occupied === this.state.occupied)
        {
            return false;
        }

        return true;
    }

    render() {
        const {slotNumber} = this.props;
        const {tree} = this.state;
        const sellValue = tree ? tree.getValue() : 0; // Should never use this in the 0 case

        console.log("Rendering slot", sellValue);

        return this.state.occupied === true ? <TreeDetails tree={tree} type={tree.treeData} slotNumber={slotNumber} sellValue={sellValue}/> : <Shop slotNumber={slotNumber}/>;
    }
}