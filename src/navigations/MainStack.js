import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../constants';
import BottomTabNavigator from './BottomTabBar';
import { MovieDetails, SearchMovies, VideoScreen } from '..'


const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.MAIN_DASHBOARD} component={BottomTabNavigator} />
            <Stack.Screen name={SCREENS.MOVIE_DETAIL} component={MovieDetails} />
            <Stack.Screen name={SCREENS.MOVIE_SEARCH} component={SearchMovies} />
            <Stack.Screen name={SCREENS.VIDEO_SCREEN} component={VideoScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
