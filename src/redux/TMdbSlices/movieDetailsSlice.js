import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequests from '../../configs/apiRequests';

const initialState = {
    response: null,
    loading: false,
    error: null,
};

export const movieDetails = createAsyncThunk(
    'movieDetails/movieDetails',
    async (params, { getState, rejectWithValue }) => {
        try {
            const data = await apiRequests('GET', `/${params?.movieId}?api_key=${params?.api_key}`, null, null, null);
            return data;
        } catch (error) {
            return error
        }
    }
);

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(movieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(movieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload;
            })
            .addCase(movieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default movieDetailsSlice.reducer;
