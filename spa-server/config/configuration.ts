export type APIConfiguration = {
  port: number;
  url: string;
};

export type AuthConfiguration = {
  domainUri: string;
};

type Configuration = {
  api: APIConfiguration;
  auth: AuthConfiguration;
};

export default (): Configuration => ({
  api: {
    port: parseInt(process.env.PORT, 10) || 5000,
    url: process.env.API_URL || 'http://localhost:5000',
  },
  auth: {
    domainUri: `https://${process.env.AUTH0_DOMAIN}`,
  },
});
