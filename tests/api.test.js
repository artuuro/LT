import 'isomorphic-unfetch';

export default class {
    constructor(instance) {
        this.routes = instance.config.routes;
    }

    async test() {
 
        return true; //haha
    }

    async conditions() {
        
        const results = [{
            desc: 'routes awailable',
            test: await this.test() // true
        }];

        return results;
    }
}