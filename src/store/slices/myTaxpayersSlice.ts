import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Taxpayer {
    id: string;
    name: string;
    pan: string;
    itrType: string;
    filingStatus: string;
}

interface MyTaxpayersState {
    taxpayers: Taxpayer[];
    selectedTaxpayerId: string | null;
}

const initialState: MyTaxpayersState = {
    taxpayers: [],
    selectedTaxpayerId: null,
};

const myTaxpayersSlice = createSlice({
    name: 'myTaxpayers',
    initialState,
    reducers: {
        addTaxpayer: (state, action: PayloadAction<Taxpayer>) => {
            state.taxpayers.push(action.payload);
        },
        setSelectedTaxpayer: (state, action: PayloadAction<string | null>) => {
            state.selectedTaxpayerId = action.payload;
        },
    },
});

export const { addTaxpayer, setSelectedTaxpayer } = myTaxpayersSlice.actions;
export default myTaxpayersSlice.reducer;
