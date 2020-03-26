import React from 'react';
import { components } from 'react-select';
import Async from 'react-select/async';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';
import _uniqueId from 'lodash/uniqueId';
import _isEmpty from 'lodash/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import _map from 'lodash/map';

import SelectFieldStyle from './SelectFieldStyle';

function SelectPlaces(props) {
    const { disabled, name, value, ...rest } = props;
    var autocompleteService;
    const loadOptions = (input, callback) => {
        if (input) {
            if (!autocompleteService && window.google && window.google.maps) {
                autocompleteService = new window.google.maps.places.AutocompleteService();
            }

            if (autocompleteService) {
                autocompleteService.getPlacePredictions({ ...props.autocompletionRequest, input }, predictions => {
                    let options = [];
                    if (predictions) {
                        options = predictions.map(prediction => ({
                            label: prediction.description,
                            ...prediction
                        }));
                    }
                    callback(options);
                });
            } else {
                callback([]);
            }
        } else {
            callback([]);
        }
    };
    const onChange = value => {
        const { onChange, fetchAddress, name } = props;
        value = !_isEmpty(value) ? value : {};
        const place = value;
        var placesService;
        if (place && place.place_id && onChange) {
            if (!placesService) {
                placesService = new window.google.maps.places.PlacesService(selectPlacesNode);
            }
            placesService.getDetails({ placeId: place.place_id }, placeInfo => {
                var componentForm = {
                    route: 'long_name',
                    locality: 'long_name',
                    country: 'long_name',
                    postal_code: 'short_name',
                    sublocality_level_1: 'long_name',
                    administrative_area_level_1: 'long_name',
                    postal_town: 'long_name',
                    sublocality_level_2: 'long_name',
                    street_number: 'long_name'
                };
                let addr = {};
                let addressRoute = '';
                _map(placeInfo.address_components, (place, key) => {
                    var addressType = placeInfo.address_components[key].types[0];
                    if (addressType === 'route') {
                        addressRoute = placeInfo.address_components[key].long_name;
                    }
                    if (componentForm[addressType]) {
                        var val = placeInfo.address_components[key][componentForm[addressType]];
                        if (
                            (typeof addressType !== 'undefined' &&
                                addressType !== null &&
                                addressType === 'postal_code') ||
                            addressType === 'country' ||
                            addressType === 'locality' ||
                            addressType === 'route' ||
                            addressType === 'sublocality_level_1' ||
                            addressType === 'administrative_area_level_1' ||
                            addressType === 'postal_town' ||
                            addressType === 'sublocality_level_2' ||
                            addressType === 'street_number'
                        ) {
                            addr[addressType] = val;
                        }
                    }
                });
                if (addr.sublocality_level_1 && addressRoute) {
                    addr.sublocality_level_1 = `${addressRoute} ${addr.sublocality_level_1}`;
                } else if (addr.sublocality_level_1 && addr.sublocality_level_2) {
                    addr.sublocality_level_1 = `${addr.sublocality_level_1}${addr.sublocality_level_2}`;
                }
                addr.sublocality_level_1 =
                    addr.sublocality_level_1 || placeInfo.name === addr.route || addr.street_number
                        ? addr.sublocality_level_1
                        : addressRoute;
                addr.route =
                    addr.route === placeInfo.name ||
                    addr.sublocality_level_1 === placeInfo.name ||
                    addr.country === placeInfo.name
                        ? addr.route
                        : placeInfo.name;
                addr.locality = addr.locality ? addr.locality : addr.postal_town;
                addr.lat = placeInfo.geometry.location.lat().toString();
                addr.lng = placeInfo.geometry.location.lng().toString();
                fetchAddress && fetchAddress(addr, name);
                onChange(value.label);
            });
        } else {
            onChange && onChange('');
            fetchAddress && fetchAddress({}, name);
        }
    };
    const loadingIndicator = () => <CircularProgress size={25} />;
    var selectPlacesNode;
    return (
        <div style={{ width: '100%' }}>
            <Async
                {...rest}
                classNamePrefix=""
                menuPosition={'absolute'}
                isDisabled={disabled}
                menuShouldScrollIntoView
                onChange={onChange}
                value={value ? { label: value } : ''}
                styles={SelectFieldStyle}
                loadOptions={loadOptions}
                components={{ LoadingIndicator: loadingIndicator, Option }}
                menuPortalTarget={document.body}
            />
            <div ref={node => (selectPlacesNode = node)} />
        </div>
    );
}
const Option = ({ isSelected, ...props }) => <components.Option {...props}>{props.children}</components.Option>;

function GoogleSelectField(props) {
    const { meta, classes, placeholder, input, label, disabled, fetchAddress, tooltipText, required } = props;
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
        <div className={classes.root}>
            <FormControl className={classes.formControl} error={!!(touched && error)}>
                <InputLabel shrink={true}>
                    <span className={tooltipText && 'bottom-10'}>{label}</span>
                    {required && <span className="align-top"> *</span>}
                    {tooltipText ? (
                        <Tooltip id={id} title={<div dangerouslySetInnerHTML={{ __html: tooltipText }} />}>
                            <HelpOutline className="bottom-5 ml-2" color="action" />
                        </Tooltip>
                    ) : null}
                </InputLabel>
                <Input
                    inputComponent={SelectPlaces}
                    disabled={disabled}
                    inputProps={{
                        id,
                        classes,
                        placeholder,
                        instanceId: id,
                        fetchAddress,
                        ...inputProps
                    }}
                />
                {touched && error && <FormHelperText>{touched && error}</FormHelperText>}
            </FormControl>
        </div>
    );
}

export default withStyles(SelectFieldStyle)(GoogleSelectField);
