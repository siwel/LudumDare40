import React from 'react';
import {LineChart, Line, Tooltip, YAxis, XAxis, Label} from 'recharts';

import styles from '../../styles/gui.css';


/**
 * The tree tile represents the state of a tree - it is used to both but and sell trees
 */
export class TreeTile extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            showingShow: false
        }
    }

    onClick() {
        this.setState({showingShow: !this.state.showingShow})
    }

    render() {



        const action = this.props.buyMode === true ? 'BUY' : 'SELL';

        //TODO: Assume we will have some conant where we can get this data for each trr type
        const c02 = 250;
        const valueData = [];


        const tree = this.props.type;


        tree.valueOverTime.forEach(value => {
            valueData.push({'saleValue': value})
        });





        return (
            <div className={styles.treeTile}>

                <h1>{tree.displayName}</h1>
                <p>{c02} liters/day</p>

                <LineChart width={300} height={100} data={valueData}>
                    <Line type='monotone' dataKey='saleValue' stroke='#8884d8' strokeWidth={2} />
                </LineChart>

                <div>{action}</div>

            </div>
        )

    }
}
