import { useContext } from 'react';

import ApiContext from 'context/Api';

const useApi = (): { isReady: boolean } => {
  const { isReady } = useContext(ApiContext);
  return { isReady };
};

export default useApi;
