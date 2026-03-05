import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    defaultFinancialYear: string;
    accountEmail: string;
    theme: 'light' | 'dark';
}

const initialState: SettingsState = {
    defaultFinancialYear: '2024-2025',
    accountEmail: '',
    theme: 'light',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        setDefaultFinancialYear: (state, action: PayloadAction<string>) => {
            state.defaultFinancialYear = action.payload;
        },
    },
});

export const { setTheme, setDefaultFinancialYear } = settingsSlice.actions;
export default settingsSlice.reducer;
