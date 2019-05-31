## API Starter (boilerplate) using Fastify & MongoDB (Mongoose)

### Prerequesities:
1. NodeJS (latest) `https://nodejs.org/en/download/current/`
2. MongoDB (latest) `https://www.mongodb.com/download-center/community`
3. Yarn `npm i -g yarn`
4. Nodemon `npm i -g nodemon`

### Install:
``` yarn && yarn upgrade ```

- Generate localhost certs at `certification` folder:
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout certification/localhost-privkey.pem -out certification/localhost-cert.pem
```

### Run:
- Development: 
    * `yarn dev` - Runs API server with nodemon and remote debugger
    * `yarn test` - Same as above, includes automated testing
    
- Production:
    * `yarn prod` - Runs API server without logging

### Open swagger docs:
``` https://localhost/docs ```
- Or just visit `https://localhost` and click on 'DOCUMENTATION' url.

### Project strucuture:
- `services/*.mjs` - Services connecting everything together.
- `config/default.mjs` - Default configuration for all environments.
- `config/env.*.mjs` - Environment specific configuration.
- `models/*.mjs` - mongoose models.
- `models/functions/*.fn.mjs` - mongoose model functions.
- `config/routes.mjs` - Routes.
- `controls/*.ctrl.mjs` - Route controls.
- `middlewares/*.mjs` - Control middlewares.
- `tests/*.test.mjs` - Tests.
- `client/*` - Static PWA (WIP).

_New tests, controls, middlewares and models must be imported/exported at respective folders `index.mjs` file_