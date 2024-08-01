import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequests from '../../configs/apiRequests';

const initialState = {
    moviesList: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
};

export const movieList = createAsyncThunk(
    'movieList/movieList',
    async (payload, { getState, rejectWithValue }) => {
        try {
            const data = await apiRequests('GET', `/upcoming?api_key=${payload?.api_key}&language=en-US&page=${payload?.page}`, null, null, null);
            return data;
        } catch (error) {
            console.log(error)
            return error
        }
    }
);

const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(movieList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(movieList.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg.page === 1) {
                    state.moviesList = action.payload?.results;
                } else {
                    state.moviesList = [...state.moviesList, ...action.payload?.results];
                }
                state.currentPage = action.meta.arg.page;
                state.totalPages = action.payload?.total_pages;
                state.totalCount = action.payload?.total_results;
            })
            .addCase(movieList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default movieListSlice.reducer;
