import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
  });

  const setAuthToken = (token, expiresAt) => {
    setAuthState({ token, expiresAt });
  };

  const clearAuthToken = () => {
    setAuthState({ token: null, expiresAt: null });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
