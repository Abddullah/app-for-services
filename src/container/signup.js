import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Spinner } from 'native-base';
import { ScrollView, Image } from 'react-native';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
import LogoImage from '../component/logoImage';
import { signupAction } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




import {
    StyleSheet,
} from 'react-native';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            // for user stats//
            userName: '',
            userEmail: '',
            userPassword: '',
            userRepeatePassword: '',
            userTelephone: '',


            // for company stats//
            companyEmail: '',
            companyName: '',
            companyPassword: '',
            companyRepeatePassword: '',
            companyTelephone: '',


            role: strInReqLan.collaborator,

        }
    }


    onSubmit() {
        if (this.state.role === strInReqLan.collaborator) {
            let user = {
                name: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword,
                confirmPassword: this.state.userRepeatePassword,
                telephone: this.state.userTelephone,
                role: this.state.role.toLowerCase(),
                active: true,

            }
            console.log("hello", user)
            this.props.signupAction(user, strInReqLan.collaboratorForDatabase, this.props.navigation)
        }
        else if (this.state.role === strInReqLan.company) {
            let user = {
                email: this.state.companyEmail,
                name: this.state.companyName,
                password: this.state.companyPassword,
                confirmPassword: this.state.companyRepeatePassword,
                telephone: this.state.companyTelephone,
                role: this.state.role.toLowerCase(),
                active: true,
            }
            this.props.signupAction(user, strInReqLan.companyForDatabase, this.props.navigation)
        }

        // else {
        //     alert("something went wrong")

        // }

    }

    componentWillUnmount() {


        this.props.errorRemove()


    }




    onValueChange(value) {
        console.log(value)
        this.setState({ role: value });
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Form>
                    <LogoImage />

                    {/* ///////////////////////////////DROPDOWN/////////////////////////////// */}

                    <View style={{ alignItems: 'center', }}>
                        <View style={{ alignItems: 'center', marginVertical: '1%' }}>
                            <Item rounded style={styl.input} >
                                <Picker mode="dropdown" selectedValue={this.state.role} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                                    {/* <Items style={{ fontWeight: 5, fontSize: 12, }} label={strInReqLan.signUpAs} value={strInReqLan.signUpAs} /> */}
                                    <Items style={{ fontSize: 12 }} label={strInReqLan.collaborator} value={strInReqLan.collaborator} />

                                    <Items style={{ fontSize: 12 }} label={strInReqLan.company} value={strInReqLan.company} />
                                </Picker>
                                {/* <Icon name="ios-arrow-down-outline" style={{color: '#2196f3', marginRight: 25}} /> */}
                            </Item>
                        </View>


                        {
                            (this.state.role === strInReqLan.collaborator) ? (<View>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.userName}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        keyboardType={'email-address'}

                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ userName: e }) }}


                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    <Image style={{ width: 23, height: 18, marginRight: 20 }}
                                        source={require('../assets/images/master_icon.png')}
                                        resizeMode="contain"

                                    />

                                    {/* <Icon name='user' style={{ marginRight: 20, fontSize: 22, color: "#004D94" }} /> */}

                                </Item>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.email}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        keyboardType={'email-address'}

                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ userEmail: e }) }}


                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
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
                                        onChangeText={(e) => { this.setState({ userPassword: e }) }}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    <Image style={{ width: 20.8, height: 25, marginRight: 20 }}
                                        source={require('../assets/images/lock_blueios.png')}
                                        resizeMode="contain"
                                    />
                                    {/* <Icon name='onepassword' style={{ marginRight: 20, fontSize: 22, color: "#004D94" }} /> */}

                                </Item>
                                <Item rounded style={styl.input}>
                                    <Input
                                        secureTextEntry
                                        placeholder={strInReqLan.repeatePassword}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ userRepeatePassword: e }) }}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    {/* <Image style={{ width: 20.8, height: 25, marginRight: 20 }}
                                        source={require('../assets/images/lock_blueios.png')}
                                        resizeMode="contain"
                                    /> */}
                                    <Image style={{ width: 20.8, height: 25, marginRight: 20 }}
                                        source={require('../assets/images/lock_blueios.png')}
                                        resizeMode="contain"
                                    />
                                </Item>

                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.telephoneNumber}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        // keyboardType={'email-address'}
                                        keyboardType={'numeric'}
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ userTelephone: e }) }}


                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                        source={require('../assets/images/telephonelogo.png')}
                                        resizeMode="contain"

                                    /> */}
                                    <Icon name='cellphone' style={{ marginRight: 20, fontSize: 22, color: "#004D94" }} />

                                </Item>
                            </View>) : (<View>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.companyName}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        keyboardType={'email-address'}

                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ companyName: e }) }}


                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                        source={require('../assets/images/master_icon.png')}
                                        resizeMode="contain"

                                    />
                                </Item>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.companyEmail}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        keyboardType={'email-address'}

                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ companyEmail: e }) }}


                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                        source={require('../assets/images/emailblueios.png')}
                                        resizeMode="contain"

                                    />
                                </Item>
                                <Item rounded style={styl.input}>
                                    <Input
                                        secureTextEntry
                                        placeholder={strInReqLan.companyPassword}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ companyPassword: e }) }}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    <Image style={{ width: 20.8, height: 25, marginRight: 20 }}
                                        source={require('../assets/images/lock_blueios.png')}
                                        resizeMode="contain"
                                    />
                                </Item>

                                <Item rounded style={styl.input}>
                                    <Input
                                        secureTextEntry
                                        placeholder={strInReqLan.repeateCompanyPassword}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ companyRepeatePassword: e }) }}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    <Image style={{ width: 20.8, height: 25, marginRight: 20 }}
                                        source={require('../assets/images/lock_blueios.png')}
                                        resizeMode="contain"
                                    />
                                </Item>

                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.companyTelephoneNumber}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        // keyboardType='phone-pad'
                                        keyboardType={'numeric'}
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ companyTelephone: e }) }}
                                    // dataDetectorTypes ={"phoneNumber"}

                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                        source={require('../assets/images/telephonelogo.png')}
                                        resizeMode="contain"

                                    />
                                </Item>
                            </View>)

                        }


                    </View>


                    {

                        (this.props.isLoader === true) ?
                            (
                                <Loading />

                            ) :
                            (
                                <Button block info style={styl.button} onPress={this.onSubmit.bind(this)}>
                                    <Text style={styles.btnTextMargin}>{strInReqLan.joinApp}</Text>
                                </Button>

                            )
                    }

                    {
                        (this.props.isError === true) ? (
                            <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                        ) : null
                    }




                </Form>




                {/* <View>
                    <Text>Hello</Text>
                </View> */}

                {/* <ErrorMessage errorMessge='' /> */}

                <Text style={styles.marginText}
                    onPress={() => this.props.navigation.navigate("Signin")}>
                    {strInReqLan.hvUalrAcc}
                </Text>
                <Text style={styles.marginText}
                >
                    {strInReqLan.readTermsOfUse}
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
        signupAction: (userDetails, collaborator, navigation) => {
            dispatch(signupAction(userDetails, collaborator, navigation));
        },
        errorRemove: () => {
            dispatch(errorRemove());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SignUp);


const styles = StyleSheet.create({

    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",

    },

    imgSize: {
        width: "50%",
        // height: 100,
    },
    imgView: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        // height: 200,


    },
    footerColor: {
        backgroundColor: "#cc3333"
    },
    marginText: {
        color: '#004D94',
        textAlign: 'center',
        // marginTop: 0
        marginBottom: 7,
        marginTop: 7

    },
    btnTextMargin: {
        fontWeight: 'bold',
        marginTop: 15

    }


});

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '80%', backgroundColor: '#EC4651', marginLeft: '10%', marginRight: '10%', marginTop: '5%', borderColor: '#EC4651', borderRadius: 100, borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})