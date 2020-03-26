import React from 'react';
import Sticky from 'react-sticky-el';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SubmitBtnLoader from './SubmitBtnLoader';

function ActionBar({
    primaryButtonProps,
    cancelBtnProps,
    backBtnProps,
    isNext,
    sechduleProps,
    nextBtnProps,
    templateSaveButtonProps
}) {
    return (
        <Sticky mode="bottom" style={{ zIndex: '100' }}>
            <Paper elevation={1}>
                <div className="footer-buttons">
                    <div className="float-right actionButton">
                        {(primaryButtonProps && primaryButtonProps.tosave) ||
                        primaryButtonProps === undefined ? null : (
                            <SubmitBtnLoader className="float-right " {...primaryButtonProps}>
                                {isNext && <ChevronRightIcon />}
                            </SubmitBtnLoader>
                        )}
                        {templateSaveButtonProps && templateSaveButtonProps.toshow === 'true' ? (
                            <SubmitBtnLoader className="float-right" {...templateSaveButtonProps} />
                        ) : null}
                        {sechduleProps ? (
                            <Button variant="contained" {...sechduleProps}>
                                {sechduleProps.label}
                            </Button>
                        ) : (
                            <Button disabled> </Button>
                        )}
                    </div>
                    {backBtnProps && (
                        <Button {...backBtnProps}>
                            <ChevronLeftIcon />
                            Back
                        </Button>
                    )}
                    {cancelBtnProps ? (
                        <Button variant="contained" {...cancelBtnProps}>
                            Cancel
                        </Button>
                    ) : (
                        <Button disabled> </Button>
                    )}
                    {nextBtnProps && (
                        <Button variant="contained" {...nextBtnProps}>
                            <ChevronLeftIcon />
                            Next
                        </Button>
                    )}
                </div>
            </Paper>
        </Sticky>
    );
}

export default ActionBar;
