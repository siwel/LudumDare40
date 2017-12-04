import PubSub from '../util/PubSubWrapper';
import PubSubTopics from '../PubSubTopics';

export default class Tree {

    constructor(treeData, slotNumber)
    {
        this._slotNumber = slotNumber;
        this._treeData = treeData;
        this._assetName = treeData.assetName;
        this._age = 1;
        this._maxAge = treeData.maxAge;
        this._id = new Date().toISOString ();
        this._life = true;
        this._value = treeData.valueOverTime[0];
        this._valueOverTime = treeData.valueOverTime;
        this._o2 = treeData.o2OverTime[0];
        this._o2OverTime = treeData.o2OverTime;

        this._changeRate = treeData.growthRate;

        this._ageValues = this._getAgeValues();

        console.log("Tree created.");
    }

    get treeData() {
        return this._treeData;
    }

    get id()
    {
        return this._id;
    }

    _getAgeValues() 
    {
        const numDivisions = this._valueOverTime.length;
        const divisions = [];

        // Get age values for/from graph
        for (let i = 0; i < numDivisions - 1; i++) {
            divisions.push(i * Math.round(this._maxAge / numDivisions));
        }
        divisions.push(this._maxAge);

        return divisions;
    }

    _growTree()
    {
        if(!this._life)
        {
            return;
        }

        this._age += this._changeRate;
        console.log("Tree Age: 11", this._age , this._changeRate);
        

        this._currentAge = this._age *100/this._maxAge;

        if(this._currentAge <= 25)
        {
            this._o2 = this._o2OverTime[0];
            this._value = this._valueOverTime[0];

        }
        else if(this._currentAge >25 && this._currentAge <= 50)
        {
            this._o2 = this._o2OverTime[1];
            this._value = this._valueOverTime[1];

        }
        else if(this._currentAge > 50 && this._currentAge <= 75)
        {
            this._o2 = this._o2OverTime[2];
            this._value = this._valueOverTime[2];
        }
        else
        {
            this._o2 = this._o2OverTime[3];
            this._value = this._valueOverTime[3];
        }

        

        this._o2/25 * this._changeRate;
        this._value/25 * this._changeRate;

        return this;
    }

    growTree()
    {

        this._checkAge();


       return this._growTree();
    }
    
    _checkAge()
    {
        if(this._age >= this._maxAge)
        {
            PubSub.publish(PubSubTopics.TREE_IS_DEAD, this);
            this._life =false;
        }
    }

    getRemainLife()
    {
       return this._remainLife;
    }

    getAge()
    {
        return this._age;
    }

    getO2() 
    {
        if(this._life)
        {
            return this._o2;
        }

        return 0;

    }

    getValue()
    {
        console.log("Getting value", this._value);
        return this._value;
    }

    plantTree()
    {
        this._life = true;
    }

    cutTree()
    {
        this._life = false;
    }


    getMaxAge()
    {
        return this._treeData.maxAge;
    }

    getAssetName()
    {
        return this._assetName;
    }

    getSlotNumber()
    {
        return this._slotNumber;
    }
}