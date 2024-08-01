export const resetNavigation = (navigation, routeName, params = {}) => {
    navigation.reset({
        index: 0,
        routes: [{ name: routeName, params }],
    });
};
