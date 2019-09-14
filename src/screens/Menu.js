import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';
import { tsConstructorType } from '@babel/types';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 40,
        marginLeft: 20
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: 20
    },
});

export default class Menu extends React.Component {
    state = {
        selectedIndex: 0
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.onClickMenuItem = this.onClickMenuItem.bind(this);
        this.onItemSelected = this.props.onItemSelected;
    }

    onClickMenuItem = (label, index) => {
        this.onItemSelected(label);
        this.setState({ selectedIndex: index });
    }

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri }}
                    />
                    <Text style={styles.name}>Your name</Text>
                </View>

                <Text
                    onPress={() => { this.onClickMenuItem('Home', 0) }}
                    style={[styles.item, this.state.selectedIndex == 0 ? { backgroundColor: 'white' } : {}]}
                >
                    About
            </Text>

                <Text
                    onPress={() => { this.onClickMenuItem('Contacts', 1) }}
                    style={[styles.item, this.state.selectedIndex == 1 ? { backgroundColor: 'white' } : {}]}
                >
                    Contacts
            </Text>
            </ScrollView>
        );
    }
}
