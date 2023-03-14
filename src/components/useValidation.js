import { useState, useCallback } from 'react'

function useValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    function onChange(e) {
        const { name, value } = e.target;
        setValues((values) => ({ ...values, [name]: value }))
        setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }))
    };

    const resetValidation = useCallback(
        function reset(values = {}, errors = {}) {
            setValues(values)
            setErrors(errors)
        }, [],
    )

    return { values, errors, onChange, resetValidation };
}

export default useValidation;