import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import Colors from "../constants/Colors";

class Item extends Component {

    state = {
        switch: this.props.data.turn,
    }


    switchChange = () => {
        this.setState({
            switch: !this.state.switch
        })
        console.log('switch inner');
        console.log(this.props.on);

        if (!this.state.switch) {
            this.props.save(true, this.props.data);
        } else {
            this.props.save(false, this.props.data.timestamp)
        }
    }

    render() {
        console.log('dziala');
        return (
            <View style={styles.cont}>
                <Image style={styles.image} source={require('./../assets/images/map.png')}/>
                <View style={styles.texts}>
                    <Text style={styles.text}>timestamp: {this.props.data.timestamp}</Text>
                    <Text style={styles.text}>latitude: {this.props.data.coords.latitude}</Text>
                    <Text style={styles.text}>longitude: {this.props.data.coords.longitude}</Text>
                </View>
                <Switch style={styles.switch} value={this.state.switch} onValueChange={this.switchChange}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: Colors.bc,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
        borderRadius: 8
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        resizeMode: 'center',
        margin: 2,
        flex: 1,
    },

    texts: {
        flex: 4,
    },

    text: {
      fontSize: 14
    },

    switch: {
        flex: 2,
    }
})

export default Item;
