import React from 'react';

import styles from '../../styles/gui.css';


export class GameOverUi extends React.Component {
    render() {
        const {gameOver} = this.props;

        // console.log("Game:", gameOver);

        return <div className={styles.gameOver}>
            {this.props.gameOver}
        </div>;
    }
}