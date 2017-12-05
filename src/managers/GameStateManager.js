import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';
import Tree from './Tree';
import swal from 'sweetalert2'

const GAME_CONSTANTS = {
    maxC02: 100,
};

// Not technically a singleton but should only ever be called once per game
export default class GameStateManager {
    constructor() {
        this.MAXCO2LEVEL = 100;
        this.trees = [];
        this.maxPopulation = 0;
        this.population = 1;
        this.CO2Level = 0;
        this.CO2IncreasePerTick = 0;
        this.CO2DecreasePerTick = 1;
        this.balance = 20;
        this.moneyPerTick = 1;

        this.populationAddingCO2 = 0;

        this.subscribeToEvents();

        console.log("GameStateManager")
    }

    get stateData() {
        return {
            trees: this.trees,
            population: this.population,
            maxPopulation: this.maxPopulation,
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

        this.CO2DecreasePerTick = this.trees.reduce((total, tree) => total + tree.getO2(), 0);

        this.populationAddingCO2 = Math.floor(5*this.population/100);

        if(this.CO2Level < 25)
        {
            this.CO2Level = Math.floor(this.populationAddingCO2*3);
        }


        this.CO2Level -= this.CO2DecreasePerTick;

        this._currentCO2 = (this.populationAddingCO2 * 100/this.MAXCO2LEVEL);

        if(this.CO2Level >= 99)
        {
            this.CO2Level = 99;
        }

        if(this.CO2Level <=0)
        {
            this.CO2Level = 0;
        }

        console.log("CO2 level: "+this.CO2Level);
        console.log("this.population: "+this.population);
        console.log("this.populationAddingCO2: "+this.populationAddingCO2);


        if(this.CO2Level < 25)
        {
            if(this.population < 25)
            {
                this.population +=2;
            }

            else if(this.population < 100)
            {
                this.population +=3;
            }


            else if(this.population < 200)
            {
                this.population +=5;
            }
            else
                {
                    this.population +=10;
                }

        }
        else if(this.CO2Level > 25 && this.CO2Level < 50)
        {
            //TODO Start to kill population
            let killingRate = Math.floor(10*this.population/100);
            console.log("killingRate0: "+killingRate)
            this.population -= killingRate ? killingRate:1;
        }
        else if(this.CO2Level > 50 && this.CO2Level < 75)
        {
            let killingRate = Math.floor(10*this.population/100);
            console.log("killingRate1: "+killingRate)
            this.population -= killingRate ? killingRate:1;
        }
        else if(this.CO2Level > 75)
        {
            let killingRate = Math.floor(10*this.population/100);
            console.log("killingRate2: "+killingRate)
            this.population -= killingRate ? killingRate:1;
        }

        if(this.population > this.maxPopulation)
        {
            this.maxPopulation = this.population;
        }

        if(this.population <= 0)
        {
            PubSub.publish(PubSubTopics.GAME_END, this)
        }

    }


    _onPurchaseRequest(msg, data) {

        if((this.balance - data.tree.saplingPrice) < 0)
        {
            swal({
                title: 'Not enough money',
                text: 'Try selling some trees/wood at the optimal tree age to raise some money',
                confirmButtonText: 'Ok'
            });
            return
        }

        this.balance -= data.tree.saplingPrice;

        let tree = this._createTree(data.tree, data.slotNumber);


        PubSub.publish(PubSubTopics.PURCHASE_SUCCESS, tree);
        PubSub.publish(PubSubTopics.BALANCE_UPDATE, this.balance);
    }

    _onSellRequest(msg, data) {
        console.log(data);
        this.balance += data.tree.getValue();
        PubSub.publish(PubSubTopics.SELL_SUCCESS, data);
        PubSub.publish(PubSubTopics.BALANCE_UPDATE, this.balance);
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
        return this.CO2Level;
    }

    _removeTree(msg, data)
    {
        console.log(msg,data);
    }


    getPopulation()
    {
        return this.population;
    }


    subscribeToEvents() {
        PubSub.subscribe(PubSubTopics.PURCHASE_REQUEST, (topic, data) => {
            this._onPurchaseRequest(topic, data)
        });
        PubSub.subscribe(PubSubTopics.SELL_REQUEST, this._onSellRequest.bind(this));
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
                saplingPrice: 50,
                growthRate:1
            },
            "Jamboo": {
                displayName: "Jamboo",
                maxAge: 10,
                assetName: "Jamboo",
                valueOverTime: [0, 80, 60, 10],
                o2OverTime: [7, 33, 48, 0],
                saplingPrice: 10,
                growthRate:1
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