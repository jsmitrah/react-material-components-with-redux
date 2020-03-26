import React, { Fragment } from 'react';
import { DatePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Today from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';

import classNames from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';

const styles = theme => ({
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: '0 2px',
        color: 'inherit'
    },
    selected: {
        background: theme.palette.primary.dark,
        color: '#fff'
    },
    disabled: {
        color: '#00000061',
        pointerEvents: 'none'
    }
});

const DateField = ({ meta, input, required, label, dateFormat = 'YYYY-MM-DD', classes, tooltipText = '', ...rest }) => {
    const renderWrappedDefaultDay = (date, selectedDate, dayInCurrentMonth, restData) => {
        const dayClassName = classNames(classes.day, {
            [classes.selected]: date.isSame(selectedDate, 'day'),
            [classes.disabled]: restData.props.disabled || !dayInCurrentMonth
        });
        return (
            <IconButton className={dayClassName}>
                <span> {date.format('DD')} </span>
            </IconButton>
        );
    };
    let error = '';
    let touched = false;
    let inputProps = {};
    if (!_isEmpty(meta)) {
        error = meta.error;
        touched = meta.touched;
    }
    if (!_isEmpty(input)) {
        const { onBlur, ...rest } = input;
        inputProps = rest;
    }
    return (
        <DatePicker
            {...inputProps}
            label={
                <Fragment>
                    <span className={tooltipText && 'bottom-10'}>{label}</span>
                    {required && <span className="align-top"> *</span>}
                    {tooltipText ? (
                        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: tooltipText }} />}>
                            <HelpOutline className="bottom-5 ml-2" color="action" />
                        </Tooltip>
                    ) : null}
                </Fragment>
            }
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Today />
                    </InputAdornment>
                )
            }}
            helperText={touched && error}
            clearLabel="clear"
            error={!!(touched && error)}
            renderDay={renderWrappedDefaultDay}
            invalidLabel=""
            onChange={date => {
                let dateObj = null;
                if (date !== null) dateObj = moment(date).toDate();
                else dateObj = date;
                !_isEmpty(inputProps) && inputProps.onChange(dateObj);
            }}
            fullWidth
            format={dateFormat}
            InputLabelProps={{ shrink: true }}
            {...rest}
        />
    );
};

export default withStyles(styles)(DateField);
