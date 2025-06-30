import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Pages/Auth/authSlice";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  username: string;
  email: string;
}

export const useAuth = () => {
  const accessToken = useSelector(selectCurrentToken);

  if (accessToken) {
    const { username, email }: DecodedToken = jwtDecode(accessToken);

    return {
      username,
      email,
    };
  }

  return {
    username: null,
    email: null,
  };
};
