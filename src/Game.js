import 'pixi';
import 'p2';
import Phaser from 'phaser';

import DrawSomethingState from './states/DrawSomethingState';
import Preloader from './states/Preloader'
import MainGame from './states/MainGame'

import topics from './PubSubTopics';

export class Game extends Phaser.Game {
	constructor(gameContainer) {
		const docElement = document.documentElement;
		const width = docElement.clientWidth;
		const height = docElement.clientHeight;

		super(width, height, Phaser.AUTO, gameContainer);

		this.state.add('DrawSomething', DrawSomethingState, false);
		this.state.add('Preloader', new Preloader());
		this.state.add('MainGame', new MainGame());
		this.state.start('Preloader');
	}

	// TODO add some sort of validation so that these don't break when we change states

	_onPurchase(data) {
		this.state.callbackContext.addTree(data.tree);
	}

	_onTick(data) {
		this.state.callbackContext.gameplayTick();
	}

	onEvent(msg, data) {
		console.log(`Event: ${msg}`);

		switch (msg) {
			case topics.BALANCE_CHANGE:
				break;
			case topics.CO2_LEVEL_CHANGE:
				break;
			case topics.POPULATION_CHANGE:
				break;
			case topics.PURCHASE_REQUEST:
				break;
			case topics.PURCHASE_SUCCESS:
				this._onPurchase(data);
				break;
			case topics.TICK:
				this._onTick(data);
				break;
			default:
				break;
		}
	}
}
