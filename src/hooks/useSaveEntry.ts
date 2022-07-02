import { gql, useMutation } from '@apollo/client';

const useSaveEntry = (): {
  isLoading: boolean;
  savedEntry?: { id: string };
  saveEntry: (input: {
    date: string;
    maxRating: number;
    notes: string;
    rating: number;
  }) => void;
} => {
  const [mutate, { data, loading: isLoading }] = useMutation<
    ApiResult,
    ApiVariables
  >(SAVE_ENTRY_QUERY);
  const { entry: savedEntry } = data || {};
  return {
    isLoading,
    savedEntry,
    saveEntry: ({ date, maxRating, notes, rating }) => {
      mutate({ variables: { date, maxRating, notes, rating } });
    },
  };
};

export const SAVE_ENTRY_QUERY = gql`
  mutation SaveEntry(
    $date: String!
    $maxRating: Integer!
    $notes: String!
    $rating: Integer!
  ) {
    entry(
      input: {
        date: $date
        maxRating: $maxRating
        notes: $notes
        rating: $rating
      }
    ) {
      id
    }
  }
`;

interface ApiResult {
  entry: { id: string };
}

interface ApiVariables {
  date: string;
  maxRating: number;
  notes: string;
  rating: number;
}

export default useSaveEntry;
