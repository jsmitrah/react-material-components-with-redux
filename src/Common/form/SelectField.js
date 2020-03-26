import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Select, { components } from 'react-select';
import _uniqueId from 'lodash/uniqueId';
import _isEmpty from 'lodash/isEmpty';
import _uniqBy from 'lodash/uniqBy';
import _map from 'lodash/map';
import _isEqual from 'lodash/isEqual';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _keys from 'lodash/keys';
import ProgressiveImage from 'react-progressive-image';

import SelectFieldStyle from './SelectFieldStyle';

function SelectWrapped(props) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const loadingIndicator = () => {
        return props.isLoading ? <CircularProgress size={25} /> : null;
    };
    const { classes, handleRequest, customOption, dataSource, disabled, onFocus, ...other } = props;
    const handleInputChange = val => {
        if (val && handleRequest) handleRequest(val, other.name);
    };
    return (
        <Select
            classNamePrefix={null}
            isClearable={false}
            menuShouldScrollIntoView
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
            onInputChange={handleInputChange}
            menuIsOpen={menuIsOpen}
            components={{
                SingleValue,
                LoadingIndicator: loadingIndicator,
                Option: customOption ? customOption : Option
            }}
            menuPosition={document.getElementById('muiDialog') ? 'fixed' : 'absolute'}
            onMenuOpen={() => setMenuIsOpen(true)}
            onMenuClose={() => setMenuIsOpen(false)}
            menuPortalTarget={document.getElementById('muiDialog') || document.body}
            {...other}
            options={dataSource}
            isDisabled={disabled}
        />
    );
}
const Option = props => {
    return (
        <components.Option
            {...props}
            isDisabled={props.data.disabled}
            innerProps={{ ...props.innerProps, onClick: props.data.disabled ? () => {} : props.innerProps.onClick }}
        >
            {_includes(_keys(props.data), 'thumb') && (
                <ProgressiveImage
                    src={props.data.thumb}
                    placeholder="https://via.placeholder.com/200x150?text=No+Image"
                >
                    {src => <img alt=" " className="sugg-thumbnail" src={src} />}
                </ProgressiveImage>
            )}
            {props.children}
        </components.Option>
    );
};

const SingleValue = ({ children, ...props }) => {
    return (
        <components.SingleValue {...props}>
            {_includes(_keys(props.data), 'thumb') && (
                <ProgressiveImage
                    src={props.data.thumb}
                    placeholder="https://via.placeholder.com/200x150?text=No+Image"
                >
                    {src => <img alt=" " className="sugg-thumbnail" src={src} />}
                </ProgressiveImage>
            )}
            {children}
        </components.SingleValue>
    );
};

function SelectField(props) {
    const [selectedValues, setSelectedValues] = useState(false);
    const suggestions = props.dataSource;
    const name = props.name || (props.input && props.input.name);

    const getValue = useCallback(
        (value, suggestions) => {
            let data = [];
            if (props.isMulti) {
                let sugges = suggestions;
                if (selectedValues) {
                    sugges = _uniqBy([...suggestions, ...selectedValues], 'value');
                }
                data = _filter(sugges, sugg => _includes(value.split(','), sugg.value));
            } else data = _filter(suggestions, sugg => _isEqual(value, sugg.value));
            return data;
        },
        [props.isMulti, selectedValues]
    );

    const [value, setValue] = useState(() =>
        getValue(props.value || (props.input ? props.input.value : ''), suggestions)
    );
    useEffect(() => {
        setValue(() => getValue(props.input.value, props.dataSource));
    }, [getValue, props.input.value, props.dataSource]);
    const handleSelect = sugg => {
        const { handleChange } = props;
        if (handleChange && sugg.value !== 'newFunction') {
            handleChange(name, sugg.label, sugg.value);
            setValue(sugg);
        }
        if (sugg.value === 'newFunction') {
            sugg.addNewMenuItem();
        }
        if (props.isMulti) {
            setValue(sugg);
            setSelectedValues(sugg);
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
        startAdornment,
        endAdornment,
        showLabel = true,
        tooltipText,
        dataSource,
        ...rest
    } = props;

    const selectClass = classNames(classes.root, {
        [className]: !!className
    });
    let touched = false;
    let error = '';
    let inputProps = {};
    if (!_isEmpty(meta)) {
        error = meta.error;
        touched = meta.touched;
    }
    if (!_isEmpty(input)) {
        const { onBlur, ...rest } = input;
        inputProps = rest;
    }
    let id = _uniqueId('SelectField');
    return (
        <div className={selectClass}>
            <FormControl className={classes.formControl} error={!!(touched && error)}>
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
                    startAdornment={
                        startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>
                    }
                    endAdornment={endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
                    inputProps={{
                        id,
                        name,
                        classes,
                        dataSource,
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
                {touched && error && <FormHelperText>{touched && error}</FormHelperText>}
            </FormControl>
        </div>
    );
}
SelectField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(SelectFieldStyle)(SelectField);
