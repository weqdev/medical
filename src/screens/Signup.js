import React, { Fragment, Component } from 'react';
import {
    Alert,
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
import { Config } from '@jest/types';
import ConfigData from './config';

export default class SignupScreen extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    handleEmailChange = (email) => {
        this.setState({ email: email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    };

    emailCorrect = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
                            value={this.state.name}
                            onChangeText={(name) => { this.setState({ name: name }) }}
                            placeholder={"Your name"}
                        />
                        <FormTextInput
                            value={this.state.email}
                            onChangeText={this.handleEmailChange}
                            placeholder={"E-mail"}
                        />
                        <FormTextInput
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={this.handlePasswordChange}
                            placeholder={"Password"}
                        />
                        <FormTextInput
                            value={this.state.confirm_password}
                            secureTextEntry={true}
                            onChangeText={(confirm_password) => { this.setState({ confirm_password: confirm_password }) }}
                            placeholder={"Confirm Password"}
                        />
                        <Button label={"Log In"} onPress={(navigate) => {
                            let email = this.state.email.trim();
                            if (!this.emailCorrect(email)) {
                                Alert.alert("Error", "Invalid E-mail Address! Try again.");
                                return;
                            }

                            if (this.state.password.length < 4) {
                                Alert.alert("Error", "Invalid password! Try again.");
                                return;
                            }

                            fetch(ConfigData.SERVER_HOST + 'api/user/login',
                                {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        email: email.toLowerCase(),
                                        password: this.state.password,
                                    })
                                })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(responseJson);
                                    if (responseJson.message == "OK") {
                                        if (responseJson.isApproved)
                                            this.props.navigation.navigate('Main', { name: 'OK' });
                                        else
                                            Alert.alert("Error", "Your account is not approved yet. Please wait for the administrator to approve.");
                                    } else {
                                        Alert.alert('Error', "User not found or invalid password");
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    Alert.alert('Error', "Unexpected error has occurred");
                                });
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