import { configureStore, combineReducers } from "@reduxjs/toolkit";
import movieListReducer from "./TMdbSlices/movieListSlice";
import movieDetailsReducer from "./TMdbSlices/movieDetailsSlice";
import fetchVideosReducer from "./TMdbSlices/fetchVideosSlices";
import searchMoviesReducer from "./TMdbSlices/searchMoviesSlice";

const rootReducer = combineReducers({
    movieList: movieListReducer,
    movieDetails: movieDetailsReducer,
    fetchVideos: fetchVideosReducer,
    searchMovies: searchMoviesReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});


export default store;
