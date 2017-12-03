export default class Tree {

    constructor(treeData)
    {
        this._treeData = treeData;
        this._assetName = treeData.assetName;
        this._age = 1;
        this._maxAge = treeData.maxAge;
        this._id = new Date().toISOString ();
        this._life = false;
        this._value = treeData.valueOverTime[0];
        this._valueOverTime = treeData.valueOverTime;
        this._o2 = treeData.o2OverTime[0];
        this._o2OverTime = treeData.o2OverTime;

        this._ageValues = this._getAgeValues();

        console.log("Tree created.");
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

    growTree()
    {
        this._age++;

        this._remainLife = this._age * this._maxAge/100;
        this._checkAge();


        let ageIndex = 0;
        // Find largest age category we fit into
       for (let i = 0; i < this._ageValues.length; i++) {
            if (this._age <= this._ageValues[i]) {
                break;
            }
            ageIndex = i;
       }
       this._o2 = this._o2OverTime[ageIndex];
       this._value = this._valueOverTime[ageIndex];

        return this;
    }
    
    _checkAge()
    {
        if(this._age >= this._maxAge)
        {
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
        return this._o2;
    }

    getValue()
    {
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

    getAssetName()
    {
        return this._assetName;
    }
}