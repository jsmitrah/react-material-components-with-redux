import React from 'react';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ErrorBoundary from './Common/ErrorHandler';

import './App.css';
import HeaderPage from './HeaderPage';
const reducers = combineReducers({ form: formReducer });
const store = createStore(reducers);

function App() {
    return (
        <div className="bodyContent">
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ErrorBoundary>
                    <Provider store={store}>
                        <HeaderPage />
                    </Provider>
                </ErrorBoundary>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default App;
