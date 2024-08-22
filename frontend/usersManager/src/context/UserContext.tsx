import React, { ReactNode, useEffect } from "react";
import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from "react";
import { User } from "../types";
import {
  userReducer,
  initialState,
  UserActions,
  UserState,
} from "../reducers/user-reducer";
import { useUsers } from "../hooks/use-users";

type UserContextProps = {
  state: UserState;
  dispatch: Dispatch<UserActions>;
  users: User[];
  setUser: Dispatch<React.SetStateAction<User[]>>;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(null!);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [users, setUser] = useState<User[]>([]);
  const { users: fetchedUsers, error, isLoading } = useUsers();

  useEffect(() => {
    if (!isLoading && !error) {
      setUser(fetchedUsers);
    }
  }, [fetchedUsers, isLoading, error]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        users,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
