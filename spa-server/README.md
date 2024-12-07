[> Back](/README.md)

# Auth0 API

This is a sample project created from the Auth0 official tutorial for creating APIs https://auth0.com/docs/api

Before going to the [SPA Guide](/docs/SPA_GUIDE.md), you need to setup your local environment first. We will assume you have started a NodeJS based RESTfull service. Since I am a react+nodejs developer, my samnple is in NestJS.

## Step1:Create your api service

First you need to have your api set and running. A quick way is to use [NestJS](https://docs.nestjs.com/) which allows creating an enterprise grade Express-based RESTfull API for nodejs. Just follow the official guide as it is pretty straight-forward

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

## Step2: add the dependencies

cd into your server folder and run the following

```
npm i @nestjs/config '@nestjs/passport jwks-rsa passport-jwt axios
```

## Step2: Set your .env, configurations and auth module

1. If you have not done so already, create a folder in the root called config. This is what is used by the `@nestjs/config` library we just installed. Copy the configurations in the [this sample](/spa-server/config/configuration.ts) file.

2. set your .env files by copying the [.env.sample file here](/spa-server/.env.sample). set `SEC_CORS_ALLOWED_ORIGINS` to the correct localhost port you run your client or you will be blocked by CORS rule. ex: `SEC_CORS_ALLOWED_ORIGINS=http://localhost:3000`

3. copy the [auth module](/spa-server/src/auth/) into your local project

4. copy the [users module](/spa-server/src/users/) into your local project

5. Go to your app.module.ts and make sure the ConfigModule and the AuthModule is imported just like in the sample [here](/spa-server/src/app.module.ts).

We are now ready for making the API server authentication work grasshopper. Go to [SPA Guide](/docs/SPA_GUIDE.md)
make sure to have [setup your client](/spa-client/README.md) as well before doing so
