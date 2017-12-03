export default class Ticker {

    /**
     * @param {GameStateManager} gameState
     */
	constructor(gameState)
	{
		this._gameState = gameState;
	}

	tick() {
        this._gameState.tick();
	}
}