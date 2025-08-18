import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../types/interfaces";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken: string) => {
    const user = jwtDecode<IUser>(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
}
