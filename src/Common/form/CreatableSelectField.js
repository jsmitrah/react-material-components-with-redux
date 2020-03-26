import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';
import _uniqueId from 'lodash/uniqueId';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import _uniqBy from 'lodash/uniqBy';
import _isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import _filter from 'lodash/filter';
import SelectFieldStyle from './SelectFieldStyle';

function SelectWrapped(props) {
    const { classes, handleRequest, customOption, ...other } = props;
    const handleInputChange = val => {
        if (val && handleRequest) handleRequest(val, other.name);
    };
    return (
        <CreatableSelect
            isClearable={false}
            classNamePrefix=""
            menuShouldScrollIntoView
            onInputChange={handleInputChange}
            styles={
                other.isDark
                    ? {
                          ...SelectFieldStyle,
                          singleValue: (base, state) => {
                              return { ...base, color: '#ffffff !important' };
                          }
                      }
                    : SelectFieldStyle
            }
            menuPosition={document.getElementById('muiDialog') ? 'fixed' : 'absolute'}
            menuPortalTarget={document.getElementById('muiDialog') || document.body}
            {...other}
        />
    );
}

function CreatableSelectField(props) {
    const name = props.input && props.input.name;
    const [selectedValues, setSelectedValues] = useState([]);
    const [suggestions, setSuggestions] = useState(props.dataSource);

    const getValue = useCallback(
        (value, suggestions) => {
            let data = [];
            if (props.isMulti) {
                let sugges = suggestions;
                if (selectedValues) {
                    sugges = _uniqBy([...suggestions, ...selectedValues], 'value');
                }
                data = _filter(sugges, sugg => _includes(value.split(','), sugg.value));
            } else {
                data = _filter(suggestions, sugg => _isEqual(value, sugg.value));
            }
            if (value && suggestions.length && !data.length) {
                data = [{ label: value, value: value }];
            }
            return data;
        },
        [props.isMulti, selectedValues]
    );

    const [value, setValue] = useState(getValue(props.input ? props.input.value : '', props.dataSource));
    const prevInputValue = usePrevious(props.input.value);
    useEffect(() => {
        if (!_isEqual(prevInputValue, props.input.value)) {
            setValue(getValue(props.input.value, props.dataSource));
        }
    }, [getValue, prevInputValue, props.input.value, props.dataSource]);
    useEffect(() => {
        setSuggestions(props.dataSource);
    }, [props.dataSource]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const handleSelect = sugg => {
        const { handleChange } = props;
        if (handleChange) {
            handleChange(name, sugg.label, sugg.value);
            setValue(sugg);
        }
        if (props.isMulti) {
            setSelectedValues(sugg);
            setValue(sugg);
        }
    };

    const {
        meta,
        classes,
        className,
        input,
        label,
        required,
        disabled,
        showLabel = true,
        tooltipText,
        ...rest
    } = props;
    const selectClass = classNames(classes.root, {
        [className]: !!className
    });
    let inputProps = {};
    let id = _uniqueId('CreatableSelectField');
    if (!_isEmpty(input)) {
        const { onBlur, value, ...rest } = input;
        inputProps = rest;
    }
    return (
        <div className={selectClass}>
            <FormControl className={classes.formControl} error={!!(meta.touched && meta.error)}>
                {showLabel && (
                    <InputLabel shrink={true}>
                        <span className={tooltipText && 'bottom-10'}>{label}</span>
                        {required && <span className="align-top"> *</span>}
                        {tooltipText ? (
                            <Tooltip id={id} title={<div dangerouslySetInnerHTML={{ __html: tooltipText }} />}>
                                <HelpOutline className="bottom-5 ml-2" color="action" />
                            </Tooltip>
                        ) : null}
                    </InputLabel>
                )}
                <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    disabled={disabled}
                    inputProps={{
                        id,
                        name,
                        classes,
                        options: suggestions,
                        instanceId: id,
                        isDisabled: disabled,
                        ...inputProps,
                        ...rest,
                        value: value,
                        onChange: newValue => {
                            newValue = newValue === null ? '' : newValue;
                            if (!_isEmpty(inputProps)) {
                                let inputValue = [];
                                if (newValue instanceof Array) {
                                    _map(newValue, data => inputValue.push(data.value));
                                    inputValue = inputValue.toString();
                                } else {
                                    inputValue = newValue.value;
                                }
                                inputProps.onChange(inputValue);
                            }
                            handleSelect(newValue);
                        }
                    }}
                />
                {meta.touched && meta.error && <FormHelperText>{meta.touched && meta.error}</FormHelperText>}
            </FormControl>
        </div>
    );
}

CreatableSelectField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(SelectFieldStyle)(CreatableSelectField);
