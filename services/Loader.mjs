import fastify from 'fastify';
import helmet from 'fastify-helmet';
import swagger from 'fastify-swagger';
import { Registry, Tester, config } from './';

export default class {
    constructor(params) {
        this.config = config(params);

        this.modules = new Set(this.config.features);

        this.server = fastify({
            http2: this.config.HTTP2,
            https: this.config.SSL,
            logger: {
                prettyPrint: true
            },
            ignoreTrailingSlash: true
        });

        this.server.log.info(`Queued services: [${this.config.features.join(', ')}]`);
    }

    async test() {
        if (this.config.test) {
            this.tester = new Tester(this);
            await this.tester.run();
        }
    }

    async run() {
        try {
            await this.register();
            this.server.config.host = await this.server.listen(this.config.PORT);
            await this.server.swagger();
            await this.test();
        } catch (error) {
            await this.server.log.error(error);
            return process.exit(1);
        }
    }

    register() {
        try {
            const self = this;
            const registry = new Registry(self);

            self.server.register(helmet, self.config.HELMET);

            if (self.config.development) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                self.server.register(swagger, self.config.SWAGGER);
            }
            
            self.server.config = self.config;

            registry.map(register => {
                if (self.modules.has(register.name) || !register.name) {
                    register.hook();
                    if (register.name) self.server.log.info(`[${register.name}] loaded`);
                }
            });

        } catch (error) {
            throw new Error(`Failed to load server`, error);
        }
    }

}