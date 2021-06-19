import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import {AppRouter} from './routers/AppRouter';

import dotenv from 'dotenv';

dotenv.config();

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
