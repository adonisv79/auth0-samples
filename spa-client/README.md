[> Back](/README.md)

# Auth0 Client

This is a sample project created from the Auth0 official tutorial for creating SPA applications https://auth0.com/docs/quickstart/spa/react/01-login. 

Before going to the [SPA Guide](/docs/SPA_GUIDE.md), you need to setup your local environment first. We will assume you have started a SPA web client app. Since I am a react+nodejs developer, my samnple is in reactjs.

## Step1: Create your app

First you need to have your app set and running. A quick way is to use [VITE](https://vite.dev/guide/) which allows creating Angular, React, Vue and more.

```
npm create vite@latest my-react-app -- --template react
```

## Step2: add the auth0 dependencies

cd into your client folder and run the following

```
npm i @auth0/auth0-react
```

## Step3: Set your .env

You will find the `.env.sample` file inside this spa-client folder. Copy those configs into your `.env` or `.env.local` file.

## Step 4: Implement the client side AUth0 library

We basically just reuse the react hook `useAuth0`. Copy Auth0 implementations inside the sample pages and components page.

1. check out main.tsx

    * import the vite environment items

      ```
      const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
      const auth0Audience = import.meta.env.VITE_API_URL;
      const auth0Scope = import.meta.env.VITE_AUTH0_SCOPE;
      ```
    * Wrap your <App/> inside the Auth0Provider

      ```
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: auth0Audience,
          scope: auth0Scope
        }}
      >
        <App />
      </Auth0Provider>
      ```

## Step 5: Create your AUTH0 project and update the `.env` config

We are now ready for making the SPA client authentication work grasshopper. Go to [SPA Guide](/docs/SPA_GUIDE.md)
make sure to have [setup your api server](/spa-server/README.md) as well before doing so