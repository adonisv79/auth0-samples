import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/login-button";
import LogoutButton from "../components/logout-button";
import TestApiComponent from "../components/test-api";

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <p>Please login</p>
          <LoginButton />
        </>
      ) : (
        <>
          <div>
            <img src={user?.picture} alt={user?.name} />
            <h2>Hello {user?.name}!</h2>
            <p>{user?.email}</p>
          </div>
          <LogoutButton />
        </>
      )}
      <TestApiComponent />
    </div>
  );
}
