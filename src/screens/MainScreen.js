import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import { getStatusBarHeight } from 'react-native-status-bar-height';

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

        this.state = {
            isOpen: false,
            selectedItem: 'Home',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.navigationBar}>
                    <Text style={styles.navigationTitle}>
                        Main Screen
                    </Text>
                    <TouchableOpacity
                        onPress={this.toggle}
                        style={styles.backButton}
                    >
                        <Image
                            source={image}
                            style={{ width: 32, height: 32, marginTop: getStatusBarHeight() }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>
                    <Text>{getStatusBarHeight()}</Text>
                </View>
                <View style={styles.tabBar}>
                    <TouchableOpacity style={[styles.tabBarChild, { flexDirection: 'column' }]}>
                        <Text style={{ textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}><Icon name='rocket' size={20} ></Icon></Text>
                        <Text style={[styles.tabLabel, { textAlign: 'center' }]}>Dashboard</Text>
                    </TouchableOpacity>
                    <Text style={styles.tabBarChild}>Stats</Text>
                    <Text style={styles.tabBarChild}>Track</Text>
                    <Text style={styles.tabBarChild}>Suggested</Text>
                    <Text style={styles.tabBarChild}>Preferences</Text>
                </View>
            </SideMenu>
        );
    }
}
