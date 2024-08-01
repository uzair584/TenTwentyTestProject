// VideoPlayerScreen.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../redux/TMdbSlices/fetchVideosSlices';
import { API_KEY } from '../configs/apiUrls';
import { resetNavigation } from '../utils/resetNavigation';
import { SCREENS } from '../constants';
import useBackHandler from '../utils/useBackHandler';
import Button from '../components/ButtonComponent';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoScreen = ({ route }) => {
    const dispatch = useDispatch();
    const { videos, loading } = useSelector((state) => state.fetchVideos);
    const { movieId } = route.params;
    const navigation = useNavigation();
    const playerRef = useRef(VideoRef);

    const handleBackPress = () => {
        resetNavigation(navigation, SCREENS.MOVIE_DETAIL, { movieId: movieId });
        return true;
    };
    useBackHandler(handleBackPress);


    useEffect(() => {
        dispatch(fetchVideos({
            api_key: API_KEY,
            movieId: movieId
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, movieId]);

    const handleEnd = () => {
        handleBackPress();
    };

    const handleDonePress = () => {
        handleBackPress();
    };

    const videoKey = videos.length > 0 ? videos[0]?.key : '';
    console.log('video key', `https://www.youtube.com/watch?v=${videoKey}`)

    return (
        <View style={styles.container}>
            <YoutubePlayer
               height={Dimensions.get('window').height}
               width={Dimensions.get('window').width}
                play={true}
                videoId={videoKey}
                onChangeState={(event) => {
                    if (event === 'ended') {
                        handleEnd();
                    }
                }}
                webViewProps={{
                    injectedJavaScript: `
                      var element = document.getElementsByClassName('container')[0];
                      element.style.position = 'unset';
                      element.style.paddingBottom = 'unset';
                      true;
                    `,
                  }}
                //style={{ backgroundColor: 'black' }}
            />
            {/* <Video
                //ref={playerRef}
                source={{ uri: `https://www.youtube.com/watch?v=${videoKey}.mp4` }}
                style={styles.video}
                controls
                fullscreen
                resizeMode="cover"
                onEnd={handleEnd}
            /> */}
            {/* <View style={styles.buttonContainer}>
                <Button title="Done" onPress={() => {
                    handleDonePress();
                }} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
        marginBottom: 40
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
});

export default VideoScreen;
