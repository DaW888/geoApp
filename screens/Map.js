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

    getMarks = () => {
        const locations = this.props.navigation.state.params.locations;
        const rendMark = locations.map(({timestamp, coords}) => {
            return <MapView.Marker
                key={timestamp}
                coordinate={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }}
                title={"position"}
                description={timestamp.toString()}
            />
        })
        return rendMark;
    };


    render() {
        const locations = this.props.navigation.state.params.locations;
        return (
            <MapView style={{flex: 1}} initialRegion={{
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }}>
                {this.getMarks()}
            </MapView>
        );
    }
}

export default Map;
