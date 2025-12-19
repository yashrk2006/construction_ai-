import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportsState {
    generatedReport: string;
    isGenerating: boolean;
}

const initialState: ReportsState = {
    generatedReport: '',
    isGenerating: false,
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setGeneratedReport: (state, action: PayloadAction<string>) => {
            state.generatedReport = action.payload;
        },
        setIsGenerating: (state, action: PayloadAction<boolean>) => {
            state.isGenerating = action.payload;
        },
        clearReport: (state) => {
            state.generatedReport = '';
            state.isGenerating = false;
        },
    },
});

export const { setGeneratedReport, setIsGenerating, clearReport } = reportsSlice.actions;
export default reportsSlice.reducer;
