import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet, Text,
    View, Image, ImageBackground
} from 'react-native';
import strInReqLan from "../AwesomeProject/src/store/config/config";

// import Loading from '../component/loader';

import { Container, Header, Content, Spinner, } from 'native-base';
// import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Loading from '../AwesomeProject/src/component/loader';



import * as firebase from "firebase";
class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }



    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log(user.uid)
                firebase.database().ref('/users/' + user.uid + '/').once('value', (Snapshot) => {
                    let role = Snapshot.val().role
                    console.log(role, "Snapshot")
                    if (role === "collaborator" || role === "collaborator") {
                        this.props.navigation.navigate('AppStackUser');
                    }
                    else {
                        this.props.navigation.navigate('AppStackCompany');
                    }

                })

            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }




    // // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //     // const userToken = await AsyncStorage.getItem('userToken');
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             // User is signed in.
    //             console.log(user.uid)
    //             firebase.database().ref('/users/' + user.uid + '/').once('value', (Snapshot) => {
    //                 let role = Snapshot.val().role
    //                 console.log(role, "Snapshot")
    //                 if (role === "collaborator" || role === "collaborator") {
    //                     this.props.navigation.navigate('AppStackUser');
    //                 }
    //                 else {
    //                     this.props.navigation.navigate('AppStackCompany');
    //                 }

    //             })

    //         } else {
    //             this.props.navigation.navigate('Auth');
    //         }
    //     });
    //     // This will switch to the App screen or Auth screen and this loading
    //     // screen will be unmounted and thrown away.
    // };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>

                {/* <Image source={require('../AwesomeProject/src/assets/images/Logomarca.png')} resizeMode="contain"
                    style={{ height: "70%", width: "70%" }}
                />
                <ActivityIndicator style={styles.row1} size={40} color="#E71C29" />
                <View><Text>Starting . . . . . </Text></View> */}
                
                <Image source={require('../AwesomeProject/src/assets/images/Logomarca.png')} resizeMode="contain"
                    style={{ height: "70%", width: "70%", flex: 3 }}
                />
                <ActivityIndicator style={{ flex: 1.5 }} size={40} color="#E71C29" />
                <View style={{flex:2}}>
                    <Text>{strInReqLan.starting} . . . . . </Text>
                </View>
              

            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        // marginTop: 30,
        // width: 150,
        // height: 153,
    },
    row1: {
        // flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,

        top:-40


        // height: 200,

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
        // backgroundColor: '#F0E4D2',
    },
    Bubbles: {
        justifyContent: 'center',
        alignItems: 'center',
    },

})
export default AuthLoading;