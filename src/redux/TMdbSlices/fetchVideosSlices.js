import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequests from '../../configs/apiRequests';

const initialState = {
    videos: [],
    loading: false,
    error: null,
};

export const fetchVideos = createAsyncThunk(
    'fetchVideos/fetchVideos',
    async (params, { getState, rejectWithValue }) => {
        try {
            console.log(params)
            const data = await apiRequests('GET', `/${params?.movieId}/videos?api_key=${params?.api_key}`, null, null, null);
            return data;
        } catch (error) {
            return error
        }
    }
);

const fetchVideosSlice = createSlice({
    name: 'fetchVideos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload?.results;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default fetchVideosSlice.reducer;
