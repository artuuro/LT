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

- Production:
    * `yarn prod` - Runs API server without logging

### Open swagger docs:
``` https://localhost/docs ```
- Or just visit `https://localhost` and click on 'DOCUMENTATION' url.

### Project strucuture:
- `server` - Core classes to do controller / routing magic.
- `server/models/*.mjs` - mongoose models.
- `server/models/functions/*.fn.mjs` - mongoose model functions.
- `server/controllers/*.ctrl.mjs` - Controllers linked to route definitions.
- `server/config/default.mjs` - Default configuration for all environments.
- `server/config/env.*.mjs` - Environment specific configuration.
- `server/config/routes.mjs` - Route definitions.
- `server/middlewares/*.mjs` - Route middlewares.