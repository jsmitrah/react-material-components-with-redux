import React from 'react';
import { default as RadioButtonGroup } from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function RadioGroup({ input, label, classes, ...rest }) {
    return (
        <FormControl>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioButtonGroup
                {...input}
                {...rest}
                value={input.value.toString()}
                onChange={(event, value) => input.onChange(value)}
            />
        </FormControl>
    );
}

export default RadioGroup;
