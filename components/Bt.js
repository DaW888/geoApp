import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";


class Bt extends Component {

    defaultStyle = {
        cont: {
            backgroundColor: Colors.accLight,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            border: 0,
            borderRadius: 10,
            margin: 2,


        },
        text: {
            fontSize: 24,
            fontFamily: 'Roboto',
            color: Colors.text,
        }
    }

    render() {
        let style = this.defaultStyle;
        if (this.props.textStyle) {
            style.text = this.props.textStyle;
        }
        if(this.props.contStyle) {
            style.cont = this.props.contStyle;
        }

        return (
            <TouchableOpacity style={style.cont} onPress={this.props.click}>
                <Text style={style.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

Bt.propTypes = {
    text: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
    textStyle: PropTypes.object,
    contStyle: PropTypes.object
};

export default Bt;
