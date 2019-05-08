# LT_1.0.5

- Backend API boilerplate

### Prerequesities:
- MongoDB
- NodeJS 11.14.0
- nodemon `npm i -g pm2`
- pm2 `npm i -g pm2`

### Install:
``` yarn ```

- Generate localhost certs at `certification` folder:
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout certification/localhost-privkey.pem -out certification/localhost-cert.pem
```

### Run:
``` yarn dev ```

### Open swagger docs:
``` https://localhost/docs ```

