## MFN (Mongo, Fastify, Next) Boilerplate

```
Please be aware that is very early version of the project which means It's not production ready and code base / logic might change slightly over time.
```

```
Docs will come with time as soon as I'll have my main roadmap done on this.
```

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
    * `yarn dev:server` - Runs API server with nodemon and chrome debugger
    * `yarn dev:client` - Runs Next (react) app in development mode

- Production:
    * `yarn prod:server` - Runs API server without logging
    * `yarn dev:server` - Builds & Runs next app from build

- Build: `yarn build` - Manually re-build Next app.

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
- `server/config/routes.mjs` - Route definitions.
- `server/middlewares/*.mjs` - Route middlewares.
- `app/*` - React APP with SSR support


### Libraries used:
```
"@material-ui/core": "^4.0.0-beta.2"
"@material-ui/icons": "^4.0.0-beta.0"
"fastify": "^2.3.0"
"fastify-helmet": "^3.0.0"
"fastify-mongoose": "^0.2.1"
"fastify-nextjs": "^4.1.0"
"fastify-static": "^2.4.0"
"fastify-swagger": "^2.3.2"
"isomorphic-unfetch": "^3.0.0"
"jsonwebtoken": "^8.5.1"
"mongoose": "^5.5.3"
"next": "^8.1.0"
"react": "^16.8.6"
"react-dom": "^16.8.6"
"sonic-boom": "^0.7.3"
```