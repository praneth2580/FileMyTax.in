import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Document {
    id: string;
    name: string;
    category: string;
    uploadDate: string;
    status: 'Uploaded' | 'Reviewed' | 'Parsed' | 'Error';
}

interface DocumentsState {
    documents: Document[];
    isUploading: boolean;
}

const initialState: DocumentsState = {
    documents: [],
    isUploading: false,
};

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setUploadingStatus: (state, action: PayloadAction<boolean>) => {
            state.isUploading = action.payload;
        },
        addDocument: (state, action: PayloadAction<Document>) => {
            state.documents.push(action.payload);
        },
    },
});

export const { setUploadingStatus, addDocument } = documentsSlice.actions;
export default documentsSlice.reducer;
