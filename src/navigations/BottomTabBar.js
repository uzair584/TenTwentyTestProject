import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

import {
    MediaLibrary,
    More,
    MovieList,
    Watch
} from '..';
import { SCREENS } from '../constants';
import { dashboardImg, mediaImg, moreImg, watchImg } from '../assets/images';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const icons = [dashboardImg, watchImg, mediaImg, moreImg];
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
            }}
            tabBar={(props) => <CustomBottomTabBar {...props} icons={icons} />}>
            <Tab.Screen name={SCREENS.MOVIE_LIST}
                component={MovieList}
                options={{
                    headerShown: false,
                    title: "Dashboard",
                }} />
            <Tab.Screen name={SCREENS.WATCH} component={Watch}
                options={{
                    headerShown: false,
                    title: "Watch",
                }} />
            <Tab.Screen name={SCREENS.MEDIA_LIBRARY} component={MediaLibrary}
                options={{
                    headerShown: false,
                    title: "Media Library",
                }} />
            <Tab.Screen name={SCREENS.MORE} component={More}
                options={{
                    headerShown: false,
                    title: "More",
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
