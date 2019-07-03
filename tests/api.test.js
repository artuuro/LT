import 'isomorphic-unfetch';

export default class {
    constructor(instance) {
        this.routes = instance.config.routes;
    }

    async test() {
        // console.log(this.routes);
        /**
         * How this will happen?
         * - iterate through routes
         * - setup fetch configuration for each of them
         * - promise all of them
         * - return issues / non-issues
         */
        return true; //haha
    }

    async conditions() {
        const results = [{
            desc: 'routes awailable',
            test: await this.test()
        }];
        return results;
    }
}