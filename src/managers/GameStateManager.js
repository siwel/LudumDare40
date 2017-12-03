import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';
import Tree from './Tree';

const GAME_CONSTANTS = {
    maxC02: 100,
};

// Not technically a singleton but should only ever be called once per game
export default class GameStateManager {
    constructor() {
        this.trees = [];
        this.population = 1;
        this.CO2Level = 0;
        this.CO2IncreasePerTick = 1;
        this.CO2DecreasePerTick = 0;
        this.balance = 20;
        this.moneyPerTick = 1;

        this.subscribeToEvents();

        console.log("GameStateManager")
    }

    get stateData() {
        return {
            trees: this.trees,
            population: this.population,
            CO2Level: this.CO2Level,
            CO2IncreasePerTick: this.CO2IncreasePerTick,
            CO2DecreasePerTick: this.CO2DecreasePerTick,
            balance: this.balance,
            moneyPerTick: this.moneyPerTick,
        };
    }

    tick() {
        this.balance += this.moneyPerTick;
        this.CO2Level += (this.CO2IncreasePerTick - this.CO2DecreasePerTick);


        //TODO: take into account co2 selling trees etc
        this.population += this.trees.length;


        this.trees.map((tree) => {
            tree.growTree();
        })
    }


    _onPurchaseRequest(msg, data) {

        if((this.balance - data.tree.saplingPrice) < 0)
        {
            alert('Not enough money for this sapling!');
            return
        }

        this.balance -= data.tree.saplingPrice;
        this._createTree(data.tree);
        PubSub.publish(PubSubTopics.PURCHASE_SUCCESS, data)
    }

    // Diff can be + or -
    _onPopulationChange(msg, data) {
        this.population += data.diff;
    }

    getBalance() {
        return this.balance;
    }

    _createTree(data) {
        this.trees.push(new Tree(data));
    }

    getCO2Level() {
        return this.CO2Level
    }



    subscribeToEvents() {
        PubSub.subscribe(PubSubTopics.PURCHASE_REQUEST, (topic, data) => {
            this._onPurchaseRequest(topic, data)
        });
        PubSub.subscribe(PubSubTopics.POPULATION_CHANGE, this._onPopulationChange.bind(this));
    }

    static get TREES() {

        return {
            "LudumTree": {
                displayName: "Ludum Tree",
                assetName: "LudumTree",
                maxAge: 300,
                valueOverTime: [0, 150, 600, 20],
                o2OverTime: [0, 300, 500, 0],
                saplingPrice: 50
            },
            "Jamboo": {
                displayName: "Jamboo",
                maxAge: 60,
                assetName: "Jamboo",
                valueOverTime: [0, 80, 60, 10],
                o2OverTime: [0, 100, 120, 0],
                saplingPrice: 10
            },
        }
    }
}