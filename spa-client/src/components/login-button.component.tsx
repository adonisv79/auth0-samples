import { useAuth0 } from "@auth0/auth0-react";

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.split(" ");
  const initials = parts.map((part) => part[0].toUpperCase());
  return initials.slice(0, 2).join("");
};

const LoginButton = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <img
          src={user?.picture}
          title={user?.name}
          alt={getInitials(user?.name)}
          className="h-10 w-10 rounded-full font-bold bg-gray-500 text-white flex items-center justify-center border-2 border-gray-200"
        />

        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">{user?.name}</span>
          <button
            className="text-sm text-red-500 hover:text-red-700"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: { scope: "openid profile email" },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
