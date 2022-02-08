import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, FlatList, TextInput, ActivityIndicator, ImageBackground, RefreshControl, Modal } from 'react-native';
import { Header } from '../components';
import { BLACK, GRAY, MAIN_RED, OFF_RED, WHITE } from '../helpers/colors';
import { API_KEY } from '../helpers/key';
import { getDimensionHeight } from '../helpers/padding-helpers';

const List = (props) => {
    const [news, setNews] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const [method, setMethod] = useState('');

    useEffect(() => {
        const { state } = props.navigation;
        setPageTitle(state.params.pageTitle);
        setMethod(state.params.method);
        fetchNews(state.params.method);
    }, []);

    const fetchNews = (method) => {
        setLoading(true);
        fetch(`https://newsapi.org/v2/top-headlines?${searchfield != '' ? ('q=' + searchfield + '&') : ''}${method}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setNews(data.articles)
            })
            .then(() => setLoading(false));
    };

    const resetNews = () => {
        setLoading(true);
        fetch(`https://newsapi.org/v2/top-headlines?${method}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setNews(data.articles)
            })
            .then(() => setLoading(false));
    };

    const doRefresh = () => {
        setRefreshing(true);
        fetchNews(method);
        setRefreshing(false);
    }

    const submitSearch = () => {
        setSearchVisible(searchVisible == true ? false : true);
        setSearchfield(searchfield);
        fetchNews();
    }

    const resetSearch = () => {
        setSearchVisible(searchVisible == true ? false : true);
        setSearchfield('');
        resetNews();
    }

    const HeaderHome = ({
        title
    }) => {

        return <>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Text style={styles.headerLeft}>Back</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title || 'News App'}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => setSearchVisible(searchVisible == true ? false : true)}>
                        <Text style={styles.headerRight}>{searchVisible == true ? 'Close' : 'Search'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.borderBottom} />
        </>
    }

    const renderLoader = () => {
        return <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#E63F34" />
        </View>
    }

    const noData = () => {
        return <Text>No data</Text>
    }

    const renderContent = () => {
        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <Text style={{
                    letterSpacing: 0.5,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 10,
                }}>{pageTitle}</Text>

                {
                    news.length > 0 ?
                        news
                            .map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            flex: 1,
                                            marginBottom: 10,
                                        }}>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            // style={styles.card}
                                            onPress={() =>
                                                props.navigation.navigate('Detail', {
                                                    item
                                                })
                                            }>
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                            }}>
                                                <Image
                                                    style={{
                                                        height: 80,
                                                        flex: 1,
                                                        borderRadius: 10,
                                                    }}
                                                    source={{
                                                        uri: item.urlToImage,
                                                    }}
                                                />
                                                <View style={{
                                                    flex: 2,
                                                    marginLeft: 10,
                                                    justifyContent: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        letterSpacing: 0.5,
                                                        color: BLACK,
                                                    }}>{item.title}</Text>
                                                    <Text style={{
                                                        marginTop: 5,
                                                        fontWeight: 'bold',
                                                        letterSpacing: 0.5,
                                                        color: GRAY,
                                                    }}>{item.author}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        : noData()
                }
            </View >
        );
    }

    return (
        <View >
            <StatusBar animated barStyle="light-content" backgroundColor={MAIN_RED} />
            <HeaderHome title="App News" />
            {/* <Header title="App News" /> */}

            {
                searchVisible == true ?
                    <View style={{
                        padding: 20
                    }}>
                        <TextInput
                            value={searchfield}
                            onChangeText={val => setSearchfield(val)}
                            placeholder="Type for something"
                            placeholderTextColor={GRAY}
                            style={{
                                // marginTop: getDimensionHeight(0.3),
                                borderBottomWidth: 1,
                                borderColor: MAIN_RED,
                                textAlign: 'center',
                                color: MAIN_RED,
                            }} />

                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: MAIN_RED,
                                borderRadius: 10,
                                padding: 15,
                            }}
                            onPress={() => submitSearch()}
                        >
                            <Text style={{
                                color: WHITE,
                                textAlign: 'center'
                            }}>Search</Text>
                        </TouchableOpacity>

                        {
                            searchfield ?
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: OFF_RED,
                                        borderRadius: 10,
                                        padding: 15,
                                    }}
                                    onPress={() => resetSearch()}
                                >
                                    <Text style={{
                                        color: MAIN_RED,
                                        textAlign: 'center'
                                    }}>Reset</Text>
                                </TouchableOpacity>
                                : false
                        }
                    </View>
                    :
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => doRefresh()}
                            />
                        }
                    >
                        <View style={styles.container}>
                            {
                                loading == true ?
                                    renderLoader()
                                    :
                                    renderContent()
                            }
                        </View>
                    </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 80,
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1,
    },
    searchCont: {
        position: 'absolute',
        marginBottom: 70,
        left: '20%',
        zIndex: 1,
        marginTop: 10,
    },
    searchfield: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        width: 250,
        borderRadius: 50,
    },

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
        letterSpacing: 0.5,
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
    },
    indicator: {
        marginTop: getDimensionHeight(0.3),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default List;