import { gql, useMutation } from '@apollo/client';

const useSaveEntry = (): {
  isLoading: boolean;
  savedEntry?: { id: string };
  saveEntry: (input: {
    date: string;
    notes: string;
    ratingOutOfFive: number;
  }) => void;
} => {
  const [mutate, { data, loading: isLoading }] = useMutation<
    ApiResult,
    ApiVariables
  >(SAVE_ENTRY_QUERY);
  const { saveEntry: savedEntry } = data || {};
  return {
    isLoading,
    savedEntry,
    saveEntry: ({ date, notes, ratingOutOfFive }) => {
      mutate({ variables: { date, notes, ratingOutOfFive } });
    },
  };
};

export const SAVE_ENTRY_QUERY = gql`
  mutation SaveEntry($date: String!, $notes: String!, $ratingOutOfFive: Int!) {
    saveEntry(
      input: { date: $date, notes: $notes, ratingOutOfFive: $ratingOutOfFive }
    ) {
      date
      id
      notes
      ratingOutOfFive
    }
  }
`;

interface ApiResult {
  saveEntry: {
    date: string;
    id: string;
    notes: string;
    ratingOutOfFive: number;
  };
}

interface ApiVariables {
  date: string;
  notes: string;
  ratingOutOfFive: number;
}

export default useSaveEntry;
