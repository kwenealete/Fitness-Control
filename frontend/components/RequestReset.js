import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const[ signup, { data, loading, error }] = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: inputs,
        }
    );

    async function handleSubmit(e) {
        e.preventDefault(); //stops the form from submitting
        console.log(inputs);
        const res = await signup().catch(console.error);
        console.log(res);
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} >
            <h2>Request a Password Reset</h2>
            <Error error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && (
                    <p>Success! Kindly check your email for a password reset link!</p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset!</button>
            </fieldset>
        </Form>
    );
}