import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { movieDetails } from '../redux/TMdbSlices/movieDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, IMAGE_BASE_URL } from '../configs/apiUrls';
import FullScreenLoader from '../components/FullScreenLoader';
import moment from 'moment'
import { BackArrow, PlayIcon } from '../assets/svgs';
import fonts from '../styles/fonts';
import { normalizeFontSize, scaleHeight } from '../styles/responsive';
import theme from '../styles/theme';
import Button from '../components/ButtonComponent';
import { resetNavigation } from '../utils/resetNavigation';
import { SCREENS } from '../constants';
import useBackHandler from '../utils/useBackHandler';

const MovieDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { response, loading } = useSelector((state) => state.movieDetails);
    const { movieId } = route?.params


    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MAIN_DASHBOARD, { screen: SCREENS.MOVIE_LIST });
        return true;
    };
    useBackHandler(handleBackPress);

    useEffect(() => {
        dispatch(movieDetails({
            api_key: API_KEY,
            movieId: movieId
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, movieId]);


    const handleNavigation = () => {
        resetNavigation(navigation, SCREENS.VIDEO_SCREEN, { movieId: movieId })
    }


    const showLoader = () => {
        return <FullScreenLoader
            loading={loading} />;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground 
            resizeMode='cover'
            source={{ uri: `${IMAGE_BASE_URL}${response?.poster_path}` }}
                style={styles.poster}>

                <View style={{
                    position: 'absolute',
                    bottom: 30,
                    alignSelf: 'center'
                }}>
                    <Text style={styles.subtitle}>
                        {`In Theaters ${moment(response?.release_date).format('MMMM Do, YYYY')}`}
                    </Text>
                    <Button title={'Get Ticket'} customStyle={{
                        marginBottom: 10
                    }} />
                    <Button
                        onPress={() => {
                            handleNavigation()
                        }}
                        title={'Watch Trailer'}
                        icon={<PlayIcon />}
                        customStyle={{
                            backgroundColor: 'transparent',
                            borderColor: theme.secondary,
                            borderWidth: 1,
                            marginBottom: 10
                        }}
                    />
                </View>

            </ImageBackground>

            <TouchableOpacity
                onPress={() => {
                    handleBackPress()
                }}
                style={styles.backButton}>
                <BackArrow />
                <Text style={{
                    fontFamily: fonts.fontsType.medium,
                    fontSize: normalizeFontSize(14),
                    color: theme.white,
                    alignSelf: 'center'
                }}>Watch</Text>
            </TouchableOpacity>
            <View style={styles.content}>

                <Text style={styles.sectionTitle}>Genres</Text>
                <View style={styles.genresContainer}>
                    {response?.genres?.map((genre) => (
                        <View key={genre?.id} style={[styles.genreBadge, { backgroundColor: getGenreColor(genre?.name) }]}>
                            <Text style={styles.genreText}>{genre?.name}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Text style={styles.overviewText}>
                    {response?.overview}
                </Text>
            </View>
        </ScrollView>
    );
};

const getGenreColor = (genre) => {
    switch (genre) {
        case 'Action': return '#15D2BC';
        case 'Thriller': return '#E26CA5';
        case 'Science': return '#564CA3';
        case 'Fiction': return '#CD9D0F';
        case 'Crime': return '#CD9D0F';
        case 'Drama': return '#E26CA5';
        case 'Horror': return '#15D2BC';
        case 'Science Fiction': return '#564CA3';
        case 'Comedy': return '#E26CA5';
        case 'Romance': return '#564CA3';
        default: return '#CCC';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    poster: {
        width: '100%',
        height: 420,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        //backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row'
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 16,
        color: theme.white,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ticketButton: {
        flex: 1,
        backgroundColor: '#00f',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    trailerButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#00f',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: theme.primary,
        fontFamily: fonts.fontsType.medium,
        fontSize: normalizeFontSize(16)
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    genreBadge: {
        padding: 8,
        borderRadius: 30,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10
    },
    genreText: {
        color: theme.white,
        fontFamily: fonts.fontsType.semiBold,
        fontSize: normalizeFontSize(12)
    },
    overviewText: {
        color: theme.inactive,
        fontFamily: fonts.fontsType.regular,
        fontSize: normalizeFontSize(12),
        marginTop: 15
    },
});

export default MovieDetail;
