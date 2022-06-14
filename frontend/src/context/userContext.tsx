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
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const initialValue = {
  users: [
    {
      id: 0,
      name: '',
      email: '',
      password: ''
    }
  ],
  setUsers: () => [{}]
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [users, setUsers] = useState(initialValue.users);
  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>;
};
