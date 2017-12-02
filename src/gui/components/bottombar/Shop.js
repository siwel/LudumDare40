import React from 'react';

import styles from '../../styles/gui.css';

export class Shop extends React.Component {

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

        //This is so hacky, but #gamejam - no time to refactor

        const shopButton = <div className={styles.tree}>
            <button className={styles.tree__btn} onClick={this.onClick}>🌳</button>
        </div>;

        if (this.state.showingShow === true) {
            return (
                <div className={styles.tree}>
                    <button className={styles.tree__btn} onClick={this.onClick}>🌳</button>
                    <div className={styles.shopWrapper}>
                        <div className={styles.shopModal}>
                            <h1>Welcome to our awesome sapling shop</h1>
                            <button className={styles.shopClose__btn} onClick={this.onClick}>Close</button>
                        </div>
                    </div>
                </div>);
        }

        return shopButton;

    }
}
