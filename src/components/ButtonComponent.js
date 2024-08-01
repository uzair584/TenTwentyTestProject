import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import theme from '../styles/theme';
import { scaleHeight, scaleWidth } from '../styles/responsive';
import fonts from '../styles/fonts';



const Button = ({ title, onPress, loading, disabled, customStyle, textCustomStyle, icon, isBgTransparent = false }) => {
    return (
        <>
            <TouchableOpacity
                style={[styles.button, customStyle]}
                onPress={onPress}
                disabled={disabled}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={!isBgTransparent ? theme.black : theme.secondary} />
                ) : (
                    <View style={styles.content}>
                        {icon && <View style={styles.icon}>{icon}</View>}
                        <Text style={[styles.buttonText, textCustomStyle]}>{title}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.secondary,
        borderRadius: 10,
        width: '90%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
        left: scaleWidth(-5)
    },
    buttonText: {
        color: theme.white,
        fontFamily: fonts.fontsType.semiBold,
        fontSize: scaleHeight(14),
        textAlign: 'center',
    },
});

export default Button;
