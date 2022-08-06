import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_MEASUREMENT_MUTATION = gql`
    mutation DELETE_MEASUREMENT_MUTATION ($id: ID!) {
        deleteMeasurement(id: $id) {
            id
            
        }
    }
`;

function update(cache, payload) {
    console.log('payload',payload);
    console.log('running');
    cache.evict(cache.identify(payload.data.deleteMeasurement));
    
}

export default function DeleteMeasurement({ id, children }) {
    const [deleteMeasurement, { loading, error }] = useMutation(
        DELETE_MEASUREMENT_MUTATION,
        {
            variables: { id },
            update
        }
    );
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                if(confirm('Are you sure you want to delete this measurement?')) {
                console.log('Delete');
                deleteMeasurement().catch((err) => alert(err.message));
                }
            }}
        >
            {children}
        </button>
    )
}