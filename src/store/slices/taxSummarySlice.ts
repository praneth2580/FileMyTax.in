import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TaxSummaryState {
    grossTotalIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    taxPayable: number;
}

const initialState: TaxSummaryState = {
    grossTotalIncome: 0,
    totalDeductions: 0,
    taxableIncome: 0,
    taxPayable: 0,
};

const taxSummarySlice = createSlice({
    name: 'taxSummary',
    initialState,
    reducers: {
        updateTaxSummary: (state, action: PayloadAction<Partial<TaxSummaryState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateTaxSummary } = taxSummarySlice.actions;
export default taxSummarySlice.reducer;
