import {Game} from './Game';
import {Gui} from './gui/Gui';
import swal from 'sweetalert2'

import GameStateManager from './managers/GameStateManager';
import Ticker from './managers/Ticker';

//import PubSub from 'pubsub-js';
import PubSub from './util/PubSubWrapper';
import PubSubTopics from './PubSubTopics';

let id = null;
swal({
    title: 'Tree Master',
    text: 'Carbon dioxide is filling up the world. More and more humans have polluted their planet and are suffocating.',
    confirmButtonText: 'Next'
}).then(() => {
    swal({
		title: 'You are the Tree Master',
        text: 'Planter of trees and saver of lives. The populace will live and die by the quality of the air. Only you can prevent the humanity’s extinction.',
        confirmButtonText: 'Start'
    }).then(() => {
		id = setInterval(() => {
            ticker.tick(data);
            PubSub.publish(PubSubTopics.TICK);
        }, 1000);
	})
})

const game = new Game(document.getElementById('game'));


PubSub.subscribe(PubSubTopics.BALANCE_UPDATE, (msg, balance) => {gui.update({balance});});



const gameState = new GameStateManager();

const gui = new Gui(document.getElementById('gui'), {
    CO2Level: gameState.getCO2Level(),
    population: gameState.getPopulation(),
    balance: gameState.getBalance(),
    title: 'Subtitle/Info',
});

let data = gameState.stateData;
let time = 0;
const ticker = new Ticker(gameState);

PubSub.subscribe(PubSubTopics.TICK, () => {
	time++;
	gui.update(Object.assign(gameState.stateData, {
	 title: `Day: ${time}`,
	}));
});



PubSub.subscribe(PubSubTopics.GAME_END, ()=>
{
	clearInterval(id);
});

// Subscribe to all the things
for (let topic of Object.getOwnPropertyNames(PubSubTopics)) {
	PubSub.subscribe(PubSubTopics[topic], (msg, data)=>{
		game.onEvent(msg,data)
    });
}

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );
