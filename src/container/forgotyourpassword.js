import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View } from 'native-base';
import { Image } from 'react-native';
import * as firebase from 'firebase'
import LogoImage from '../component/logoImage';
import { resetEmail } from '../store/action/action';
import { connect } from 'react-redux';


import ErrorMessage from '../component/errorMessage';
import { errorRemove } from '../store/action/action';
import Loading from '../component/loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




// import { signupAction } from '../store/action/action';
// import { connect } from 'react-redux';


import strInReqLan from "../store/config/config";

import {
    StyleSheet,

} from 'react-native';

class ForGotYourPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',

        }



    }


    resetEmail() {

        var user = {
            email: this.state.email,
        }

        this.props.resetEmail(user, this.props.navigation)

        this.setState({
            email: ""
        })

    }



    render() {

        return (
            <Container>
                <Content>
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
                                <Icon name='email' style={{marginRight: 20 , fontSize: 22,color:"#004D94" }} />

                            </Item>
                        </View>







                    </Form>
                    {

                        (this.props.isLoader === true) ?
                            (
                                <Loading />

                            ) : (<Button block info style={styl.button} onPress={this.resetEmail.bind(this)} >
                                <Text style={styles.btnTextMargin}>{strInReqLan.sendEmail}</Text>
                            </Button>)
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





                </Content>
            </Container>

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
        resetEmail: (userDetails) => {
            dispatch(resetEmail(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(ForGotYourPassword);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    imgSize: {
        // justifyContent: 'center',
        // alignItems: 'center',
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

    btnTextMargin: {
        fontWeight: 'bold',

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