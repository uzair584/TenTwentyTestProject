import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import fonts from '../styles/fonts';
import { scaleHeight, scaleWidth } from '../styles/responsive';
import theme from '../styles/theme';

const FullScreenLoader = ({ loading, title, customTitleStyle, spinnerStyle }) => {
    return (
        loading && <View style={styles.container}>

            <Spinner
                isTimer={false}
                lottieCustomStyle={[{
                    width: scaleWidth(150),
                    height: scaleHeight(150),
                }, spinnerStyle]} />
            {title && <Text style={[styles.titleStyle, { customTitleStyle }]}>{title}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.white,
    },
    titleStyle: {
        fontSize: scaleHeight(16),
        fontFamily: fonts.fontsType.regular,
        color: theme.black,
        position: 'absolute',
        bottom: '40%'
    },
});

export default FullScreenLoader;
