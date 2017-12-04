import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';
import Tree from './Tree';

const GAME_CONSTANTS = {
    maxC02: 100,
};

// Not technically a singleton but should only ever be called once per game
export default class GameStateManager {
    constructor() {
        this.MAXCO2LEVEL = 10;
        this.trees = [];
        this.population = 1;
        this.CO2Level = 0;
        this.CO2IncreasePerTick = 0;
        this.CO2DecreasePerTick = 1;
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

        this.trees.map(tree => tree.growTree());

        this.CO2IncreasePerTick = this.trees.reduce((total, tree) => total + tree.getO2(), 0);

        this.CO2Level += (this.CO2IncreasePerTick - this.CO2DecreasePerTick) * -1;

        console.log("CO2", this.CO2Level, "CO2IncreasePerTick: "+ this.CO2IncreasePerTick);


        //TODO: take into account co2 selling trees etc


        this.population += this.trees.length;

        if(this.CO2Level === this.MAXCO2LEVEL)
        {
            //TODO Start to kill population
            this.population--;
        }

        if(this.population <= 0)
        {
            PubSub.publish(PubSubTopics.GAME_END, this)
        }
    }


    _onPurchaseRequest(msg, data) {

        if((this.balance - data.tree.saplingPrice) < 0)
        {
            alert('Not enough money for this sapling!');
            return
        }

        this.balance -= data.tree.saplingPrice;

        let tree = this._createTree(data.tree, data.slotNumber);


        PubSub.publish(PubSubTopics.PURCHASE_SUCCESS, tree)
    }

    _onSellRequest(msg, data) {

    }

    // Diff can be + or -
    _onPopulationChange(msg, data) {
        this.population += data.diff;
    }

    getBalance() {
        return this.balance;
    }

    _createTree(data, slot) {
        const tree = new Tree(data, slot);
        this.trees.push(tree);
        return tree;
    }

    getCO2Level() {
        return this.CO2Level
    }

    _removeTree(msg, data)
    {
        console.log(msg,data);
    }



    subscribeToEvents() {
        PubSub.subscribe(PubSubTopics.PURCHASE_REQUEST, (topic, data) => {
            this._onPurchaseRequest(topic, data)
        });
        PubSub.subscribe(PubSubTopics.POPULATION_CHANGE, this._onPopulationChange.bind(this));
        PubSub.subscribe(PubSubTopics.TREE_IS_DEAD, (topic,data) =>
        {
            this._removeTree(topic,data)
        } );
    }

    static get TREES() {

        return {
            "LudumTree": {
                displayName: "Ludum Tree",
                assetName: "LudumTree",
                maxAge: 50,
                valueOverTime: [0, 150, 600, 20],
                o2OverTime: [0, 300, 500, 0],
                saplingPrice: 50
            },
            "Jamboo": {
                displayName: "Jamboo",
                maxAge: 10,
                assetName: "Jamboo",
                valueOverTime: [0, 80, 60, 10],
                o2OverTime: [7, 33, 48, 53],
                saplingPrice: 10
            },
        }
    }

    static get CONSTANTS() {
        return {
            SLOTS: 7,
            ONE_DAY_DURATION: 1000
        }
    }
}