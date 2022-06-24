import { useContext } from 'react';

import AuthContext from 'context/Auth';

const useAuth = (): {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  return { isAuthenticated, login, logout };
};

export default useAuth;
