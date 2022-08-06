import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
    //creating our inputs state object
    const [inputs, setInputs] = useState(initial); 
    const initialValues = Object.values(initial).join('');

    useEffect(() => {
        //run this function when things we are watching change
        setInputs(initial);
    }, [initialValues]);

    function handleChange(e) {
        let { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }

        if (type === 'file') {
            [value] = e.target.files;
        }
        setInputs({
            //copy exixting states
            ...inputs,
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankstate = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) =>[key, ''])
        );
        setInputs(blankstate);
    }

    //returning things we want to show from custom hook
    return {
        inputs, 
        handleChange,
        resetForm,
        clearForm
    };
}