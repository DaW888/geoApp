import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, AsyncStorage, Switch} from 'react-native';
import Colors from "../constants/Colors";
import Bt from "../components/Bt";
import * as Location from "expo-location";
import Item from "./Item";


class List extends Component {

    static navigationOptions = {
        title: "List of Localizations",
        headerStyle: {
            backgroundColor: Colors.accDark,
        },
        headerTitleStyle: {
            color: Colors.bc
        },
        headerTintColor: Colors.bc
    }


    state = {
        data: null,
        render: false,
        switch: false,
        locToMap : [],
    }

    componentDidMount = async () => {
        await this.getAllData();
        this.setState({
            render: true
        })
    }


    getPosition = async () => {
        console.log('get pos');
        let pos = await Location.getCurrentPositionAsync();
        alert(JSON.stringify(pos, null, 4));
        this.savePosition(pos)
    }

    savePosition = async (pos) => {
        await AsyncStorage.setItem(pos.timestamp.toString(), JSON.stringify(pos, null));
        this.getAllData();
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);

        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            console.log(key, value);
            const val = JSON.parse(value);
            val.turn = false;
            return val
        });
        console.log(maps);

        this.setState({
            data: maps
        })
    }


    removeData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        console.log('remove data');
        await AsyncStorage.multiRemove(keys);
        await this.getAllData();

    }

    goToMap = () => {
        this.props.navigation.navigate("Map")
    }

    changeSwitch = () => {
        console.log('switch 1');
        this.setState({
            switch: !this.state.switch
        })
        console.log(this.state.switch);

        const data = this.state.data.map(el => {
            el.turn = true;
            return el
        })

        this.setState({
            data
        })

    }

    save = (save, data) => {
        // const map = this.state.locToMap;
        // if (save) {
        //     this.setState( {
        //         locToMap: map.push(data)
        //     })
        // } else {
        //     const m = map.reduce(el => {
        //         if (el.timestamp !== data)
        //             return el
        //     })
        //     this.setState({
        //         locToMap: m
        //     })
        // }
        //
        // console.log(this.state.locToMap);
    }

    btStyles = {
        cont: {
            backgroundColor: Colors.accLight,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            border: 0,
            borderRadius: 10,
            margin: 2,
            flex: 1

        },
        text: {
            fontSize: 16,
            fontFamily: 'Roboto',
            color: Colors.text,
        }
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.bar}>
                    <Bt textStyle={this.btStyles.text} contStyle={this.btStyles.cont} text={'get and save position'}
                        click={this.getPosition}/>
                    <Bt textStyle={this.btStyles.text} contStyle={this.btStyles.cont} text={'remove all data'}
                        click={this.removeData}/>
                </View>
                <View style={styles.toMap}>
                    <Bt textStyle={this.btStyles.text} contStyle={this.btStyles.cont} text={'Go to Map'}
                        click={this.goToMap}/>
                    <Switch value={this.state.switch} onValueChange={this.changeSwitch}/>
                </View>

                <View style={styles.items}>
                    {
                        this.state.render ?
                            <FlatList
                                data={this.state.data} keyExtractor={(item, index) => item + index}
                                renderItem={({item}) => <Item key={item.timestamp} data={item} on={this.state.switch} save={this.save}/>}
                            />
                            : null
                    }
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

    bar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    getPosBt: {
        flex: 1,
    },
    removePosBt: {
        flex: 1,
    },

    items: {
        flex: 10,
    },
    toMap: {
        flex: 1,
        flexDirection: 'row'
    }

});


export default List;

