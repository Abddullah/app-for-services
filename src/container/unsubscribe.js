import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View } from 'native-base';
import { Image, TextInput, ScrollView } from 'react-native';
import Textarea from 'react-native-textarea';
import * as firebase from 'firebase'
import LogoImage from '../component/logoImage';
import Loading from '../component/loader';
import ErrorMessage from '../component/errorMessage';
// import TextArea from '../component/textArea';
import { login } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { unSubscribe } from '../store/action/action';

import { connect } from 'react-redux';


import strInReqLan from "../store/config/config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {
    StyleSheet,

} from 'react-native';

class Unsubscribe extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            text: ""
        }
    }

    componentWillUnmount() {
        this.props.errorRemove()
    }

    unSubscribe() {
        // console.log(this.state.text)

        // if (this.state.text === "") {

        //     // alert("Please type reason for unsubscribe")

        //     this.setState({
        //         errState: strInReqLan.errState
        //     })
        // }
        // else {
        //     var user = {
        //         email: this.state.email,
        //         password: this.state.password,
        //         resonForDeactivate: this.state.text,

        //     }
        //     this.props.unSubscribe(user, this.props.navigation)
        //     this.setState({
        //         email: '',
        //         password: '',
        //         text: ""
        //     })
        // }


        var user = {
            email: this.state.email,
            password: this.state.password,
            resonForDeactivate: this.state.text,

        }
        this.props.unSubscribe(user, this.props.navigation)
        this.setState({
            email: '',
            password: '',
            text: ""
        })
    }



    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.errorMessage, '******************')
    }


    render() {

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Form>


                    {/* <View style={styles.imgView}>
              <Image style={{ width: 250, }} source={require('../assets/images/Logomarca.png')}
                resizeMode="contain" />


            </View> */}
                    <LogoImage />


                    <View style={{ alignItems: 'center', }}>


                        <Item rounded style={styl.input}>
                            <Input
                                placeholder={strInReqLan.email}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="#b3b3b3"
                                keyboardType={'email-address'}

                                style={{ marginLeft: "10%", fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ email: e }) }}
                                value={this.state.email}


                            />
                            {/* <Icon name="mail" style={styl.icons} /> */}
                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                source={require('../assets/images/emailblueios.png')}
                                resizeMode="contain"
                            /> */}
                            <Icon name='email' style={{ marginRight: 20, fontSize: 22, color: "#004D94" }} />

                        </Item>
                        <Item rounded style={styl.input}>
                            <Input
                                secureTextEntry
                                placeholder={strInReqLan.password}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="#b3b3b3"
                                style={{ marginLeft: "10%", fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ password: e }) }}
                                value={this.state.password}
                            />
                            {/* <Icon name="lock" style={styl.icons} /> */}
                            <Image style={{ width: 20.8, height: 32.2, marginRight: 20 }}
                                source={require('../assets/images/lock_blueios.png')}
                                resizeMode="contain"
                            />
                                {/* <Icon name='onepassword' style={{marginRight: 20 , fontSize: 22,color:"#004D94" }} /> */}

                        </Item>
                        <View style={styles.containerTextarea} >
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={(e) => { this.setState({ text: e }) }}
                                defaultValue={this.state.text}
                                maxLength={120}
                                placeholder={strInReqLan.textArea}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        {/* <Item rounded style={styl.input}>
                                <Input

                                    placeholder={strInReqLan.textArea}
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    style={{ marginLeft: "10%", fontSize: 15, height: 150 }}
                                    onChangeText={(e) => { this.setState({ text: e }) }}
                                    value={this.state.text}
                                />
                              
                            </Item> */}

                    </View>



                </Form>


                {

                    (this.props.isLoader === true) ?
                        (
                            <Loading />

                        ) :
                        (
                            < Button block info style={styl.button} onPress={this.unSubscribe.bind(this)}>
                                <Text style={styles.btnTextMargin}>{strInReqLan.unSubscribeForButton}</Text>
                            </Button>
                        )
                }

                {
                    (this.props.isError === true) ? (
                        <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                    ) : null
                }

                <Text style={styles.marginText}
                    onPress={() => this.props.navigation.navigate("Signin")}>
                    {strInReqLan.backToTheLoginPage}
                </Text>


            </ScrollView>


        );
    }
}



function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        unSubscribe: (userCredentials, navigation) => {
            dispatch(unSubscribe(userCredentials, navigation));
        },
        errorRemove: () => {
            dispatch(errorRemove());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Unsubscribe);


const styles = StyleSheet.create({
    containerTextarea: {
        width: "100%",
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

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


    contentContainer: {
        paddingBottom: 35,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        marginTop: 15
    },
    forgetYourPassword: {
        color: '#004D94',
        textAlign: 'center',
        margin: 15
        // marginTop: 15,
        // flexWrap: 'wrap', 
        // alignItems: 'flex-start',
        // flexDirection:'row',
    },
    btnTextMargin: {
        fontWeight: 'bold',
        marginTop: 15


    }


});

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 10, elevation: 15 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '80%', backgroundColor: '#EC4651', marginLeft: '10%', marginRight: '10%', marginTop: '5%', borderColor: '#EC4651', borderRadius: 100, borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },

    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})