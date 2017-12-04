
export default class LoadingPage extends Phaser.State {
    constructor(msg,data)
    {
        super();

        this._data = data;
    }

    create()
    {
        this.gameEndInfo();
        let x = this.game.world.centerX - 82;
        let y = this.game.world.centerY - 95;
    }

    gameEndInfo()
    {
        this.gameName = this.add.text(this.game.world.centerX, 100, '', {
            font: '40px Patua One', fill: '#ffff00', align: 'center'
        });
        this.gameName.anchor.set(0.5,0);

        this.gameName.setText("Tree Master");


        this.title = this.add.text(this.game.world.centerX, 200, '', {
            font: '20px Patua One', fill: '#00ff00', align: 'center'
        });
        this.title.anchor.set(0.5,0);

        this.title.setText("Plant As Many Trees As You Can To Grow The Population.");


        this.help = this.add.text(this.game.world.centerX, 280, '', {
            font: '20px Patua One', fill: '#00ff00', align: 'center'
        });
        this.help.anchor.set(0.5,0);

        this.help.setText("Click On the Brown BOX to BUY Plants.");


        setTimeout(()=>
        {
            this.game.state.start('MainGame');
        },5000)

    }

}