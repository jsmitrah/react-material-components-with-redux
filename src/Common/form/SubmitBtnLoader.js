import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const propTypes = {
    label: PropTypes.string.isRequired,
    loading: PropTypes.bool
};
const defaultProps = {
    loading: false
};
function SubmitBtnLoader({ label, loading, ...rest }) {
    const { dispatch, className, loadingName, children, ...restProps } = rest;
    return loading ? (
        <CircularProgress />
    ) : (
        <Button variant="contained" type="submit" color="primary" className={'submit'} {...restProps}>
            {label}
            {children}
        </Button>
    );
}

SubmitBtnLoader.propTypes = propTypes;
SubmitBtnLoader.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
    label: ownProps.label,
    loading: _get(state, ownProps.loadingName)
});

export default connect(mapStateToProps)(SubmitBtnLoader);
