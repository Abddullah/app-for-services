import React, { Component } from 'react';
import { View, Text, style, StyleSheet, Image } from 'react-native';




class LogoImage extends Component {

    render() {
        return (
            <View style={styles.imgView}>
                <Image style={{ width: 250, }} source={require('../assets/images/Logomarca.png')}
                    resizeMode="contain" />
            </View>
        );
    }
}

export default LogoImage;




const styles = StyleSheet.create({

    contentContainer: {
        paddingVertical: 70,
        backgroundColor: "white"
    },

    imgSize: {
        width: "50%",
        height: 100,
    },
    imgView: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 200,


    },
    footerColor: {
        backgroundColor: "#cc3333"
    },
    marginText: {
        color: '#004D94',
        textAlign: 'center',
        marginTop: 0
    }


});