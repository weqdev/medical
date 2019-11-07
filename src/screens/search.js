import React from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stringLiteral } from '@babel/types';

const styles = StyleSheet.create({

});

export default class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.parentObj = props.parentObj;
        this.state = {
            searchText: '',
            searchResult: []
        };
    }

    componentDidMount() {
        this.parentObj.onSearchFieldChangeFromChild = this.onSearchFieldChange;
    }

    onSearchFieldChange = (text) => {
        text = String(text).trim();
        this.setState({ searchText: text });
        if (text.length == 0) {
            this.setState({ searchResult: [] });
        } else {
            this.setState({ errorText: global.apiConfig.api2URL });
            fetch(
                global.apiConfig.makeQueryString(global.apiConfig.api2URL, {
                    branded: true,
                    common: true,
                    query: text,
                    self: false
                }),
                {
                    method: 'get',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-app-id': global.apiConfig.appID,
                        'x-app-key': global.apiConfig.appKey,
                        'x-remote-user-id': 0
                    }
                }).then((response) => response.json()).then((responseJson) => {
                    var retVal = [];
                    for (const key in responseJson) {
                        if (responseJson.hasOwnProperty(key)) {
                            const element = responseJson[key];
                            retVal.push(
                                <View style={{ flex: 1, backgroundColor: 'lightgray', height: 30 }}>
                                    <Text style={{ lineHeight: 30 }}>{key}</Text>
                                </View>
                            );

                            for (const key1 in element) {
                                if (element.hasOwnProperty(key1)) {
                                    const ele = element[key1];
                                    retVal.push(
                                        <View style={{ flex: 1, height: 36, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                                            <Image source={{ uri: ele['photo']['thumb'] }}
                                                style={{
                                                    borderRadius: 15, width: 30, height: 30, borderWidth: 1, borderColor: 'lightgray',
                                                    position: 'absolute', left: 10, top: 3
                                                }}></Image>
                                            <Text style={{ position: 'absolute', left: 60, lineHeight: 36 }}>{ele['food_name']}</Text>
                                        </View>
                                    );
                                }
                            }
                        }
                    }

                    this.setState({ searchResult: retVal });
                }).catch(
                    (error) => {
                        console.log(error);
                        this.setState({
                            searchResult: [
                                <Text>error</Text>
                            ]
                        })
                    }
                )
        }
    };

    render() {
        return (
            <ScrollView style={{ flex: 1, width: Dimensions.get('screen').width }}>
                {
                    this.state.searchText.trim().length == 0 ?
                        <Text style={{ flex: 1, textAlign: 'center' }}>
                            <Icon name='long-arrow-up' size={30}></Icon>{"\n"}
                            Use the search box above to search{"\n"}
                            for foods to add to your log{"\n"}
                            {this.state.searchText}
                        </Text>
                        : this.state.searchResult
                }
            </ScrollView>
        );
    }
}
