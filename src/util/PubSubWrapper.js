import PubSub from 'pubsub-js';

let instance = null;

class PubSubWrapper{
    constructor() {
        if(!instance){
            instance = this;
        }
        this.pubSub = PubSub;
        return instance;
    }
}
export default new PubSubWrapper().pubSub;

