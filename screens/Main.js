import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from "../constants/Colors";
import Bt from "../components/Bt";

import * as Font from "expo-font";

import * as Permissions from "expo-permissions";


class Main extends Component {

    state = {
        fontloaded: false
    }

    static navigationOptions = {
        header: null,
    }

    setPermissions = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert("odmawiam przydzielenia uprawnien do czytania lokalizacji")
        }
    }

    componentDidMount = async () => {
        this.setPermissions();
        await Font.loadAsync({
            'Comfortaa': require('./../assets/fonts/Comfortaa.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({fontloaded: true})
    }

    clickStart = () => {
        this.props.navigation.navigate("List")
    };

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.display}>
                    {
                        this.state.fontloaded ?
                            [<Text key={'sad'} style={{fontSize: 36, fontFamily: 'Comfortaa'}}>GeoMap App</Text>,
                                <Text key={'asd'} style={{fontSize: 20, fontFamily: 'Comfortaa'}}>Find and save your
                                    position</Text>]
                            : null
                    }
                </View>
                <View style={styles.buttons}>
                    <Bt text={'START'} click={this.clickStart}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: Colors.bc
    },

    display: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.main

    },

    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Main;
