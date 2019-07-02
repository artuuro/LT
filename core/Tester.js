import * as runners from '../tests';

export default class {
    constructor(instance) {
        this.instance = instance;
        this.testNames = Object.keys(runners);
        this.tests = new Set(this.tests);
        this.failed = [];
    }

    async run() {
        const { log } = this.instance.server;

        log.info(`Queued tests -> [${this.testNames.join(', ')}]`);

        for (const feature of this.testNames) {
            log.info(`Testing -> ${feature}`);
            const runner = new runners[feature](this.instance);
            const failedConditions = [];
            const conditions = await runner.conditions();

            for (const { desc, test } of conditions) {
                if (test) {
                    log.info(`${feature} -> ${desc} [ok]`);
                } else {
                    failedConditions.push(desc);
                }
            }
            
            if (failedConditions.length) {
                this.failed.push({
                    test: feature,
                    conditions: failedConditions
                });
            }
        }

        if (this.failed.length) {
            log.error(`(FAILED)`, this.failed);
        } else {
            log.info(`Testing complete`);
        }
    }
}