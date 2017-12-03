// Top bar size: 6vh; Bottom bar size; 4vh
import PubSubTopics from "../PubSubTopics";

const TOP_BAR_SIZE = 0.06;
const BOTTOM_BAR_SIZE = 0.04;

class MainGame extends Phaser.State {

    constructor() {
        super();

        this.selectionOrder = [];

        this.trees = new Map;
        this.treeLocationMap = [];
    }

    create() {
        //add background image
        this.background = this.game.add.sprite(0, 0, 'background');
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
        this.endGameTimer.add(Phaser.Timer.SECOND * 30, this.endGame, this);
        this.endGameTimer.start();

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

        let trees = [...this.trees.values()];
        for (let i = 0; i < trees.length; i++) {
            this.game.add.sprite(50 * i, this.game.world.height * TOP_BAR_SIZE, trees[i].getAssetName());
        }
    }

    /**
     * @param {Tree} tree
     */
    addTree(tree) {

        const xStart = 50 * this.trees.length;
        const yStart = this.game.world.height * TOP_BAR_SIZE;

        const sprite = this.game.add.sprite(xStart, yStart, tree.getAssetName());

        // #gamejam
        const frame = sprite._frame;
        const height = frame.height;
        const width = frame.width;

        this.treeLocationMap.push({
            xStart,
            xEnd: xStart + width,
            yStart,
            yEnd: yStart + height,
        });

        PubSub.publish(PubSubTopics.TREE_ADDED, this.treeLocationMap);

        this.trees.set(tree.id, tree);
        this._renderTrees();
    }

    /**
     * @param {Tree} tree
     */
    removeTree(tree) {
        if (this.trees.has(tree.id)) {
            this.trees.delete(id);
        }
        this._renderTrees();

    }
}

export default MainGame;
