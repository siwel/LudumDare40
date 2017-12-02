export default class Tree{

    constructor(assetName,maxAge,value)
    {
        this._assetName = assetName;
        this._age = 1;
        this._maxAge = maxAge;
        this._id = new Date().toISOString ();
        this._life = false;
        this._vaule = value?value:1;

        console.log("tree");
    }

    growTree()
    {
        this._age++;

        this._remainLife = this._age * this._maxAge/100;
        Math.parseInt(this._remainLife) < 50? this._vaule++: this._vaule--;
        this._checkAge();
    }

    getValue()
    {
        return this._vaule;
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