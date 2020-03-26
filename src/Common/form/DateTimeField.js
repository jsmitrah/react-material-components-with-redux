import React, { useState } from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

const DateTimeField = ({ label }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <KeyboardDateTimePicker
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY/MM/DD hh:mm a"
            label={label}
        />
    );
};

export default DateTimeField;
