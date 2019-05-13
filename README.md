## LT alpha (1.0.6)

- RMF Boilerplate (React, Mongo, Fastify)

```
Please be aware that is very early version of the project which means It's not production ready and code base / logic might change slightly over time.
```

### Prerequesities:
1. NodeJS (latest) `https://nodejs.org/en/download/current/`
2. MongoDB (latest) `https://www.mongodb.com/download-center/community`
3. Yarn `npm i -g yarn`
4. Nodemon `npm i -g nodemon`

### Install:
``` yarn ```

- Generate localhost certs at `certification` folder:
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout certification/localhost-privkey.pem -out certification/localhost-cert.pem
```

### Run:
- Development: `yarn dev` - Runs nodemon and debug mode.
- Production: `yarn start` - Runs without logging, app from build.
- Build: `yarn build` - You guess.

### Open swagger docs:
``` https://localhost/docs ```
- Or just visit `https://localhost` and click on 'DOCUMENTATION' url.

### Project strucuture:
- `server` - Simple core classes to jugle controller / routing logic.
- `server/models/*.mjs` - mongoose models.
- `server/models/functions/*.fn.mjs` - mongoose model functions.
- `server/controllers/*.ctrl.mjs` - Controllers linked to route definitions.
- `server/config/default.mjs` - Default configuration for all environments.
- `server/config/env.*.mjs` - Environment specific configuration.
- `server/config/routes.mjs` - Route definitions,


### Libraries used:
```
"fastify": "^2.3.0"
"fastify-helmet": "^3.0.0"
"fastify-mongoose": "^0.2.1"
"fastify-nextjs": "^4.1.0"
"fastify-static": "^2.4.0"
"fastify-swagger": "^2.3.2"
"jsonwebtoken": "^8.5.1"
"mongoose": "^5.5.3"
"next": "^8.1.0"
"react": "^16.8.6"
"react-dom": "^16.8.6"
```