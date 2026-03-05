import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import documentsReducer from './slices/documentsSlice';
import myTaxpayersReducer from './slices/myTaxpayersSlice';
import settingsReducer from './slices/settingsSlice';
import startFilingReducer from './slices/startFilingSlice';
import submitTrackReducer from './slices/submitTrackSlice';
import taxSummaryReducer from './slices/taxSummarySlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        documents: documentsReducer,
        myTaxpayers: myTaxpayersReducer,
        settings: settingsReducer,
        startFiling: startFilingReducer,
        submitTrack: submitTrackReducer,
        taxSummary: taxSummaryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
