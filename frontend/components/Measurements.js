import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { perPage } from '../config';
import Measurement from './Measurement';

export const ALL_MEASUREMENTS_QUERY = gql`
    query ALL_MEASUREMENTS_QUERY($skip: Int = 0, $first: Int) {
        allMeasurements(first: $first, skip: $skip) {
            id
            day
            month
            year
            weight
            user {
                id
                email
            }
        }
    }
`;

export default function Measurements({ page }) {
    const { data, loading, error } = useQuery( ALL_MEASUREMENTS_QUERY, {
        variables: {
            skip: page * perPage - page,
            first: perPage,
        }
    });

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>

    console.log(data);
    

    return (
        <div>
            <h1>Measurements</h1>
            {data.allMeasurements.map(measurement => (
                <Measurement key={measurement.id} measurement={measurement} />
            ))}
        </div>
        
        
    )
    
}