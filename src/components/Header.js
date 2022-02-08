import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { MAIN_RED, WHITE, OFF_RED } from '../helpers/colors';


const Header = ({
    leftType,
    title,
    navigation,
}) => {

    return <>
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
                {
                    leftType == 'back' ?
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.headerLeft}>Back</Text>
                        </TouchableOpacity>
                        : false
                }
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{title || 'News App'}</Text>
            </View>

            <View style={{ flex: 1 }} />
        </View>
        <View style={styles.borderBottom} />
    </>;
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: MAIN_RED,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    title: {
        color: WHITE,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerLeft: { color: WHITE, paddingTop: 3, textAlign: 'left' },
    headerRight: { color: WHITE, paddingTop: 3, textAlign: 'right' },
    borderBottom: {
        backgroundColor: OFF_RED,
        padding: 2,
        marginHorizontal: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    }
})

export default Header;