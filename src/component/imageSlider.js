import React, { Component } from 'react';
import {
    Container, Header, Content, Footer, FooterTab, Button, Text, Left,
    Body, Title, Right, Item, Spinner
} from 'native-base';
import {
    Alert, StyleSheet, ScrollView, View, KeyboardAvoidingView, Image, TextInput, AsyncStorage,
    TouchableOpacity, SafeAreaView, TouchableHighlight
} from 'react-native';
import SwitchButton from './mySwitchButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSlider from 'react-native-image-slider';








export default class imageSlieder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSwitch: 1

        }





    }


    render() {
        const images = this.props.imageArr
        console.log(images,"imagesimagesimagesimages")

        return (
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.content1}>
                    <Text style={styles.contentText}>Content 1</Text>
                </View> */}
                <ImageSlider
                    loopBothSides
                    autoPlayWithInterval={3000}
                    images={images}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{ uri: item }} style={styles.customImage} />
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={styles.buttons}>
                            {images.map((image, index) => {

                                console.log(images, "jjjjjjjjjjjjjjjjjjjjjjjj", image, index)

                                return (
                                    <TouchableHighlight
                                        key={index}
                                        underlayColor="#ccc"
                                        onPress={() => move(index)}
                                        style={styles.button}
                                    >
                                        <Text style={(position === index) ? (styles.buttonSelected) : (styles.buttonNotSelected)}>
                                            {index + 1}
                                        </Text>
                                    </TouchableHighlight>
                                );
                            })}
                        </View>
                    )}
                />
                {/* <View style={styles.content2}>
                    <Text style={styles.contentText}>Content 2</Text>
                </View> */}
            </SafeAreaView>
        )

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        // backgroundColor: 'red',
        // height:"15%",
        borderColor: "black",
        borderWidth: 1
        

    },
    slider: { backgroundColor: 'red', height: 550 },
    content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content2: {
        width: '100%',
        height: 100,
        marginTop: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: { color: 'red' },
    buttons: {
        // zIndex: 1,
        height: 25,
        // marginTop: -25,
        // marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(52, 52, 52, 0.1)'

    },
    button: {
        // backgroundColor:"yellow",
        margin: 3,
        width: 18,
        height: 18,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonSelected: {
        opacity: 1,
        color: 'white',
        fontSize: 25,
        fontWeight: "bold"
    },
    buttonNotSelected: {
        opacity: 1,
        color: 'black',
        fontSize: 15
    },
    customSlide: {
        // backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        // height:100
    },
    customImage: {
        width: "100%",
        height: 212,
    },

});