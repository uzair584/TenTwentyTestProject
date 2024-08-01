import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequests from '../../configs/apiRequests';

const initialState = {
    movies: [],
    loading: false,
    error: null,
};

export const searchMovies = createAsyncThunk(
    'searchMovies/searchMovies',
    async (params, { getState, rejectWithValue }) => {
        try {
            const data = await apiRequests('GET', `/${params?.movieId}?api_key=${params?.api_key}`, null, null, null);
            return data;
        } catch (error) {
            return error
        }
    }
);

const searchMoviesSlice = createSlice({
    name: 'searchMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload?.results;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default searchMoviesSlice.reducer;
