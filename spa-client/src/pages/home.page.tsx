import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/login-button.component";
import TestApiComponent from "../components/test-api.component";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {!isAuthenticated && <p>Please login</p>}
      <LoginButton />
      <TestApiComponent />
    </div>
  );
}
