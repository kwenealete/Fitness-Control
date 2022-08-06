import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SINGLE_MEASUREMENT_QUERY = gql`
    query SINGLE_MEASUREMENT_QUERY($id: ID!) {
        Measurement(where: { id:$id }) {
            id
            weight
        }
    }
`;

const UPDATE_MEASUREMENT_MUTATION = gql`
    mutation UPDATE_MEASUREMENT_MUTATION(
        $id: ID!
        $weight: Int
    ) {
        updateMeasurement (
            id: $id
            data: { weight: $weight }
        ) {
            id
            weight
        }
    }
`;

export default function UpdateMeasurement({ id }) {
    //get the existing measurement
    const { data, error, loading } = useQuery(SINGLE_MEASUREMENT_QUERY, {
        variables: { id },
    });

    // We need to get the mutation to update the measurement
    const [
        updateMeasuement,
        { data: updateData, error: updateError, loading: updateLoading },
    ] = useMutation(UPDATE_MEASUREMENT_MUTATION);

    //Create some state for the form inputs
    const { inputs, handleChange, clearForm, resetForm } = useForm(
        data?.Measurement || {
            weight: '',
        }
    );
   
    if(loading) return <p>Loading...</p>;

    //get the form to perform the update
    return (

        <Form
            onSubmit= {async e => {
                e.preventDefault();
                const res = await updateMeasuement({
                    variables: {
                        id,
                        weight: inputs.weight,
                    },
                }).catch(console.error)
            }}
        >
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label>
                Weight
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Update weight"
                    value={inputs.weight}
                    onChange={handleChange}
                />
                </label>
                <button type="submit">Update Measurement</button>
            </fieldset>
        </Form>
    )    
}