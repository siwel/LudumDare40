export default class Button extends Phaser.Sprite{

    constructor(game, x, y,spriteName , frame, value, callback) {
        super(game, x, y, spriteName, frame);

        // console.log("Button", game);

        this.anchor.setTo(0.5, 0.5);

        this.scale.setTo(4,1);

        //set click event
        this.inputEnabled = true;
        this._id = value;

        this.events.onInputDown.add(this.clicked, this);
        this.x = x;
        this.y = y;
        this.callBack = callback;
    }

    clicked()
    {
        // console.log(this._id);
        const ready_tween = this.game.add.tween(this.scale)
            .to({ x: 3.5, y: 1.1}, 500, Phaser.Easing.Linear.In,false,0,1,true);

        ready_tween.start();

        setTimeout(()=>{
            this.callBack();
        }, 800)
    }

    addValue ()
    {
        let style = { font: "25px Patua One", fill: "#000" ,align: "center"};
        let text = this.game.add.text(this.x, this.y, this._id, style);
        text.anchor.set(0.5);

    }

}

