import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import _includes from 'lodash/includes';
import Popover from '@material-ui/core/Popover';
import InputAdornment from '@material-ui/core/InputAdornment';

const propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired
};

function ColorField(props) {
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const [anchorE1, setAnchorE1] = useState(null);

    const colorPicker = event => {
        setAnchorE1(event.currentTarget);
        setIsActionsOpen(!isActionsOpen);
    };
    const handleActionsClose = () => {
        setIsActionsOpen(false);
    };
    const {
        meta: { touched, error } = {},
        input: { ...inputProps }
    } = props;
    let color = '';
    if (typeof inputProps.value === 'object') {
        color = inputProps.value.color;
    } else if (!_includes(inputProps.value, '#')) {
        color = `#${inputProps.value}`;
    } else {
        color = inputProps.value;
    }
    return (
        <Fragment>
            <Popover
                open={isActionsOpen}
                onClose={handleActionsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                anchorEl={anchorE1}
            >
                <SketchPicker
                    color={color === '#' || color.length <= 3 || !/^#[0-9A-F]{3,6}$/i.test(color) ? '#fff' : color}
                    onChange={hex => {
                        inputProps.onChange(hex.hex.toUpperCase());
                    }}
                />
            </Popover>
            <TextField
                error={!!(touched && error)}
                helperText={touched && error}
                onInput={e => (e.target.value = e.target.value.slice(0, 7))}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <div
                                style={{
                                    backgroundColor: color
                                }}
                                className="color-field"
                                onClick={colorPicker}
                            />
                        </InputAdornment>
                    )
                }}
                {...inputProps}
                value={color}
                {...props}
                fullWidth={false}
            />
        </Fragment>
    );
}

ColorField.propTypes = propTypes;

export default ColorField;
