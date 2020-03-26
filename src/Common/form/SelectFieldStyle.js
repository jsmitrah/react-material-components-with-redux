const SelectFieldStyle = {
    root: {
        flexBasis: 200,
        display: 'flex'
    },
    formControl: {
        width: '100%'
    },
    control: (base, state) => {
        return {
            ...base,
            border: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            height: state !== undefined && state.isMulti ? 'auto' : '1.1875em',
            minHeight: '1.1875em'
        };
    },
    singleValue: (base, state) => ({
        ...base,
        marginLeft: 0
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none',
        paddingButtom: '30px'
    }),
    container: (base, state) => ({
        ...base,
        padding: state !== undefined && state.isMulti ? '6px 0 0' : '6px 0 7px',
        marginBottom: state !== undefined && state.isMulti ? '0' : '18px',
        height: state !== undefined && state.isMulti ? 'auto' : '0'
    }),
    valueContainer: (base, state) => ({
        ...base,
        padding: '0',
        position: 'none',
        overflow: 'auto',
        overflowX: 'hidden'
    }),
    placeholder: (base, state) => ({
        ...base,
        color: '#a9a9a9',
        marginLeft: 0
    }),
    menu: (base, state) => ({
        ...base,
        zIndex: 9999,
        top: 'auto',
        marginBottom: state !== undefined && state.isMulti ? '0px' : '7px'
    }),
    menuList: (base, state) => ({
        ...base,
        maxHeight: 200
    }),
    option: (styles, state) => {
        return {
            ...styles,
            ':active': {
                backgroundColor: '#9E9E9E'
            },
            backgroundColor:
                state !== undefined &&
                (state.isDisabled ? null : state.isSelected ? '#9E9E9E' : state.isFocused ? '#E0E0E0' : null),
            color: state !== undefined && state.isDisabled ? '#ccc' : '#000',
            cursor: state !== undefined && state.isDisabled ? 'not-allowed' : 'default',
            padding: 10
        };
    },
    loadingIndicator: base => ({ ...base, padding: 0 })
};
export default SelectFieldStyle;
