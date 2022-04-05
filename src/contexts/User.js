import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: { accessToken: null },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const setUser = ({ accessToken }) => {
    setUserInfo({ accessToken });
  };
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };