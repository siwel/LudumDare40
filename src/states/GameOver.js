
import Button from '../util/Button'

export default class GameOver extends Phaser.State {
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
        this.gameOverText = this.add.text(this.game.world.centerX, 100, '', {
            font: '40px Patua One', fill: '#ffffff', align: 'center'
        });
        this.gameOverText.anchor.set(0.5,0);

        this.gameOverText.setText("Game Over");

        this.co2Level = this.add.text(this.game.world.centerX, 180, '', {
            font: '25px Patua One', fill: '#ffff00', align: 'center'
        });
        this.co2Level.anchor.set(0.5,0);

        this.co2Level.setText("CO2 Level: "+this._data.CO2Level);

        this.people = this.add.text(this.game.world.centerX, 220, '', {
            font: '25px Patua One', fill: '#ffff00', align: 'center'
        });
        this.people.anchor.set(0.5,0);

        this.people.setText("Population: "+this._data.population);


        this.people = this.add.text(this.game.world.centerX, 300, '', {
            font: '25px Patua One', fill: '#ffff00', align: 'center'
        });
        this.people.anchor.set(0.5,0);

        this.people.setText("RELOAD TO RESTART GAME");

    }

}