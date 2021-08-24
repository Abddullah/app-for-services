import React, { Component } from 'react';
import {
    Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail,
    View, Picker, Left, Right, Spinner, Header, Body, Title, DatePicker, Tab, Tabs
} from 'native-base';
import { ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
import LogoImage from '../component/logoImage';
// import { createJobData, errorForPostJob } from '../store/action/action';
// import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Textarea from 'react-native-textarea';
import { getJobsListInUser, setIndex, logOut, report, setIndexForUser, deleteReport ,getJobsList} from '../store/action/action';

// import * as firebase from 'firebase'
// import FirebaseClient from './FirebaseClient'
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob







class UserHomeLoader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: strInReqLan.createNewJobs,
            // for job stats//
            jobTitle: "",
            status: strInReqLan.notStarted,
            email: "",
            responsibleName: "",
            responsibleNumber: "",
            contractNoOfJob: "",
            address: "",
            begginingDate: null,
            expTermDate: null,
            flagForTitle: false,
            flagForStatus: false,

            // for service stats//
            serTitle: "",
            serStatus: strInReqLan.active,
            serEmail: "",
            serResName: "",
            serResNum: "",
        }


    }
    setDateStarting(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ begginingDate: cloneDateInmiliSecond });

    }

    setDateExpirejob(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ expTermDate: cloneDateInmiliSecond });


    }






    componentWillMount() {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId + '/').once('value', (Snapshot) => {
        })
            .then((succes) => {
                let userRole = succes.val().role
                console.log(userRole)
                if (userRole === "company" || userRole === "empresa") {
                    this.props.getJobsList(this.props.navigation)

                }
                else {
                    this.props.getJobsListInUser(this.props.navigation)

                }
            })
            .catch((error) => {



                console.log(error, "userRoleuserRole")
            })
        // if(){

        // }   
        // else{
        //     this.props.getJobsListInUser(this.props.navigation)

        // } 

    }

















    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                flex: 1
            }}>


                <Image source={require('../assets/images/Logomarca.png')} resizeMode="contain"
                    style={{ height: "70%", width: "70%", flex: 3 }}
                />
                <ActivityIndicator style={{ flex: 1.5 }} size={40} color="#E71C29" />
                <View style={{ flex: 2 }}>
                    <Text style={{color:"grey"}}>{strInReqLan.starting} . . . . . </Text>
                </View>



            </View>


        );
    }
}


function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        allJobListArr: state.root.allJobListArr,
        allReportsArr: state.root.allReportsArr,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        createJobData: (userDetails, type, navigation) => {
            dispatch(createJobData(userDetails, type, navigation));
        },
        errorForPostJob: () => {
            dispatch(errorForPostJob());
        },
        getJobsListInUser: (navigation) => {
            dispatch(getJobsListInUser(navigation));
        },
        getJobsList: (navigation) => {
            dispatch(getJobsList(navigation));
        }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(UserHomeLoader);


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    // row1: {
    //     // flex: 2,
    //     // flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 200,

    //     top: -40


    //     // height: 200,

    // },
    containerForCanvas: {
        height: 220, marginTop: 12
    },

    functionButton: {
        marginHorizontal: 2.5, marginVertical: 8, height: 25, width: 50,
        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
    }
    ,


    containerTextarea: {
        // width: "100%",
        // flex: 1,
        padding: 12,
        borderRadius: 0,
        height: 250,
        backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '100%', margin: 10, elevation: 15
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
        // marginTop: 22

    }


});

const styl = StyleSheet.create({
    // header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 0.5, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },
    // input1: {height: "9.5%", width: "100%", borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: {width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    // icons: {color: '#2196f3', marginRight: 10 },
    // form: {backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { backgroundColor: '#EC4651', marginTop: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})