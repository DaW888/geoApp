import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from "react-native-maps";
import Colors from "../constants/Colors";

class Map extends Component {

    static navigationOptions = {
        title: "Map",
        headerStyle: {
            backgroundColor: Colors.accDark,
        },
        headerTitleStyle: {
            color: Colors.bc
        },
        headerTintColor: Colors.bc
    }


    render() {
        return (
            <MapView style={{flex: 1}} initialRegion={{
                latitude: 50.0,
                longitude: 20.0,
                latitudeDelta: 0.6,
                longitudeDelta: 0.6
            }}>
                <MapView.Marker
                    coordinate={{
                        latitude: 50.111,
                        longitude: 20.111,
                    }}
                    title={"pos"}
                    description={"opis"}
                />
            </MapView>
        );
    }
}

export default Map;
