import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as useQueryExternal,
} from '@apollo/client';

export { ApolloError as ApiError, gql } from '@apollo/client';
export { GraphQLError } from 'graphql';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const useQuery = <TData = any, TVariables = OperationVariables>({
  options,
  query,
}: {
  options?: QueryHookOptions<TData, TVariables>;
  query: DocumentNode | TypedDocumentNode<TData, TVariables>;
}): QueryResult<TData, TVariables> =>
  useQueryExternal<TData, TVariables>(query, options);

export default useQuery;
