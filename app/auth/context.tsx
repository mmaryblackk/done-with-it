import React from "react";
import { IUser } from "../types/interfaces";

interface IAuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = React.createContext<IAuthContextType>({
  user: null,
  setUser: () => {},
});

export default AuthContext;
