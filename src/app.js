import {Game} from './Game';
import {Gui} from './gui/Gui';

import PubSub from 'pubsub-js';

const game = new Game(document.getElementById('game'));
const gui = new Gui(document.getElementById('gui'), {
    co2: 10,
    population: 50,
    balance: 50,
    title: 'Subtitle/Info'
});

setTimeout(() => {
	gui.update({
		co2: 20,
		population: 60,
		balance: 40,
		title: 'Updated Title'
	});
}, 10000);

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};

var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );
