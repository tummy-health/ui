import useQuery, { ApiError, gql } from 'hooks/useQuery';

const useEntries = (): {
  isLoading: boolean;
  entries?: Entry[];
  error?: ApiError;
} => {
  const {
    data,
    error,
    loading: isLoading,
  } = useQuery<{ entries: Entry[] }>({ query: GET_ENTRIES });
  const { entries } = data || {};
  return { entries, error, isLoading };
};

export const GET_ENTRIES = gql`
  query GetEntries {
    entries {
      date
      id
      notes
      ratingOutOfFive
    }
  }
`;

interface Entry {
  date: string;
  id: string;
  notes: string;
  ratingOutOfFive: number;
}

export default useEntries;
