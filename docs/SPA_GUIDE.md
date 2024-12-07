[> Back](/README.md)

# AUTH0 Single Page Apps

Auth0 makes it easy to authenticate for Single Page Apps. Technically, the web client will sign-in to Auth0 directly (no need for a server from your end). Of course this will do nothing much as your goal is to utilize this access to identify against your secured backend. To prepare for this sample, go to the `spa-client` folder. Copy the `.env.sample` file and just name it `.env`. After that go to `spa-server` project and do the same.

Note that this guide sets up your dev environment. When using social media authentications like Google Auth, you will need to get your own developer keys and not use the ones provided by Auth0. These are just dev key and can be unsafe in production environments. for more details on this, see https://auth0.com/docs/authenticate/identity-providers/social-identity-providers/devkeys 

## Auth0 Client Application

### Create the Auth0 SPA Application Configuration

The first step to create a SPA application in Auth0

![Single page app creation](/docs//images/spa-create-app.png)

After creation, you will be provided the details you need to setup your client authentication

* Domain - Modify the `spa-client` module's  `.env` config for `VITE_AUTH0_DOMAIN` value to this. Also modify the `spa-server` module's `.env` config for `AUTH0_DOMAIN` to this.
* Client Id - Modify your `.env` file's `VITE_AUTH0_CLIENT_ID` value to this

![Single page app details](/docs//images/spa-app-details.png)

Now we will need to set this application to allow us to work on our local machine. This requires setting up the redirect URI else when you sign-in, you will get this error

![Single page app redirect_uri mismatch](/docs//images/spa-error-redirect-uri.png)

In the settings tab of the Auth0 application, scroll to the `Application URIs` section and make sure to add `http://localhost:3000` to the list.

![Add Application URIs](/docs/images/spa-app-uri-settings.png)

You can then change the strategies you can use. In our case we just allow facebook login or google.

![Set Application Strategies/Connections](/docs/images/spa-app-connections.png)

### Run the Client

* open a terminal and cd into `spa-client`
* run the vite created reactjs app with `npm run dev`
* it will run on [http://localhost:3000](http://localhost:3000)
* click the login button and you will automatically be sent to the Auth0 login page.

    ![Login Application select Strategy/Connections](/docs/images/spa-app-login-strategy-select.png)
* after loging in, you will be able to see details about your account. 
* (Optional) logout and try the other strategy.

## Auth0 Server Application

The previous sample showcased how you can use Auth0 SPA without a server. However, the main point of security is making your service identify the user trying to use your service. Here we will create an Auth0 server API that the client will connect with. but first we must set the redirect_uri for our client (we set this in the config for this project)

* Go to the `spa-client` module and open the .env file you made.
* Set `VITE_API_URL` to `http://localhost:5000`
* save and try logging in again to the application. It will appear as if nothing happened but look at the uri in the your browser's search bar and it will contain the following
  `?error=access_denied&error_description=Service%20not%20found%253A%20http%253A%252F%252Flocalhost%253A5000`. This is because Auth0 does not have the API service config you are redirecting to. We will set it up in the next section.

### Create the Auth0 SPA API Configuration

* Go to your tenant and select `APIs` under the `Applications` group. This is found in the sidebar. 
* click `create api`

    ![Create API](/docs/images/spa-api-create.png)

* Lets set this for your local development so set the following
  * identifier - set this to `localhost:5000` this is important as this will be used as the redirect_uri
  * JWT Profile - leave as Auth0
  * Signing Algorith - RS256
* Finally, click the Create button.

### Run the server with the client

* open a terminal and cd into `spa-server`
* run the nestjs app with `npm run start:dev`
* it will run on [http://localhost:5000](http://localhost:5000)
* In your browser login again from [http://localhost:3000](http://localhost:3000)
* Once logged-in, click the `fetch ldata from /userinfo` button. This connects to the nestjs secured endpoint in `http://localhost/5000`
* When you retrieve the JSON data, your setup is working.
