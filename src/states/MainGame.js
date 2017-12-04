// Top bar size: 6vh; Bottom bar size; 4vh
import PubSubTopics from "../PubSubTopics";
import GameStateManager from "../managers/GameStateManager";
import * as Phaser from "phaser-ce";

const TOP_BAR_SIZE = 0.06;
const BOTTOM_BAR_SIZE = 0.04;
const GROUD_HEIGHT = 80;

class MainGame extends Phaser.State {

    constructor() {
        super();

        this.selectionOrder = [];

        this.trees = new Map;
        this.spriteList = new Map;

        this.treeLocationMap = [];
    }

    create() {

        //NOT THE ORDER OF ALL OF THIS LOADING IS IMPORTANT TO THE LAYER ORDER #gamejam
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;


        const factoryHeight = 100;
        const factoryWidth = 100;
        this.factory = this.game.add.sprite(30, this.game.world.height - GROUD_HEIGHT - factoryHeight + 10, 'factory');
        this.factory.height = factoryHeight;
        this.factory.width = factoryWidth;


        this.smokeEmitter = this.game.add.emitter(0, 0, 50);

        this.smokeEmitter.makeParticles('smoke');
        // this.smokeEmitter.gravity = -200;

        this.smokeEmitter.setSize(5,5);
        this.smokeEmitter.x = this.factory.centerX;
        this.smokeEmitter.y = this.factory.y;


        this.smokeEmitter.setRotation(0, 0);
        this.smokeEmitter.setAlpha(0.1, 1, 2500);
        this.smokeEmitter.setScale(0.1, .6, 0.1, .6, 2500, Phaser.Easing.Quintic.Out);
        this.smokeEmitter.gravity = -200;

        this.smokeEmitter.start(false, 3000, 50);

        this.smokeEmitter.emitX = 0;


        // this.smokeEmitter.start(false, 4000, 500, 0);


        this.treeGroup = this.game.add.group();

        this.ground = this.game.add.sprite(0, this.game.world.height - GROUD_HEIGHT, 'ground');
        this.ground.height = GROUD_HEIGHT;
        this.ground.width = this.game.world.width;

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
        //let trees = [...this.trees.values()];
        //for (let i = 0; i < trees.length; i++) {
        //    this.game.add.sprite(50 * i, this.game.world.height * TOP_BAR_SIZE, trees[i].getAssetName());
        //}
    }

    /**
     * @param {Tree} tree
     */
    addTree(tree) {
        const slotWidth = this.game.width / GameStateManager.CONSTANTS.SLOTS;

        const adjustedGroundHeight = GROUD_HEIGHT - 10;
        const xStart = slotWidth * tree.getSlotNumber() + (slotWidth/2);
        const yStart = this.game.world.height - adjustedGroundHeight;

        const sprite = this.treeGroup.create(xStart, yStart, tree.getAssetName());

        sprite.anchor.set(0.5, 1);


        //TODO: might need to change this more to a scale tween when we have actual assets
        //TODO: would be nice here to use the growth graph as a easing function
        const duration = GameStateManager.CONSTANTS.ONE_DAY_DURATION * tree.getMaxAge();
        const tween = this.game.add.tween(sprite).from( { y: this.game.world.height + sprite.height - adjustedGroundHeight}, duration, Phaser.Easing.Bounce.Linear, true);

        // #gamejam
        const frame = sprite._frame;
        const height = frame.height;
        const width = frame.width;

        this.treeLocationMap.push({
            tree,
            xStart,
            xEnd: xStart + width,
            yStart,
            yEnd: yStart + height,
        });

        PubSub.publish(PubSubTopics.TREE_ADDED, this.treeLocationMap);

        this.trees.set(tree.id, tree);
        this.spriteList.set(tree.id, sprite);
        this._renderTrees();
    }

    /**
     * @param {Tree} tree
     */
    removeTree(tree) {
        if (this.trees.has(tree.id)) {
            this.trees.delete(tree.id);
            this.spriteList.get(tree.id).destroy();
            this.spriteList.delete(tree.id);
        }
        this._renderTrees();

    }
}

export default MainGame;
