import { useEffect } from "react";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { Outlet, Navigate } from "react-router-dom";
const PersistLogin = () => {
  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh({});
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }

    if (!token) {
      verifyRefreshToken();
    }
  }, []);

  let content = <Outlet />;

  console.log("CHECKING IS TOKEN THERE OR NOT", token);

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = (
      <div>
        <h1>Login Required</h1>
        <Navigate to="/" state={{ from: location }} replace />
      </div>
    );
  }
  return content;
};

export default PersistLogin;
