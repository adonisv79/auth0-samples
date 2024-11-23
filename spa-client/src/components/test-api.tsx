import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function TestApiComponent() {
  const auth0Audience = import.meta.env.VITE_API_URL;
  const auth0Scope = import.meta.env.VITE_AUTH0_SCOPE;
  const getCurrentUserInfoUrl = `${auth0Audience}/users/info`;

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ userInfo, setUserInfo] = useState({});
  const testClicked = async () => {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: auth0Audience,
        scope: auth0Scope,
      },
    });
    const response = await fetch(`${getCurrentUserInfoUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUserInfo(await response.json());
  };
  return (
    <div>
      <button disabled={!isAuthenticated} onClick={testClicked}>
        <h4>Click to fetch latest data from /userinfo</h4>
      </button>
      <p>{JSON.stringify(userInfo)}</p>
    </div>
  );
}
