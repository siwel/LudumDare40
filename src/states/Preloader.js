class Preloader extends Phaser.State {

    constructor() {
        super();
        this.asset = null;
        this.ready = false;
    }

    preload() {
        //setup loading bar
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);

        //Setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    }

    loadResources() {

        this.game.load.image('background','image/blueBg.png');

        // Some trees
        this.game.load.image('LudumTree', 'image/LudumTree.png');
        this.game.load.image('LudumTreeSapling', 'image/LudumTreeSapling.png');
        this.game.load.image('Jamboo', 'image/Jamboo.png');
        this.game.load.image('JambooSapling', 'image/JambooSapling.png');

        //this.game.load.spritesheet('target', 'target.png',128.66,128);
        this.game.load.audio('bgSound','sound/bensound-betterdays.mp3');
        //this.game.load.image('levelButton','image/levelButton.png');
        this.game.load.image('ground','image/ground.png');

    }

    onLoadComplete() {
        this.game.state.start('MainGame');
    }
}

export default Preloader;
