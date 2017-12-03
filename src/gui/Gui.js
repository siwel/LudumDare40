import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import {TopBar} from './components/topbar/TopBar';
import {BottomBar} from './components/bottombar/BottomBar';
import TreeDetails from './components/shared/TreeDetails';
import styles from './styles/gui.css';

export class Gui {
	constructor (el, state) {
		this._el = el;
		this.state = state;
		this.render();
	}

	update(state) {
		this.state = Object.assign(this.state, state);
		this.render();
	}

	render() {
		ReactDOM.render(
			<Fragment>
				<TopBar
					CO2Level={this.state.CO2Level}
					population={this.state.population}
					balance={this.state.balance}
				/>
				<BottomBar
					title={this.state.title}
				/>

			</Fragment>,
			this._el
		);
	}

}
