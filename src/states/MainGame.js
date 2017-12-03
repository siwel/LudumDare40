import GameStateManager from'../managers/GameStateManager'
import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';

class MainGame extends Phaser.State {

    constructor() {
        super();

        this.selectionOrder = [];
    }

    create() {
        //add background image
        this.background = this.game.add.sprite(0,0,'background');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        //this.panel = this.game.add.sprite(0,0,'panel');
        //this.panel.height = this.game.world.height;
        //this.panel.width = this.game.world.width;

        let bgSounds = this.game.add.audio("bgSound");
        bgSounds.loop = true;
        bgSounds.play();


        //setup UI
        this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Patua One', fill: '#ffffff', align: 'center'
        });
        this.countdownText.anchor.set(0.5,0);




        //setup a timer to end the game
        this.endGameTimer = this.game.time.create();
        this.endGameTimer.add(Phaser.Timer.SECOND * 30, this.endGame,this);
        this.endGameTimer.start();

    }

    update() {
        this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(0));
    }

    endGame() {
        //this.game.state.start('gameover');
        //this.game.state.start('DrawSomething');
    }

}

export default MainGame;
