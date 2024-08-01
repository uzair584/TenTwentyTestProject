import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import theme from './src/styles/theme';
import Root from './src/navigations/Root';


const App = () => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
});

export default App;
