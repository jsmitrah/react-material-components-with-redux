import BlockUi from 'react-block-ui';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const BlockUI = props => {
    const { dataLoading, className, style, renderChildren = true } = props;
    return (
        <BlockUi
            tag="div"
            blocking={dataLoading}
            renderChildren={renderChildren}
            keepInView
            className={className}
            loader={<CircularProgress size={50} />}
            style={{ ...style, minHeight: 'auto' }}
        >
            {props.children}
        </BlockUi>
    );
};

export default BlockUI;
