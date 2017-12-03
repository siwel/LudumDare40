import 'pixi';
import 'p2';
import Phaser from 'phaser';

import DrawSomethingState from './states/DrawSomethingState';
import Preloader from './states/Preloader'
import MainGame from './states/MainGame'

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
}