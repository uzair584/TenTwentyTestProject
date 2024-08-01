// MovieList.js
import React, { useEffect, useState } from 'react';
import {
    Text, Image, FlatList, StyleSheet, SafeAreaView, TouchableOpacity,
    RefreshControl, ScrollView, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { movieList } from '../redux/TMdbSlices/movieListSlice';
import { API_KEY, IMAGE_BASE_URL } from '../configs/apiUrls';
import { resetNavigation } from '../utils/resetNavigation';
import { SCREENS } from '../constants';
import FullScreenLoader from '../components/FullScreenLoader';
import theme from '../styles/theme';
import { normalizeFontSize, scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '../assets/svgs';

const MovieList = ({ navigation }) => {
    const dispatch = useDispatch();
    const { moviesList, loading, currentPage, totalPages } = useSelector((state) => state.movieList);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 3000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(movieList({
            api_key: API_KEY,
            page
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page]);

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1); // Reset to first page
        dispatch(movieList({
            api_key: API_KEY,
            page: 1
        }))
            .then(() => setRefreshing(false))
            .catch(() => setRefreshing(false));
    };


    const handleLoadMore = () => {
        if (currentPage < totalPages && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleNavigation = (movieId) => {
        resetNavigation(navigation, SCREENS.MOVIE_DETAIL, { movieId: movieId })
    }

    const showLoader = () => {
        return <FullScreenLoader
            loading={loader} />;
    };

    const showFooterSpinner = () => {
        return <FullScreenLoader
            spinnerStyle={styles.footerSpinner}
            loading={loading} />;
    };

    const renderItem = ({ item, index }) => (
        item?.id != null && <Animatable.View
            animation={'zoomInLeft'}
            duration={300}
            delay={index} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => {
                handleNavigation(item?.id)
            }}>
                <Image source={{ uri: `${IMAGE_BASE_URL}${item?.backdrop_path}` }} style={styles.image} />
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                    locations={[0, 1]}
                    style={styles.gradient}
                >
                    <Text style={styles.name}>{`${item?.title}`}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Watch</Text>

                <TouchableOpacity onPress={() => {
                    resetNavigation(navigation, SCREENS.MOVIE_SEARCH)
                }}>
                    <SearchIcon width={scaleWidth(40)} height={scaleHeight(40)} style={{
                        alignSelf: 'center'
                    }} />
                </TouchableOpacity>

            </View>

            {loader && !refreshing ? showLoader() :
                moviesList?.length > 0 ? (
                    <FlatList
                        data={moviesList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        //contentContainerStyle={styles.list}
                        ListFooterComponent={loading && !refreshing && showFooterSpinner}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                ) : (
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                    </ScrollView>
                )
            }


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,

    },

    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 25
    },

    heading: {
        fontFamily: fonts.fontsType.medium,
        fontSize: normalizeFontSize(16),
        color: theme.primary,
        flex: 1,
        alignSelf: 'center'
    },

    itemContainer: {
        width: '90%',
        height: scaleHeight(180),
        flex: 1,
        margin: 10,
        borderRadius: 16,
        alignSelf: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        alignSelf: 'center'
    },
    name: {
        fontFamily: fonts.fontsType.medium,
        fontSize: scaleHeight(18),
        color: theme.white,
        marginTop: 10,
        position: 'absolute',
        bottom: 15,
        left: 20
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%', // Adjust height as needed
        justifyContent: 'flex-end',
        padding: 10,
        borderRadius: 16,
    },
    footerSpinner: {
        width: scaleWidth(120),
        height: scaleHeight(120),
    },
    scrollViewContent: {
        flex: 1,
    },
});

export default MovieList;
