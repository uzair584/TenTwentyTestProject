// SearchMovie.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { searchMovies } from '../redux/TMdbSlices/searchMoviesSlice';
import { API_KEY, IMAGE_BASE_URL } from '../configs/apiUrls';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import { normalizeFontSize, scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';
import theme from '../styles/theme';
import { CrossIcon, MoreIcon, SearchIcon } from '../assets/svgs';
import { resetNavigation } from '../utils/resetNavigation';
import { SCREENS } from '../constants';
import useBackHandler from '../utils/useBackHandler';

const SearchMovie = ({ navigation }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.MOVIE_LIST });
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        const fetchInitialMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: API_KEY,
                        query: query,
                    },
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialMovies();
    }, [dispatch, query]);


    const renderMovieItem = ({ item }) => (
        <TouchableOpacity style={styles.movieItem}>
            <Image
                resizeMode='cover'
                style={{
                    width: scaleWidth(130),
                    height: scaleHeight(100),
                    borderRadius: 10
                }}
                source={{ uri: `${IMAGE_BASE_URL}${item?.backdrop_path}` }} />
            <View style={{ flex: 1 }}>
                <Text style={styles.movieTitle}>{item?.title}</Text>
                <Text style={[styles.movieTitle, { color: theme.grey }]}>{item?.title}</Text>
            </View>
            <MoreIcon />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <SearchIcon />
                <TextInput
                    style={styles.input}
                    placeholder="TV shows, movies and more"
                    value={query}
                    onChangeText={setQuery}
                />
                {query?.length > 0 && <TouchableOpacity onPress={() => {
                    setQuery('')
                }}>
                    <CrossIcon />
                </TouchableOpacity>}
            </View>
            {movies.length > 0 && (
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsText}>Top results ({movies.length})</Text>
                    <View style={styles.horizontalLine} />
                </View>
            )}
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
                style={styles.resultsList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        backgroundColor: '#EFEFEF',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    },
    resultsList: {
        marginTop: 16,
    },
    movieItem: {
        padding: 16,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
    },
    movieTitle: {
        fontFamily: fonts.fontsType.medium,
        fontSize: normalizeFontSize(14),
        color: theme.primary,
        marginLeft: 16,
    },
    resultsHeader: {
        marginBottom: 16,
    },
    resultsText: {
        fontSize: normalizeFontSize(12),
        fontFamily: fonts.fontsType.semiBold,
        color: theme.primary
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
    },
});

export default SearchMovie;
