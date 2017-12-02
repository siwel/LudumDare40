const GAME_CONSTANTS = {
		maxC02: 100,
	};

const TREES = {
	// TODO list of trees available
}

const GameStateManager = (function() {
	let gameState;

	function init() {
		// Set up initial game state
		gameState = {
			trees: [],
			population: 1,
			CO2Level: 0,
			CO2IncreasePerTick: 0,
			CO2DecreasePerTick: 0,
			money: 0,
			moneyPerTick: 1, // TODO
		};
	}

	function _onPurchase(cost, tree) {
		gameState.money -= cost;
		gameState.trees.push(tree);
	}

	function _onPopulationIncrease() {
		// TODO
	}

	function getBalance() {
		// TODO
	}

	function getCO2Level() {
		// TODO
	}

	function tick() {
		// TODO: Update stuff per tick
	}

	function handlePublisherUpdate(event) {
		// TODO add handlers
	}


	return {
		getBalance,
		getCO2Level,
		init,
		tick,
	};
})();

export default GameStateManager;