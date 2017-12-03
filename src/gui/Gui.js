import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import {TopBar} from './components/topbar/TopBar';
import {BottomBar} from './components/bottombar/BottomBar';

import styles from './styles/gui.css';

export class Gui {
	constructor (el, state) {
		this._el = el;
		this.update(state);
	}

	update(state) {
		ReactDOM.render(
			<Fragment>
				<TopBar
					CO2Level={state.CO2Level}
					population={state.population}
					balance={state.balance}
				/>
				<BottomBar
					title={state.title}
				/>
			</Fragment>,
			this._el
		);
	}
}