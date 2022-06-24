import { useContext } from 'react';

import AuthContext from 'context/Auth';

const useAuth = (): { isAuthenticated: boolean; login: () => void } => {
  const { isAuthenticated, login } = useContext(AuthContext);
  return { isAuthenticated, login };
};

export default useAuth;
