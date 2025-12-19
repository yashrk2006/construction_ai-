import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SafetyState {
    uploadedImage: string | null;
    analysisResult: any | null;
    isAnalyzing: boolean;
}

const initialState: SafetyState = {
    uploadedImage: null,
    analysisResult: null,
    isAnalyzing: false,
};

const safetySlice = createSlice({
    name: 'safety',
    initialState,
    reducers: {
        setUploadedImage: (state, action: PayloadAction<string | null>) => {
            state.uploadedImage = action.payload;
        },
        setAnalysisResult: (state, action: PayloadAction<any>) => {
            state.analysisResult = action.payload;
        },
        setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
            state.isAnalyzing = action.payload;
        },
        clearSafety: (state) => {
            state.uploadedImage = null;
            state.analysisResult = null;
            state.isAnalyzing = false;
        },
    },
});

export const { setUploadedImage, setAnalysisResult, setIsAnalyzing, clearSafety } = safetySlice.actions;
export default safetySlice.reducer;
