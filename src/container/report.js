import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, ListItem, CheckBox, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body, Title, DatePicker } from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
import LogoImage from '../component/logoImage';
import { createJobData, errorForPostJob, createReportData, loaderStart } from '../store/action/action';
// import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Textarea from 'react-native-textarea';
import PrSelectionJobs from '../component/renderAllPrForJobs';


// import * as firebase from 'firebase'
// import FirebaseClient from './FirebaseClient'
import RNFetchBlob from 'rn-fetch-blob'

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob







class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUserName: "",
            type: "",
            Title: "",
            jobkeys: "",
            checkedFlag: true,
            selectedPr: ""

        }
        this.path = 0
        this.setDateStarting = this.setDateStarting.bind(this);
        this.setDateExpirejob = this.setDateExpirejob.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

    }
    setDateStarting(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ begginingDate: cloneDateInmiliSecond });

    }

    setDateExpirejob(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ expTermDate: cloneDateInmiliSecond });


    }







    onSubmit() {
        this.props.loaderStart()
        // console.log(this.state.image_uri, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if (this.path !== 0 && this.state.currentUserName !== "" && this.state.selectedPr !== "") {
            // alert('Plx Sign')
            console.log("dabuuuuuuu")
            this.canvas2.save('RNSketchCanvas', this.fileNameToSave, true, "jpeg", false, false, false)
        } else {
            this.props.errorForPostJob()
            console.log("dabuuuuuuu55555555")
            // this.props.loaderStart()

            // alert('Plx Sign')
        }

    }
    componentWillUnmount() {
        this.props.errorRemove()
    }

    onValueChange(value) {
        this.setState({ type: value });
    }
    onValueChangeForSerStatus(value) {
        this.setState({ serStatus: value });
    }
    onValueChangeForStatus(value) {
        this.setState({ status: value });
    }






    uploadImage(uri, mime = 'image/jpeg') {
        let that = this;
        return new Promise((resolve, reject) => {
            let thatIs = that;
            // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            const uploadUri = uri;
            let uploadBlob = null
            console.log(thatIs.fileNameToSave, 'fdasfasdfasdfasdf');
            const imageRef = firebase.storage().ref('images').child('image_' + thatIs.fileNameToSave + ".jpeg")


            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    fileNameToSave;








    componentWillMount() {
        let objReport = this.props.navigation.getParam('vewObjReport');
        objReport = JSON.parse(objReport);
        let jobkeys = this.props.allJobkeys[objReport.index]



        let prClone;
        if (this.props.navigation.getParam('prClone') !== undefined && this.props.navigation.getParam('prClone') !== null) {

            prClone = this.props.navigation.getParam('prClone');
            prClone = JSON.parse(prClone);
        }

        // console.log(prClone, "prCloneeeeeeeeeeeee")


        // let allPr = this.props.allpr
        // let allprArr = []
        // for (var key in allPr) {
        //     // allPr[key].jobId = key
        //     allprArr.push(allPr[key])
        // }
        // console.log(allprArr, "allprArr")

        this.setState({
            currentUserName: objReport.currentUserName,
            Title: objReport.Title,
            type: objReport.type,
            index: objReport.index,
            jobkeys: jobkeys,
            prClone: prClone

        })
        // console.log(this.props.allJobListArr, "allJobListArr")

    }




    onValueChangeHandle(value) {
        this.setState({ selectedPr: value });
        console.log(value, 'valueeeeeeeeeeeeeeeeeeee')
    }


    flagChange() {
        this.setState({ checkedFlag: !this.state.checkedFlag });
    }




    render() {
        console.log(this.state.selectedPr, "slectedprrrrrrrr")
        // let currentUserName = this.props.navigation.getParam('currentUserName');
        // let objReport = this.props.navigation.getParam('vewObjReport');
        // objReport = JSON.parse(objReport);

        // this.setState({
        //     currentUserName:objReport.currentUserName
        // })
        // console.log(this.state.currentUserName, "babluuuuuuu")




        // console.log(Title, "******addaadadadadadad*")
        return (
            <View style={{ flex: 1 }}>
                <Header androidStatusBarColor="#AE000B"
                    style={{ backgroundColor: '#E61825', marginBottom: "2%" }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()}>
                            {/* <Icon name='arrow-back' /> */}

                            <Image style={{ width: 50, height: 25 }}
                                source={require('../assets/images/backarrow.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ marginLeft: "2%", fontWeight: "bold" }}>{strInReqLan.CreateReport}</Title>
                    </Body>

                </Header>
                <ScrollView contentContainerStyle={styles.contentContainer} style={{ backgroundColor: "white" }}>






                    <Form >
                        <View style={{ width: "90%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                            <View style={{ alignItems: 'center', }}>
                                {
                                    <View style={{marginTop:10}}>
                                        {/* <Item > */}
                                        <View style={{ justifyContent: "center", }}>
                                            {
                                                (this.state.type === "Administrative services" || this.state.type === "Serviços administrativos")
                                                    ?
                                                    (<Text style={{ fontSize: 28, fontWeight: "bold", color: "#4A4D52", textAlign: "center" }}>
                                                        {strInReqLan.serTitle}
                                                    </Text>)
                                                    :
                                                    (<Text style={{ fontSize: 28, fontWeight: "bold", color: "#4A4D52", textAlign: "center" }}>
                                                        {strInReqLan.jobTitle}
                                                    </Text>)
                                            }

                                            <Item style={{ justifyContent: "center" }}>
                                                <Text style={{ fontSize: 13, marginTop: -5, color: "#5E6267", textAlign: "center", marginBottom: 25 }}>
                                                    {this.state.Title}
                                                </Text>
                                            </Item>
                                        </View>






                                        <View  >
                                            {
                                                (this.state.type === "Administrative services" || this.state.type === "Serviços administrativos") ?
                                                    (
                                                        <PrSelectionJobs prClone={this.state.prClone} that={this} onChangeFunc={this.onValueChangeHandle} />
                                                    ) :
                                                    (
                                                        <PrSelectionJobs prClone={this.state.prClone} that={this} onChangeFunc={this.onValueChangeHandle} />

                                                    )
                                            }
                                        </View>























                                       
                                            <Text style={{ fontSize: 14, marginTop: 8, color: "grey", fontWeight: "bold",marginLeft:12 ,marginBottom:-5 }}>
                                                {strInReqLan.NameOfTheJobContract}
                                            </Text>
                                        

                                        <Item style={styl.input}>
                                            <Input
                                                placeholder="User Name"
                                                placeholderStyle={{ fontSize: 10, color: "red" }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'email-address'}
                                                style={{ fontSize: 15, marginLeft:6  }}
                                                onChangeText={(e) => { this.setState({ currentUserName: e }) }}
                                                // defaultValue={objReport.currentUserName}
                                                value={this.state.currentUserName}
                                            />
                                            <Image style={{ width: 28, height: 17, marginRight: 15 }}
                                                source={require('../assets/images/master_icon.png')}
                                                resizeMode="contain"
                                            />
                                        </Item>


                                        <View style={styles.containerForCanvas}>
                                            <RNSketchCanvas
                                                ref={ref => this.canvas2 = ref}

                                                containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                                canvasStyle={{ backgroundColor: '#F6F6F6', flex: 1 }}
                                                onPathsChange={val => {
                                                    console.log(val, "aaa")
                                                    this.path = val
                                                }}
                                                onSketchSaved={(success, filePath) => {
                                                    console.log('onSketchSaved', 'filePath: ' + filePath, success);
                                                    this.uploadImage(filePath)
                                                        .then(url => {
                                                            console.log('uploaded', url);
                                                            this.setState({ image_uri: url });


                                                            if (this.state.currentUserName === "") {
                                                                this.props.errorForPostJob()
                                                            }
                                                            else {
                                                                console.log(this.state.image_uri, "imageeeeeeeeeeeeeeeeeeeeeeee")
                                                                let report = {
                                                                    emailFlag: this.state.checkedFlag,
                                                                    type: this.state.type,
                                                                    title: this.state.Title,
                                                                    name: this.state.currentUserName,
                                                                    jobkeys: this.state.jobkeys,
                                                                    reportDate: Date.now(),
                                                                    HedingForPR: this.state.selectedPr,

                                                                    // jobTitle: this.state.jobTitle,
                                                                    // status: this.state.status,
                                                                    // email: this.state.email,
                                                                    // responsibleName: this.state.responsibleName,
                                                                    // responsibleNumber: this.state.responsibleNumber,
                                                                    // contractNoOfJob: this.state.contractNoOfJob,
                                                                    // address: this.state.address,
                                                                    // begginingDate: this.state.begginingDate,
                                                                    // expTermDate: this.state.expTermDate,
                                                                    // type: this.state.type,
                                                                    image: url,

                                                                }
                                                                console.log(report, 'iserrerererere')
                                                                this.props.createReportData(report, strInReqLan.createNewJobs, this.props.navigation, this.props.allJobListArr, this.props.allReportsArr)
                                                            }

                                                            // else if (this.state.type === strInReqLan.createNewAdmServices) {
                                                            //     let user = {
                                                            //         serTitle: this.state.serTitle,
                                                            //         serStatus: this.state.serStatus,
                                                            //         serEmail: this.state.serEmail,
                                                            //         serResName: this.state.serResName,
                                                            //         serResNum: this.state.serResNum,
                                                            //         type: this.state.type,
                                                            //         image: url,



                                                            //     }
                                                            //     this.props.createJobData(user, strInReqLan.createNewAdmServices, this.props.navigation)
                                                            // }

                                                        })
                                                        .catch(error => console.log(error))

                                                }

                                                }



                                                closeComponent={<Text style={{  textDecorationLine: "underline",marginLeft:12}}>{strInReqLan.signature}</Text>}
                                                clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>{strInReqLan.clear}</Text></View>}
                                                savePreference={() => {
                                                    this.fileNameToSave = String(Math.ceil(Math.random() * 100000000));
                                                    return {
                                                        folder: 'RNSketchCanvas',
                                                        filename: this.fileNameToSave,
                                                        transparent: false,
                                                        imageType: 'jpeg'
                                                    }
                                                }
                                                }
                                            />
                                        </View>

                                        <TouchableOpacity>

                                            <Item style={styl.input}

                                            >


                                                <CheckBox
                                                    style={{
                                                        marginTop: 15, marginBottom: 15
                                                    }}
                                                    onPress={this.flagChange.bind(this)}
                                                    checked={this.state.checkedFlag}
                                                    color={"#EC4651"}

                                                />
                                                <Body style={{
                                                    marginTop: 15, marginBottom: 15
                                                }}
                                                    onPress={this.flagChange.bind(this)}
                                                >
                                                    <Text onPress={this.flagChange.bind(this)}
                                                    >
                                                        {strInReqLan.sendmeacopyofmyreport}
                                                    </Text>
                                                </Body>

                                            </Item>

                                        </TouchableOpacity>

                                    </View>


                                }







                            </View>






                            {
                                (this.props.isLoader === true) ?
                                    (
                                        <Loading />
                                    ) :
                                    (
                                        <Button block style={{marginTop:20,marginBottom:20, backgroundColor: '#EC4651'}} onPress={this.onSubmit.bind(this)}   >
                                            <Text style={styles.btnTextMargin}>{strInReqLan.saveReport}</Text>
                                        </Button>
                                     
                                    )
                            }
                            {
                                (this.props.isError === true) ? (
                                    <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                                ) : null
                            }
                        </View>

                    </Form>


                </ScrollView>
            </View>


        );
    }
}


function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        allJobkeys: state.root.allJobkeys,
        allJobListArr: state.root.allJobListArr,
        allReportsArr: state.root.allReportsArr,
        allpr: state.root.objAllPreRegistration
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        createJobData: (userDetails, type, navigation) => {
            dispatch(createJobData(userDetails, type, navigation));
        },
        createReportData: (report, strInReqLancreateNewJobs, navigation, allJobListArr, allReportsArr) => {
            dispatch(createReportData(report, strInReqLancreateNewJobs, navigation, allJobListArr, allReportsArr));
        },
        errorForPostJob: () => {
            dispatch(errorForPostJob());
        },
        errorRemove: () => {
            dispatch(errorRemove());
        },
        loaderStart: () => {
            dispatch(loaderStart());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Report);


const styles = StyleSheet.create({

    contentContainer: {
        paddingBottom:35,
        backgroundColor: "white",
        alignItems: "center"

    },
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
    input: { justifyContent: 'center', alignItems: 'center', width: '100%' },
    // input1: {height: "9.5%", width: "100%", borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: {width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    // icons: {color: '#2196f3', marginRight: 10 },
    // form: {backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { backgroundColor: '#EC4651', marginTop: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})