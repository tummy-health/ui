import { useContext } from 'react';

import AuthContext from 'context/Auth';

const useAuth = (): {
  getToken?: () => Promise<{ token: string }>;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} => {
  const { getToken, isAuthenticated, login, logout } = useContext(AuthContext);
  return { getToken, isAuthenticated, login, logout };
};

export default useAuth;
