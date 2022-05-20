import React, { useState, createContext, ReactNode } from 'react';

type UserContextProps = {
  children: ReactNode;
};

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserContextType = {
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const initialValue = {
  allUsers: [
    {
      id: 0,
      name: '',
      email: '',
      password: ''
    }
  ],
  setAllUsers: () => [{}]
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [allUsers, setAllUsers] = useState(initialValue.allUsers);
  return <UserContext.Provider value={{ allUsers, setAllUsers }}>{children}</UserContext.Provider>;
};
