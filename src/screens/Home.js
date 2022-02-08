import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, FlatList, TextInput, ActivityIndicator, ImageBackground, RefreshControl, Modal } from 'react-native';
import { Header } from '../components';
import { BLACK, GRAY, MAIN_RED, OFF_RED, WHITE } from '../helpers/colors';
import { API_KEY } from '../helpers/key';
import { getDimensionHeight } from '../helpers/padding-helpers';

const Home = (props) => {
    const [news, setNews] = useState([]);
    const [newsBbc, setNewsBbc] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(2);
    const [pageSizeBbc, setPageSizeBbc] = useState(15);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        setLoading(true);
        fetch(`https://newsapi.org/v2/top-headlines?${searchfield != '' ? ('q=' + searchfield + '&') : ''}country=id&apiKey=${API_KEY}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setNews(data.articles)
            })
            .then(() => setLoading(false));


        fetch(`https://newsapi.org/v2/top-headlines?${searchfield != '' ? ('q=' + searchfield + '&') : ''}sources=bbc-news&apiKey=${API_KEY}&pageSize=${pageSizeBbc}`)
            .then(response => response.json())
            .then(data => {
                setNewsBbc(data.articles)
            })
            .then(() => setLoading(false));
    };

    const resetNews = () => {
        setLoading(true);
        fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${API_KEY}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setNews(data.articles)
            })
            .then(() => setLoading(false));


        fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}&pageSize=${pageSizeBbc}`)
            .then(response => response.json())
            .then(data => {
                setNewsBbc(data.articles)
            })
            .then(() => setLoading(false));
    };

    const doRefresh = () => {
        setRefreshing(true);
        fetchNews();
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
                <View style={{ flex: 1 }} />

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

    const renderContentCountry = () => {
        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                    <Text style={{
                        flex: 1,
                        letterSpacing: 0.5,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Top Headlines from Indonesia</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                            props.navigation.navigate('List', {
                                pageTitle: 'Top Headlines from Indonesia',
                                method: 'country=id',
                            })
                        }>
                        <Text style={{
                            textAlign: 'right',
                            flex: 1,
                            letterSpacing: 0.5,
                            color: MAIN_RED
                        }}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={{
                        marginTop: 10,
                    }}
                    horizontal={true}
                >
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {
                            news.length > 0 ?
                                news
                                    .map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    flex: 1,
                                                    paddingRight: 10,
                                                }}>
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    // style={styles.card}
                                                    onPress={() =>
                                                        props.navigation.navigate('Detail', {
                                                            item,
                                                        })
                                                    }>
                                                    <ImageBackground
                                                        style={{
                                                            width: 300,
                                                            height: 250,
                                                        }}
                                                        imageStyle={{ borderRadius: 10 }}
                                                        source={{
                                                            uri: item.urlToImage,
                                                        }}
                                                    >
                                                        <View style={{
                                                            position: 'absolute',
                                                            padding: 10,
                                                            bottom: 0,
                                                        }}>
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                letterSpacing: 0.5,
                                                                color: WHITE,
                                                            }}>{item.title}</Text>
                                                            <Text style={{
                                                                marginTop: 5,
                                                                fontWeight: 'bold',
                                                                letterSpacing: 0.5,
                                                                color: GRAY,
                                                            }}>{item.author}</Text>
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                : noData()
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    const noData = () => {
        return <Text>No data</Text>
    }

    const renderContentFromAnySources = () => {
        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        letterSpacing: 0.5,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Top Headlines from BBC</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() =>
                            props.navigation.navigate('List', {
                                pageTitle: 'Top Headlines from BBC',
                                method: 'sources=bbc-news',
                            })
                        }>
                        <Text style={{
                            textAlign: 'right',
                            flex: 1,
                            letterSpacing: 0.5,
                            color: MAIN_RED
                        }}>View All</Text>
                    </TouchableOpacity>
                </View>

                {
                    newsBbc.length > 0 ?
                        newsBbc
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

    const renderContent = () => {
        return <>
            {renderContentCountry()}
            {renderContentFromAnySources()}
        </>
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

export default Home;