import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Measurement from './Measurement';

export const ALL_MEASUREMENTS_QUERY = gql`
    query ALL_MEASUREMENTS_QUERY {
        allMeasurements {
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

export default function Measrements() {
    const { data, loading, error } = useQuery( ALL_MEASUREMENTS_QUERY );

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