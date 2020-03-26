import React from 'react';
import { TimePicker } from '@material-ui/pickers';

const TimeField = ({ meta, input, required, label, classes, mode, ...rest }) => {
    const { onBlur, ...inputProps } = input;
    return (
        <TimePicker
            mode={mode ? mode : '12h'}
            {...inputProps}
            value={inputProps.value ? new Date(inputProps.value) : null}
            {...rest}
        />
    );
};

export default TimeField;
