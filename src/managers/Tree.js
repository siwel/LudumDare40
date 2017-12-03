export default class Tree {

    constructor(assetName,maxAge,value)
    {
        this._assetName = assetName;
        this._age = 1;
        this._maxAge = maxAge;
        this._id = new Date().toISOString ();
        this._life = false;
        this._value = value?value:1;

        console.log("Tree created.");
    }

    growTree()
    {
        this._age++;

        this._remainLife = this._age * this._maxAge/100;
        parseInt(this._remainLife) < 50 ? this._value++: this._value--;
        this._checkAge();

        return this;
    }

    getValue()
    {
        return this._value;
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