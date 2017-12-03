import GameStateManager from'../managers/GameStateManager'
import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';

// Top bar size: 6vh; Bottom bar size; 4vh
const TOP_BAR_SIZE = 0.06;
const BOTTOM_BAR_SIZE = 0.04;

class MainGame extends Phaser.State {

    constructor() {
        super();

        this.selectionOrder = [];

        this.trees = [];
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
        //this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
        //    font: '40px Patua One', fill: '#ffffff', align: 'center'
        //});
        //this.countdownText.anchor.set(0.5,0);




        //setup a timer to end the game
        this.endGameTimer = this.game.time.create();
        this.endGameTimer.add(Phaser.Timer.SECOND * 30, this.endGame,this);
        this.endGameTimer.start();

    }

    update() {
        this._renderTrees();

        //this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(0));
    }

    // This is for our gameplay ticks i.e. trees aging, CO2 changing
    // Not phaser's tick which happens way more often
    gameplayTick() {
        // TODO
    }

    endGame() {
        //this.game.state.start('gameover');
        //this.game.state.start('DrawSomething');
    }

    _renderTrees() {
        for (let i = 0; i < this.trees.length; i++) {
            this.game.add.sprite(50 * i, this.game.world.height * TOP_BAR_SIZE, this.trees[i].getAssetName());

            console.log(this.game)
        }
    }

    addTree(tree) {
        this.trees.push(tree);
    }

    removeTree(tree)
    {
        const index = this.trees.indexOf(tree);
        this.trees.splice(index, 1);
    }
}

export default MainGame;
