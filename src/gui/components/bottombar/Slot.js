import React from 'react';

import styles from '../../styles/gui.css';
import {Shop} from "./Shop";
import PubSubWrapper from "../../../util/PubSubWrapper";
import PubSubTopics from "../../../PubSubTopics";


export default class extends React.Component {

    constructor() {
        super();

        this.state = {
            occupied: false
        };

        PubSubWrapper.subscribe(PubSubTopics.PURCHASE_SUCCESS, this._onPurchase.bind(this));
        PubSubWrapper.subscribe(PubSubTopics.SELL_SUCCESS, () => this._onSale);
    }

    _onPurchase(msg, data)
    {
        // debugger;

        if(data.getSlotNumber() === this.props.slotNumber)
        {
            this.setState({occupied: true})
        }
    }

    _onSale(data)
    {
        if(data.getSlotNumber() === this.props.slotNumber)
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
        let {slotNumber} = this.props;

        //TODO: replace this tree button with cerden's tree detail
        return this.state.occupied === true ? <button className={styles.slotItem}>🌳</button> : <Shop slotNumber={slotNumber}/>;
    }
}
