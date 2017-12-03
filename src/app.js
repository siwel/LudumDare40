import {Game} from './Game';
import {Gui} from './gui/Gui';

import GameStateManager from './managers/GameStateManager';
import Ticker from './managers/Ticker';

import PubSub from 'pubsub-js';

const game = new Game(document.getElementById('game'));
const gui = new Gui(document.getElementById('gui'), {
    CO2Level: 10,
    population: 50,
    balance: 50,
    title: 'Subtitle/Info'
});

const gameState = new GameStateManager();
let data = gameState.stateData;
let time = 0;

const ticker = new Ticker();

setInterval(() => {
	time++;
	data = ticker.tick(data);
	gui.update(Object.assign(data, {
	 title: 'Title after ' + time + ' seconds',
	}));
}, 1000);

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );
