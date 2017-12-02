import {Game} from './Game';

import PubSub from 'pubsub-js'

const game = new Game(document.getElementById('game'));

// create a function to subscribe to topics
var mySubscriber = function( msg, data ){
    console.log( msg, data );
};


var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// publish a topic asyncronously
PubSub.publish( 'MY TOPIC', 'hello world!' );