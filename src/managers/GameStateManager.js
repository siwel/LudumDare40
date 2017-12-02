import PubSub from 'pubsub-js';
//TODO need different pubsub
//import PubSub from 'singleton-pubsub'
import PubSubTopics from '../PubSubTopics';
import Tree from './Tree';

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

		console.log("GameStateManager")
	}

	_onPurchase(msg, data) {
		this.money -= data.cost;
		this._createTree(data.tree,data.age);
	}

	// Diff can be + or -
	_onPopulationChange(msg, data) {
		this.population += data.diff;
	}

	getBalance() {
		return this.money;
	}

	_createTree (data)
	{
		this.trees.push(new Tree(data.image,data.age,data.value));
	}

	getCO2Level() {
		return this.CO2Level
	}

	tick() {
		this.money += this.moneyPerTick;
		this.CO2Level += (this.CO2IncreasePerTick - this.CO2DecreasePerTick);

		this.trees.map((tree)=>{
			tree.growTree();
		})
	}

	subscribeToEvents() {
		PubSub.subscribe(PubSubTopics.PURCHASE, this._onPurchase.bind(this));
		PubSub.subscribe(PubSubTopics.POPULATION_CHANGE, this._onPopulationChange.bind(this));
	}
}