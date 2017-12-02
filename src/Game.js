import 'pixi';
import 'p2';
import Phaser from 'phaser';

import DrawSomethingState from './states/DrawSomethingState';

export class Game extends Phaser.Game {
	constructor(gameContainer) {
		const docElement = document.documentElement;
		const width = docElement.clientWidth;
		const height = docElement.clientHeight;

		super(width, height, Phaser.AUTO, gameContainer);

		this.state.add('DrawSomething', DrawSomethingState, false);
		this.state.start('DrawSomething');
	}
}
