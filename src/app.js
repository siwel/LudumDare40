import {Game} from './Game';
import {Gui} from './gui/Gui';

import GameStateManager from './managers/GameStateManager';
import Ticker from './managers/Ticker';

//import PubSub from 'pubsub-js';
import PubSub from './util/PubSubWrapper';
import PubSubTopics from './PubSubTopics';

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
const ticker = new Ticker(gameState);

PubSub.subscribe(PubSubTopics.TICK, () => {
	time++;
	gui.update(Object.assign(gameState.stateData, {
	 title: `Title after ${time} seconds`,
	}));
})

setInterval(() => {
	ticker.tick(data);
	PubSub.publish(PubSubTopics.TICK);
}, 1000);

// Subscribe to all the things
for (let topic of Object.getOwnPropertyNames(PubSubTopics)) {
	PubSub.subscribe(PubSubTopics[topic], game.onEvent.bind(game));
}

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );
