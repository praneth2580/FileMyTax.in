import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StartFilingState {
    currentStep: number;
    personalDetails: {
        pan: string;
        aadhaar: string;
        address: string;
        email: string;
        phone: string;
        bankAccount: string;
    };
    incomeDetails: {
        salary: number;
        houseProperty: number;
        business: number;
        capitalGains: number;
        otherSources: number;
    };
    deductions: {
        eightyC: number;
        eightyD: number;
        nps: number;
    };
}

const initialState: StartFilingState = {
    currentStep: 1,
    personalDetails: { pan: '', aadhaar: '', address: '', email: '', phone: '', bankAccount: '' },
    incomeDetails: { salary: 0, houseProperty: 0, business: 0, capitalGains: 0, otherSources: 0 },
    deductions: { eightyC: 0, eightyD: 0, nps: 0 },
};

const startFilingSlice = createSlice({
    name: 'startFiling',
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        updatePersonalDetails: (state, action: PayloadAction<Partial<StartFilingState['personalDetails']>>) => {
            state.personalDetails = { ...state.personalDetails, ...action.payload };
        },
    },
});

export const { setStep, updatePersonalDetails } = startFilingSlice.actions;
export default startFilingSlice.reducer;
