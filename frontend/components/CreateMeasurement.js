import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import { ALL_MEASUREMENTS_QUERY } from './Measurements';
import Router from 'next/router';

const CREATE_MEASUREMENT_MUTATION = gql`
    mutation CREATE_MEASUREMENT_MUTATION (
        $day: Int!
        $month: String!
        $year: Int!
        $weight: Int!
    ) {
        createMeasurement (
            data: {
                day: $day
                month: $month
                year: $year
                weight: $weight
                status: "AVAILABLE"
            }
        ) {
            id
            weight
        }
    }
`;

export default function CreateMeasurement() {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        day: '',
        month: '',
        year: '',
        weight: ''
    });

    const [ createMeasurement, { loading, error, data }] = useMutation(
        CREATE_MEASUREMENT_MUTATION, { variables: inputs,refetchQueries: [{ query: ALL_MEASUREMENTS_QUERY }], }
    );

    return (
        <Form
            onSubmit= {async (e) => {
                e.preventDefault();

                //Submit input fields to the backend
                const res = await createMeasurement();
                clearForm();

                //Pushing measurement to its page                
                Router.push({
                    pathname: `/measurements`
                });
            }}
        >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading} >
                <label htmlFor="day">
                    Day
                    <input
                        type="number"
                        id="day"
                        name="day"
                        placeholder="Enter day (example: 12th)"
                        value={inputs.day}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="month">
                    Month
                    <input
                        type="text"
                        id="month"
                        name="month"
                        placeholder="Enter month (example: January)"
                        value={inputs.month}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="year">
                    Year
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Enter year (example: 2022)"
                        value={inputs.year}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="weight">
                    Weight
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        placeholder="Enter weight (example: 222)"
                        value={inputs.weight}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit"> + Add Weight </button>
            </fieldset>
        </Form>
    )
}