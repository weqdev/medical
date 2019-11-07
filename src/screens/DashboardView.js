import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLabelPrinter } from 'jest-matcher-utils';

const styles = StyleSheet.create({

});

const getWeekday = (d) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[d.getDay()];
}

const getLabel = (date) => {
    return (date.getMonth() + 1) + "/" + date.getDate() + " " + getWeekday(date)
};

export default class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),
            todayLabel: getLabel(new Date()),
            dinners: []
        }

        this.onPrevDate = this.onPrevDate.bind(this);
        this.onNextDate = this.onNextDate.bind(this);
        this.addFood = this.addFood.bind(this);
    }

    onPrevDate = () => {
        var prevDay = new Date(this.state.today.getTime() - 1000 * 3600 * 24);
        this.setState({
            today: prevDay,
            todayLabel: getLabel(prevDay)
        });
    };

    onNextDate = () => {
        var nextDay = new Date(this.state.today.getTime() + 1000 * 3600 * 24);
        this.setState({
            today: nextDay,
            todayLabel: getLabel(nextDay)
        });
    };

    addFood = () => {

    };

    render() {
        return (
            <View style={{ flex: 1, width: Dimensions.get("screen").width }}>
                <View style={{ width: '100%', height: 40, backgroundColor: '#333' }}>
                    <Text style={{ lineHeight: 40, flex: 1, textAlign: 'center', color: 'white', fontSize: 16 }}>{this.state.todayLabel}</Text>
                    <TouchableOpacity style={{ position: "absolute", left: 5 }} onPress={this.onPrevDate}>
                        <Text style={{ lineHeight: 40, color: 'white' }}>
                            <Icon name="chevron-left" size={20}></Icon>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: "absolute", right: 5 }} onPress={this.onNextDate}>
                        <Text style={{ lineHeight: 40, color: 'white' }}>
                            <Icon name="chevron-right" size={20}></Icon>
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ width: Dimensions.get('screen').width, flexDirection: 'column', alignItems: 'stretch' }}>
                        <View style={{ flex: 1, height: 25, backgroundColor: 'lightgray' }}>
                            <Text style={{ lineHeight: 25 }}>Breakfast</Text>
                            <Text style={{ position: 'absolute', right: 10, lineHeight: 25 }} onPress={this.addFood}>
                                <Icon name='plus' size={20}></Icon>
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {
                                this.showFoodsInDinner(0)
                            }
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }

    showFoodsInDinner = (time) => {
        return <Text>OK</Text>;

        let dinners = this.state.dinners;
        var retDinners = [];
        for (let i = 0; i < dinners.length; i++) {
            retDinners.push(
                <View style={{ flex: 1, height: 35 }}>
                    <Text>OK</Text>
                </View>
            )
        }
    }
}
