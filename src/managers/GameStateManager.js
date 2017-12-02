import PubSub from 'pubsub-js';
import PubSubTopics from './PubSubTopics';

const GAME_CONSTANTS = {
		maxC02: 100,
	};

const TREES = {
	// TODO list of trees available
}

// Not technically a singleton but should only ever be called once per game
export default class GameStateManager {
	constructor() {
		this.trees = [];
		this.population = 1;
		this.CO2Level = 0;
		this.CO2IncreasePerTick = 0;
		this.CO2DecreasePerTick = 0;
		this.money = 0;
		this.moneyPerTick = 1;

		this.subscribeToEvents();
	}

	_onPurchase(msg, data) {
		this.money -= data.cost;
		this.trees.push(data.tree);
	}

	// Diff can be + or -
	_onPopulationChange(msg, data) {
		this.population += data.diff;
	}

	getBalance() {
		return this.money;
	}

	getCO2Level() {
		return this.CO2Level
	}

	tick() {
		this.money += this.moneyPerTick;
		this.CO2Level += (this.CO2IncreasePerTick - this.CO2DecreasePerTick)
	}

	subscribeToEvents() {
		PubSub.subscribe(PubSubTopics.PURCHASE, this._onPurchase.bind(this));
		PubSub.subscribe(PubSubTopics.POPULATION_CHANGE, this._onPopulationChange.bind(this));
	}
}