import React, { Component } from 'react';
import { View, Text, style, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import { Container, Header, Content, Spinner, } from 'native-base';
import Textarea from 'react-native-textarea';
import strInReqLan from "../store/config/config";







class TextArea extends Component {
    constructor() {
        super()
        this.state = {
            // text: "ads"
        }
    }
    render() {
        return (
            
            <View style={styles.container} >
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    // onChangeText={this.onChange}
                    // defaultValue={this.state.text}
                    maxLength={120}
                    placeholder={strInReqLan.textArea}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
            </View>



        );
    }
}

export default TextArea;




const styles = StyleSheet.create({
    container: {
        width: "100%" ,
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,

        backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 10, elevation: 15 
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        // backgroundColor: '#F5FCFF',

    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
        
    },
});