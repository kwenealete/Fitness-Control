import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                name
                email
                measurements {
                    id
                    day
                    month
                    year
                    weight
                }
            }
        }
    }
`;

export function useUser() {
    const { data } = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };