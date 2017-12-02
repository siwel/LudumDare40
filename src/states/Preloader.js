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

        this.game.load.image('background','image/desert_BG.png');
        this.game.load.spritesheet('target', 'target.png',128.66,128);
        this.game.load.audio('bgSound','sound/bensound-betterdays.mp3');

    }

    onLoadComplete() {
        this.game.state.start('MainGame');
    }
}

export default Preloader;
