import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    selectedFinancialYear: string;
    filingStatus: string;
    estimatedTaxPayable: number;
    taxRegime: string;
}

const initialState: DashboardState = {
    selectedFinancialYear: '2024-2025',
    filingStatus: 'Draft',
    estimatedTaxPayable: 0,
    taxRegime: 'New Regime',
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSelectedFinancialYear: (state, action: PayloadAction<string>) => {
            state.selectedFinancialYear = action.payload;
        },
        setFilingStatus: (state, action: PayloadAction<string>) => {
            state.filingStatus = action.payload;
        },
    },
});

export const { setSelectedFinancialYear, setFilingStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
