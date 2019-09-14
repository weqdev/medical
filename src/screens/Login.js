import React, { Fragment, Component } from 'react';
import {
    Image,
    Keyboard,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    View,
    Text,
    StatusBar
} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";


export default class LoginScreen extends Component {
    state = {
        email: "",
        password: ""
    };

    handleEmailChange = (email) => {
        this.setState({ email: email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };
    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>

                    <View style={{ flex: 1, width: '100%', height: '30%', padding: 0, paddingTop: '30%', backgroundColor: 'white' }}>
                        <Text style={{ color: 'black', fontSize: 35, textAlign: 'center' }}>Medical App Test</Text>
                    </View>
                    <View style={{ flex: 1, width: "80%" }}>
                        <FormTextInput
                            value={this.state.email}
                            onChangeText={this.handleEmailChange}
                            placeholder={"E-mail"}
                        />
                        <FormTextInput
                            value={this.state.password}
                            onChangeText={this.handlePasswordChange}
                            placeholder={"Password"}
                        />
                        <Button label={"Log In"} onPress={(navigate) => {
                            this.props.navigation.navigate('Main', { name: 'OK' });
                        }} />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

        );
    }
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        //justifyContent: "space-between"
    }
});