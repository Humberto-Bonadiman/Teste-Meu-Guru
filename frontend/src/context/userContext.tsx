import React, { useState, createContext, ReactNode } from "react";

type UserContextProps = {
  children: ReactNode;
};

type UserContextType = {
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
};

const initialValue = {
  user: {},
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState(initialValue.user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
