import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { GRAY } from '../helpers/colors';

const Detail = props => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const { state } = props.navigation;
        setItem(state.params.item)
    }, []);

    return item.title ? (
        <View>
            <Header leftType='back' navigation={props.navigation} />
            <View
                style={{
                    padding: 10
                }}
            >
                <Text style={{
                    letterSpacing: 0.5,
                    color: GRAY,
                    marginTop: 10,
                }}>{item.publishedAt}</Text>
                <Text style={{
                    letterSpacing: 0.5,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 10,
                }}>{item.title}</Text>

                <Image
                    style={
                        styles.image
                    }
                    source={{
                        uri: item.urlToImage,
                    }}
                />

                <Text style={{
                    color: GRAY,
                    letterSpacing: 0.5,
                    marginVertical: 10,
                }}>Author: {item.author}</Text>

                <Text style={{
                    color: GRAY,
                    letterSpacing: 0.5,
                    marginVertical: 10,
                }}>{item.content}</Text>
            </View>
        </View>
    ) : (
        <Text>No data</Text>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    text: {
        fontSize: 22,
        marginBottom: 15,
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Detail;