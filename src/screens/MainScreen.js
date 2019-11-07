import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DashboardView from './DashboardView';
import StatsView from './StatsView';
import TrackView from './TrackView';
import SuggestedView from './SuggestedView';
import PreferenceView from './PreferenceView';
import ConfigData from './config';
import SearchView from './search';

const image = require('../assets/images/menu.png');

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        paddingTop: 4,
        paddingLeft: 10
    },
    navigationTitle: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 8,
        marginTop: getStatusBarHeight(),
        fontSize: 20,
        position: 'absolute',
        color: 'white'
    },
    navigationTitleSearch: {
        width: '100%',
        paddingTop: 8,
        marginTop: getStatusBarHeight() - 3,
        position: 'absolute'
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        marginTop: 44 + getStatusBarHeight(),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginBottom: 44 + getStatusBarHeight()
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navigationBar: {
        height: 44 + getStatusBarHeight(),
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'green',
    },
    tabBar: {
        height: 44 + getStatusBarHeight(),
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'green',
        flexDirection: 'row'
    },
    tabBarChild: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },
    tabLabel: {
        fontSize: 12
    }
});

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.nagivation = this.props.navigation;
        this.state = {
            isOpen: false,
            selectedItem: 'Home',
            tabIndex: 0,
            titleBarSearch: 1
        };
        this.onSearchFieldFocus = this.onSearchFieldFocus.bind(this);
        this.ShowContent = this.ShowContent.bind(this);
        this.onSearchFieldChangeFromChild = (text) => { };
    }

    toggle() {
        if (this.state.tabIndex != ConfigData.TAB_SEARCH)
            this.setState({
                isOpen: !this.state.isOpen,
            });
        else {
            this.setState({
                tabIndex: ConfigData.TAB_DASHBOARD
            });
            Keyboard.dismiss();
        }


    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });


    addCart = () => {

    };

    ShowContent = () => {
        switch (this.state.tabIndex) {
            case 0:
                return <DashboardView parentObj={this}></DashboardView>;
            case 1:
                return <StatsView parentObj={this}></StatsView>;
            case 2:
                return <TrackView parentObj={this}></TrackView>;
            case 3:
                return <SuggestedView parentObj={this}></SuggestedView>;
            case 4:
                return <PreferenceView parentObj={this}></PreferenceView>;
            case ConfigData.TAB_SEARCH:
                return <SearchView parentObj={this} ></SearchView>;
        }

        return null;
    };

    onSearchFieldFocus = () => {
        this.setState({ tabIndex: ConfigData.TAB_SEARCH })
    };

    onSearchFieldChange = (text) => {
        this.onSearchFieldChangeFromChild(text);
    };

    render() {
        const contentView = <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {this.ShowContent()}
            </View>
        </View>;

        const menu = <Menu onItemSelected={this.onMenuItemSelected} contentView={this} />;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.navigationBar}>
                    {
                        !(this.state.tabIndex == ConfigData.TAB_DASHBOARD || this.state.tabIndex == ConfigData.TAB_TRACK || this.state.tabIndex == ConfigData.TAB_SEARCH) ?
                            (
                                <Text style={styles.navigationTitle}>
                                    {
                                        (() => {
                                            switch (this.state.tabIndex) {
                                                case 0:
                                                    return "Dashboard";
                                                case 1:
                                                    return "Stats";
                                                case 2: return "Track";
                                                case 3: return "Suggested";
                                                case 4: return "Preferences";
                                            }
                                        })()
                                    }
                                </Text>
                            ) : (
                                <View style={[styles.navigationTitleSearch, { flexDirection: 'row' }]}>
                                    <TextInput placeholder="Search foods to log"
                                        onChangeText={this.onSearchFieldChange}
                                        style={{
                                            flex: 1, marginLeft: 80, marginRight: 80,
                                            paddingLeft: 5, height: 30, backgroundColor: 'white',
                                            borderRadius: 3, marginTop: 0, marginBottom: 2,
                                        }} onFocus={this.onSearchFieldFocus}>

                                    </TextInput>
                                    <TouchableOpacity style={{ position: 'absolute', right: 85, top: 3 }}>
                                        <Icon5 name='barcode' style={{ lineHeight: 40 }} size={30}></Icon5>
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                    <TouchableOpacity
                        onPress={this.toggle}
                        style={[styles.backButton, { marginTop: getStatusBarHeight() }]}
                    >
                        <Text style={{ color: 'white' }}>
                            {this.state.tabIndex != ConfigData.TAB_SEARCH ? <Icon5 name='bars' size={30}></Icon5> : <Icon5 name='angle-left' size={30}></Icon5>}
                        </Text>
                    </TouchableOpacity>

                    {
                        (this.state.tabIndex == 0 || this.state.tabIndex == 2) ?
                            (
                                <TouchableOpacity
                                    onPress={this.addCart}
                                    style={[styles.backButton, { marginTop: getStatusBarHeight(), right: 14 }]}
                                >
                                    <Text style={{ color: 'white' }}>
                                        <Icon5 name='shopping-cart' size={30}></Icon5>
                                    </Text>
                                    <Text adjustsFontSizeToFit numberOfLines={1}
                                        style={{
                                            color: 'white', lineHeight: 16, backgroundColor: 'red',
                                            textAlign: 'center', borderRadius: 8, width: 16, height: 16,
                                            position: 'absolute', right: -4, top: 0
                                        }}>
                                        1
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View />
                            )
                    }
                </View>
                {
                    contentView
                }
                <View style={styles.tabBar}>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]} onPress={() => { this.setState({ tabIndex: 0 }) }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: (this.state.tabIndex == 0 ? "white" : "black") }}><Icon name='columns' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center', color: (this.state.tabIndex == 0 ? "white" : "black") }]}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]} onPress={() => { this.setState({ tabIndex: 1 }) }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: (this.state.tabIndex == 1 ? "white" : "black") }}><Icon name='signal' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center', color: (this.state.tabIndex == 1 ? "white" : "black") }]}>Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]} onPress={() => { this.setState({ tabIndex: 2 }) }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: (this.state.tabIndex == 2 ? "white" : "black") }}><Icon name='magic' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center', color: (this.state.tabIndex == 2 ? "white" : "black") }]}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]} onPress={() => { this.setState({ tabIndex: 3 }) }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: (this.state.tabIndex == 3 ? "white" : "black") }}><Icon name='wpexplorer' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center', color: (this.state.tabIndex == 3 ? "white" : "black") }]}>Suggested</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]} onPress={() => { this.setState({ tabIndex: 4 }) }}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: (this.state.tabIndex == 4 ? "white" : "black") }}><Icon name='cogs' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center', color: (this.state.tabIndex == 4 ? "white" : "black") }]}>Preferences</Text>
                    </TouchableOpacity>
                </View>
            </SideMenu>
        );
    }
}
