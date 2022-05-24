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
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const initialValue = {
  user:     {
    id: 0,
    name: '',
    email: '',
    password: ''
  },
  setUser: () => {},
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
  const [user, setUser] = useState(initialValue.user);
  return <UserContext.Provider value={{ user, setUser, allUsers, setAllUsers }}>{children}</UserContext.Provider>;
};
