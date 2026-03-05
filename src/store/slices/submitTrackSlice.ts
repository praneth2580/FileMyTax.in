import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SubmitTrackState {
    submissionStatus: 'Draft' | 'Filing' | 'Verified' | 'Processed';
    verificationMethod: string | null;
    isValidForSubmission: boolean;
}

const initialState: SubmitTrackState = {
    submissionStatus: 'Draft',
    verificationMethod: null,
    isValidForSubmission: false,
};

const submitTrackSlice = createSlice({
    name: 'submitTrack',
    initialState,
    reducers: {
        setSubmissionStatus: (state, action: PayloadAction<SubmitTrackState['submissionStatus']>) => {
            state.submissionStatus = action.payload;
        },
        setVerificationMethod: (state, action: PayloadAction<string>) => {
            state.verificationMethod = action.payload;
        },
    },
});

export const { setSubmissionStatus, setVerificationMethod } = submitTrackSlice.actions;
export default submitTrackSlice.reducer;
