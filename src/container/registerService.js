import React, { Component } from 'react';
import {
    Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body,
    Title, FooterTab, Footer, Icon
} from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';
import PreRegisterJobSelectionDropDown from '../component/preregJobDropdown';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
// import DropDown from '../component/dropDown';
import DropDownArrSer from '../component/dropDownArrForSer';
import DisibleDd from '../component/dissibleOptions';
import DisibleInput from '../component/disableInput';
import SwitchButton from '../component/mySwitchButton';

import CheckBox from '../component/checkBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// import LogoImage from '../component/logoImage';
import { createJobData, errorForPostJob, saveUserPRDropDown, loaderStart } from '../store/action/action';
// import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Textarea from 'react-native-textarea';
import DatePicker from 'react-native-datepicker'
import MultiImage from 'react-native-multi-image-selector';

import RNFetchBlob from 'rn-fetch-blob'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;
import SelectMultiple from 'react-native-select-multiple'
import checkBox from '../component/checkBox';











class CreateJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoader: false,
            imgUrl: [],
            //////////////////////////additional data state for service//////////////////////////

            discribeWhenMarkedAbove: "",
            reportTheCID: "",
            reportTheDates: "",
            reportTheDatesCompensate: "",
            kmReport: "",
            overtimeReason: "",
            generalObservations: "",
            amountOfwhichSafetyEquipment: "",
            amountOfwhichToolIsNeeded: "",
            amountOfwhichEquipmentIsNeeded: "",





            // amountOfTeam: "",
            // amountOfMaterial: "",
            // serviceYouHaveDone: "",
            // customersOsNumber: "",
            // codeOrOmFromTheCustomer: "",
            // requestedService: "",
            // generalObservations: "",


            dateAndTimeStart: "",
            dateAndTimeEnd: "",
            selectedJob: {},
            jobListArr: this.props.jobListArr,
            selectedOption: {
                [strInReqLan.reportThat]: '',
                [strInReqLan.discipline]: '',
                [strInReqLan.requestThat]: '',
                [strInReqLan.requester]: '',
                [strInReqLan.occurrence]: '',
                [strInReqLan.area_tag_local]: '',
                [strInReqLan.specialEquipmentApplied]: '',
                [strInReqLan.interventionType]: '',
                [strInReqLan.climate]: '',
                [strInReqLan.thereWasADelay]: '',
                [strInReqLan.applicationScheme]: '',
                [strInReqLan.delayedTime]: '',
                [strInReqLan.scope]: '',
                [strInReqLan.materialApplie]: '',
                [strInReqLan.materialAvailable]: '',
                [strInReqLan.timeSpent]: '',
                [strInReqLan.numberOfProfessionalsInvolved]: '',
                [strInReqLan.reasonForDelay]: '',
                [strInReqLan.inspectionResponsibleName]: '',
                [strInReqLan.inspectionResults]: '',
                [strInReqLan.reInspectionResults]: '',
                [strInReqLan.material]: '',
                [strInReqLan.additionalInformation]: '',
                [strInReqLan.team]: [],
                // *****************Administrative/////////////////

                [strInReqLan.overtimeSolicitorsName]: '',
                [strInReqLan.overtimeSolicitorsName]: '',
                [strInReqLan.applicationScheme]: '',
                [strInReqLan.whoIsYourLeader]: '',
                [strInReqLan.area_tag_local]: '',
                [strInReqLan.externalService]: '',
                [strInReqLan.vehicle]: '',
                [strInReqLan.returnToArea]: '',
                [strInReqLan.whichCard_documentLost]: '',
                [strInReqLan.urgencyReport]: '',
                [strInReqLan.additionalInformation]: '',
                [strInReqLan.nameOfWhoAuthorized]: '',
                [strInReqLan.item1RequestReason]: '',
                [strInReqLan.whereDoYouLive]: '',
                [strInReqLan.didYouPreviouslyWarned]: '',
                [strInReqLan.reasonOfTheAbsence]: '',
                [strInReqLan.howManyDaysOfAbscence]: '',
                [strInReqLan.askFor]: '',
                [strInReqLan.reportThat]: '',
                [strInReqLan.requestThat]: '',
                [strInReqLan.warningThat]: '',
                [strInReqLan.requiresThat]: '',
                [strInReqLan.discribeWhenMarkedAbove]: '',
                [strInReqLan.defectThatNeed]: '',
                [strInReqLan.whichSafetyEquipment]: '',
                [strInReqLan.amountOfSafetyEquipment]: '',
                [strInReqLan.whichToolIsNeeded]: '',
                [strInReqLan.whichEquipmentIsNeeded]: '',
                [strInReqLan.howMuchIsNeeded]: '',
            },
            dropDownOptions: {
            },
            /////////////////////////////// states for switches///////////////////////////////
            overtimeSolicitorsName: 1,
            applicationScheme: 1,
            whoIsYourLeader: 1,
            area_tag_local: 1,
            externalService: 1,
            vehicle: 1,
            returnToArea: 1,
            whichCard_documentLost: 1,
            urgencyReport: 1,
            additionalInformation: 1,
            nameOfWhoAuthorized: 1,
            item1RequestReason: 1,
            whereDoYouLive: 1,
            didYouPreviouslyWarned: 1,
            reasonOfTheAbsence: 1,
            howManyDaysOfAbscence: 1,
            askFor: 1,
            reportThat: 1,
            requestThat: 1,
            warningThat: 1,
            requiresThat: 1,
            imageDisable: 1,
            defectThatNeedDis: 1,
            whichSafetyEquipmentDis: 1,
            whichToolIsNeededDis: 1,
            whichEquipmentIsNeededDis: 1,
            howMuchIsNeededDis: 1,
            /////////////////////////////////////////aditional info//////////////
            discribeWhenMarkedAboveDis: 1,
            reportTheCIDDis: 1,
            reportTheDatesDis: 1,
            reportTheDatesCompensateDis: 1,
            kmReportDis: 1,
            overtimeReasonDis: 1,
            generalObservationsDis: 1,
            amountOfwhichSafetyEquipmentDis: 1,
            amountOfwhichToolIsNeededDis: 1,
            amountOfwhichEquipmentIsNeededDis: 1,
            generalObservationsDis: 1,
            dateAndTimeStartDis: 1,
            dateAndTimeEndDis: 1,


        }

        this.uploadImage = this.uploadImage.bind(this);

    }


    uploadImage(images) {
        // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        if (images === undefined) {
            console.log("notupload")

        }
        else {
            return new Promise((resolve, reject) => {
                images.forEach((image, i) => {
                    // const sessionId = new Date().getTime();
                    const Blob = RNFetchBlob.polyfill.Blob;
                    const fs = RNFetchBlob.fs;
                    window.XMLHttpRequest =
                        RNFetchBlob.polyfill.XMLHttpRequest;
                    window.Blob = Blob;
                    let uploadBlob = null;
                    let mime = 'image/jpg';
                    const imageRef = firebase.storage().ref(`photos/`).child(image)
                    fs.readFile(image, 'base64')
                        .then((data) => {
                            return Blob.build(data, { type: `${mime};BASE64` })
                        })
                        .then((blob) => {
                            uploadBlob = blob;
                            return imageRef.put(blob, { contentType: mime })
                        })
                        .then(() => {
                            uploadBlob.close();
                            return imageRef.getDownloadURL()
                        })
                        .then(downloadUrl => {
                            console.log(downloadUrl, "URLlllllllllllllllllllll")

                            let allImg = this.state.imgUrl
                            allImg.push(downloadUrl)
                            console.log(allImg, "Alllllllllllllllllllll")
                            if (allImg.length === images.length) {
                                resolve(allImg)
                            }
                        })
                        .catch((error) => {
                            reject('Not uploaded')
                        });
                })
            })
        }
    }



    onValueChangeHandleForDropDownArr(dropDownHeading, value) {

        // console.log(value, 'valueeeeee', this.state.dropDownOptions, dropDownHeading);
        // console.log(value, 'valueeeeee');
        // console.log(dropDownHeading, "dd Heading", "5555");
        // console.log(this.state.dropDownOptions, "dd option");
        let dropDownOptionsClone = this.state.dropDownOptions;
        let selectedIndex;
        for (var i = 0; i < dropDownOptionsClone[dropDownHeading].length; i++) {

            var dropDownObject = dropDownOptionsClone[dropDownHeading][i];
            console.log(dropDownObject, 'dropDownObject')
            dropDownObject.selected = false;
            if (dropDownObject.optionName === value) {
                selectedIndex = i;
            }

            // for (var key in dropDownObject) {
            //     console.log(key, dropDownObject[key], '/////')
            //     dropDownObject[key].selected = false;
            // }

        }
        if (value !== '') {
            dropDownOptionsClone[dropDownHeading][selectedIndex].selected = true;
        }
        // console.log(dropDownOptionsClone, 'dropDownOptionsClonedropDownOptionsClone')
        let selectedOptionClone = this.state.selectedOption;
        selectedOptionClone[dropDownHeading] = value;
        this.setState({
            selectedOption: selectedOptionClone,
            dropDownOptions: dropDownOptionsClone
        });
    }
    onValueChangeHandleForCheckBox(dropDownHeading, value) {
        // console.log('build check')

        let dropDownOptionsClone = this.state.dropDownOptions;
        let selectedOptionClone = this.state.selectedOption;
        selectedOptionClone[dropDownHeading] = value;
        // console.log(value, '********************************', dropDownHeading, this.state.dropDownOptions, selectedOptionClone);

        let multiCheckOptionsArr = dropDownOptionsClone[dropDownHeading];
        for (var i = 0; i < multiCheckOptionsArr.length; i++) {
            // console.log(multiCheckOptionsArr[i], '55555555555555555555555555555');

            if (multiCheckOptionsArr[i].optionName !== '') {
                multiCheckOptionsArr[i].selected = false;
            }


        }

        value.map((checkValue) => {
            let selectedMultipleOptionsArr = dropDownOptionsClone[dropDownHeading];
            for (var i = 0; i < selectedMultipleOptionsArr.length; i++) {
                // console.log(checkValue, '*sssssssssssssssssssssssssssssss', selectedMultipleOptionsArr[i], dropDownOptionsClone[dropDownHeading]);

                if (checkValue.label == selectedMultipleOptionsArr[i].optionName) {
                    selectedMultipleOptionsArr[i].selected = true;
                }
            }
        })

        // console.log(selectedOptionClone[dropDownHeading], dropDownOptionsClone[dropDownHeading], '********************888888888888')
        this.setState({
            selectedOption: selectedOptionClone,
            dropDownOptions: dropDownOptionsClone
        });

    }




    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "777777777");
        let dropDownOptionsClone = this.state.dropDownOptions;
        for (var key in nextProps.dropDownOptions) {
            console.log(key, 'inside components');
            dropDownOptionsClone[key] = nextProps.dropDownOptions[key];
        }

        console.log(dropDownOptionsClone, 'dropDownOptionsClone', nextProps.dropDownOptions)

        this.setState({
            // jobListArr: this.props.jobListArr,
            dropDownOptions: dropDownOptionsClone
        })

    }
    savePRform() {
        this.props.loaderStart();


        // console.log("savePRform", this.props.isLoader)

        if (this.state.imageArray !== undefined) {
            this.uploadImage(this.state.imageArray)
                .then(() => {

                    let prAdditionalData = {

                        discribeWhenMarkedAbove: this.state.discribeWhenMarkedAbove,
                        reportTheCID: this.state.reportTheCID,
                        reportTheDates: this.state.reportTheDates,
                        reportTheDatesCompensate: this.state.reportTheDatesCompensate,
                        kmReport: this.state.kmReport,
                        overtimeReason: this.state.overtimeReason,
                        generalObservations: this.state.generalObservations,
                        amountOfwhichSafetyEquipment: this.state.amountOfwhichSafetyEquipment,
                        amountOfwhichToolIsNeeded: this.state.amountOfwhichToolIsNeeded,
                        amountOfwhichEquipmentIsNeeded: this.state.amountOfwhichEquipmentIsNeeded,
                        dateAndTimeStart: this.state.dateAndTimeStart,
                        dateAndTimeEnd: this.state.dateAndTimeEnd,
                        photosUri: this.state.imgUrl

                    }


                    let prAdditionalDataArr = []
                    prAdditionalDataArr.push(prAdditionalData)
                    let dropDownOptionsClone = this.state.dropDownOptions;
                    dropDownOptionsClone.prAdditionalDataArr = prAdditionalDataArr





                    // console.log(prAdditionalDataArr, "arrrrrrrrrrrrrrr")
                    // console.log(dropDownOptionsClone, "ddddddddddddddddddddd")
                    // console.log(this.state.dropDownOptions, "prAdditionalData")
                    this.props.saveUserPRDropDown(this.state.dropDownOptions, this.props.selectedJob.jobId, prAdditionalData, this.state.imageArray, this.props.navigation)

                    this.setState({
                        imageArray: [],
                        imgUrl: [],
                        //////////////////////////additional data state for service//////////////////////////
                        discribeWhenMarkedAbove: "",
                        reportTheCID: "",
                        reportTheDates: "",
                        reportTheDatesCompensate: "",
                        kmReport: "",
                        overtimeReason: "",
                        generalObservations: "",
                        amountOfwhichSafetyEquipment: "",
                        amountOfwhichToolIsNeeded: "",
                        amountOfwhichEquipmentIsNeeded: "",
                        // amountOfTeam: "",
                        // amountOfMaterial: "",
                        // serviceYouHaveDone: "",
                        // customersOsNumber: "",
                        // codeOrOmFromTheCustomer: "",
                        // requestedService: "",
                        // generalObservations: "",
                        dateAndTimeStart: "",
                        dateAndTimeEnd: "",
                        selectedJob: {},
                        jobListArr: this.props.jobListArr,
                        selectedOption: {
                            [strInReqLan.reportThat]: '',
                            [strInReqLan.discipline]: '',
                            [strInReqLan.requestThat]: '',
                            [strInReqLan.requester]: '',
                            [strInReqLan.occurrence]: '',
                            [strInReqLan.area_tag_local]: '',
                            [strInReqLan.specialEquipmentApplied]: '',
                            [strInReqLan.interventionType]: '',
                            [strInReqLan.climate]: '',
                            [strInReqLan.thereWasADelay]: '',
                            [strInReqLan.applicationScheme]: '',
                            [strInReqLan.delayedTime]: '',
                            [strInReqLan.scope]: '',
                            [strInReqLan.materialApplie]: '',
                            [strInReqLan.materialAvailable]: '',
                            [strInReqLan.timeSpent]: '',
                            [strInReqLan.numberOfProfessionalsInvolved]: '',
                            [strInReqLan.reasonForDelay]: '',
                            [strInReqLan.inspectionResponsibleName]: '',
                            [strInReqLan.inspectionResults]: '',
                            [strInReqLan.reInspectionResults]: '',
                            [strInReqLan.material]: '',
                            [strInReqLan.additionalInformation]: '',
                            [strInReqLan.team]: [],
                            // *****************Administrative/////////////////

                            [strInReqLan.overtimeSolicitorsName]: '',
                            [strInReqLan.overtimeSolicitorsName]: '',
                            [strInReqLan.applicationScheme]: '',
                            [strInReqLan.whoIsYourLeader]: '',
                            [strInReqLan.area_tag_local]: '',
                            [strInReqLan.externalService]: '',
                            [strInReqLan.vehicle]: '',
                            [strInReqLan.returnToArea]: '',
                            [strInReqLan.whichCard_documentLost]: '',
                            [strInReqLan.urgencyReport]: '',
                            [strInReqLan.additionalInformation]: '',
                            [strInReqLan.nameOfWhoAuthorized]: '',
                            [strInReqLan.item1RequestReason]: '',
                            [strInReqLan.whereDoYouLive]: '',
                            [strInReqLan.didYouPreviouslyWarned]: '',
                            [strInReqLan.reasonOfTheAbsence]: '',
                            [strInReqLan.howManyDaysOfAbscence]: '',
                            [strInReqLan.askFor]: '',
                            [strInReqLan.reportThat]: '',
                            [strInReqLan.requestThat]: '',
                            [strInReqLan.warningThat]: '',
                            [strInReqLan.requiresThat]: '',
                            [strInReqLan.discribeWhenMarkedAbove]: '',
                            [strInReqLan.defectThatNeed]: '',
                            [strInReqLan.whichSafetyEquipment]: '',
                            [strInReqLan.amountOfSafetyEquipment]: '',
                            [strInReqLan.whichToolIsNeeded]: '',
                            [strInReqLan.whichEquipmentIsNeeded]: '',
                            [strInReqLan.howMuchIsNeeded]: '',
                        },
                        dropDownOptions: {
                        }
                    })




                })
        }
        else {
            let prAdditionalData = {

                discribeWhenMarkedAbove: this.state.discribeWhenMarkedAbove,
                reportTheCID: this.state.reportTheCID,
                reportTheDates: this.state.reportTheDates,
                reportTheDatesCompensate: this.state.reportTheDatesCompensate,
                kmReport: this.state.kmReport,
                overtimeReason: this.state.overtimeReason,
                generalObservations: this.state.generalObservations,
                amountOfwhichSafetyEquipment: this.state.amountOfwhichSafetyEquipment,
                amountOfwhichToolIsNeeded: this.state.amountOfwhichToolIsNeeded,
                amountOfwhichEquipmentIsNeeded: this.state.amountOfwhichEquipmentIsNeeded,
                dateAndTimeStart: this.state.dateAndTimeStart,
                dateAndTimeEnd: this.state.dateAndTimeEnd,
                // photosUri: this.state.imgUrl

            }


            let prAdditionalDataArr = []
            prAdditionalDataArr.push(prAdditionalData)
            let dropDownOptionsClone = this.state.dropDownOptions;
            dropDownOptionsClone.prAdditionalDataArr = prAdditionalDataArr





            // console.log(prAdditionalDataArr, "arrrrrrrrrrrrrrr")
            // console.log(dropDownOptionsClone, "ddddddddddddddddddddd")
            // console.log(this.state.dropDownOptions, "prAdditionalData")
            this.props.saveUserPRDropDown(this.state.dropDownOptions, this.props.selectedJob.jobId, prAdditionalData, this.state.imageArray, this.props.navigation)

            this.setState({
                imageArray: [],
                imgUrl: [],
                //////////////////////////additional data state for service//////////////////////////
                discribeWhenMarkedAbove: "",
                reportTheCID: "",
                reportTheDates: "",
                reportTheDatesCompensate: "",
                kmReport: "",
                overtimeReason: "",
                generalObservations: "",
                amountOfwhichSafetyEquipment: "",
                amountOfwhichToolIsNeeded: "",
                amountOfwhichEquipmentIsNeeded: "",
                // amountOfTeam: "",
                // amountOfMaterial: "",
                // serviceYouHaveDone: "",
                // customersOsNumber: "",
                // codeOrOmFromTheCustomer: "",
                // requestedService: "",
                // generalObservations: "",
                dateAndTimeStart: "",
                dateAndTimeEnd: "",
                selectedJob: {},
                jobListArr: this.props.jobListArr,
                selectedOption: {
                    [strInReqLan.reportThat]: '',
                    [strInReqLan.discipline]: '',
                    [strInReqLan.requestThat]: '',
                    [strInReqLan.requester]: '',
                    [strInReqLan.occurrence]: '',
                    [strInReqLan.area_tag_local]: '',
                    [strInReqLan.specialEquipmentApplied]: '',
                    [strInReqLan.interventionType]: '',
                    [strInReqLan.climate]: '',
                    [strInReqLan.thereWasADelay]: '',
                    [strInReqLan.applicationScheme]: '',
                    [strInReqLan.delayedTime]: '',
                    [strInReqLan.scope]: '',
                    [strInReqLan.materialApplie]: '',
                    [strInReqLan.materialAvailable]: '',
                    [strInReqLan.timeSpent]: '',
                    [strInReqLan.numberOfProfessionalsInvolved]: '',
                    [strInReqLan.reasonForDelay]: '',
                    [strInReqLan.inspectionResponsibleName]: '',
                    [strInReqLan.inspectionResults]: '',
                    [strInReqLan.reInspectionResults]: '',
                    [strInReqLan.material]: '',
                    [strInReqLan.additionalInformation]: '',
                    [strInReqLan.team]: [],
                    // *****************Administrative/////////////////

                    [strInReqLan.overtimeSolicitorsName]: '',
                    [strInReqLan.overtimeSolicitorsName]: '',
                    [strInReqLan.applicationScheme]: '',
                    [strInReqLan.whoIsYourLeader]: '',
                    [strInReqLan.area_tag_local]: '',
                    [strInReqLan.externalService]: '',
                    [strInReqLan.vehicle]: '',
                    [strInReqLan.returnToArea]: '',
                    [strInReqLan.whichCard_documentLost]: '',
                    [strInReqLan.urgencyReport]: '',
                    [strInReqLan.additionalInformation]: '',
                    [strInReqLan.nameOfWhoAuthorized]: '',
                    [strInReqLan.item1RequestReason]: '',
                    [strInReqLan.whereDoYouLive]: '',
                    [strInReqLan.didYouPreviouslyWarned]: '',
                    [strInReqLan.reasonOfTheAbsence]: '',
                    [strInReqLan.howManyDaysOfAbscence]: '',
                    [strInReqLan.askFor]: '',
                    [strInReqLan.reportThat]: '',
                    [strInReqLan.requestThat]: '',
                    [strInReqLan.warningThat]: '',
                    [strInReqLan.requiresThat]: '',
                    [strInReqLan.discribeWhenMarkedAbove]: '',
                    [strInReqLan.defectThatNeed]: '',
                    [strInReqLan.whichSafetyEquipment]: '',
                    [strInReqLan.amountOfSafetyEquipment]: '',
                    [strInReqLan.whichToolIsNeeded]: '',
                    [strInReqLan.whichEquipmentIsNeeded]: '',
                    [strInReqLan.howMuchIsNeeded]: '',
                },
                dropDownOptions: {
                }
            })






        }













    }


    render() {
        console.log(this.state.am)
        // console.log("isLoaderrrr", this.props.isLoader)
        // console.log("selectedTeam", this.state.selectedTeam)
        // console.log("heading", this.state.selectedOption)
        // console.log(this.props.dropDownOptions, "valueeeOptionaction")
        console.log(this.state.dropDownOptions, 'this.state.dropDownOptions this.state.dropDownOptions this.state.dropDownOptions ')
        // console.log(this.props.selectedJob, "nssssssssssssssssss")

        return (

            <View style={styles.container}>
                <View style={{ flex: 1, }}>
                    <Header androidStatusBarColor="#AE000B"
                        style={{ backgroundColor: '#E61825', marginBottom: "2%" }}>
                        <Left>
                            <TouchableOpacity transparent onPress={() => this.props.navigation.push("preRegistration")}>
                                {/* <Icon name='arrow-back' /> */}

                                {/* <Image style={{ width: 50, height: 25 }}
                                    source={require('../assets/images/backarrow.png')}
                                    resizeMode="contain"
                                /> */}
                                <MaterialIcons name='arrow-back' style={{ marginRight: 20, fontSize: 35, color: "white" }} />

                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ marginLeft: "0%", fontWeight: "bold" }}>{strInReqLan.postPreRegistration}</Title>
                        </Body>

                    </Header>
                </View>

                <View style={{ backgroundColor: "white", flex: 8, alignItems: "center" }}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "0.5%", padding: 20 }}>
                            <Text style={{ marginBottom: "1%", fontSize: 13, fontWeight: "bold", textAlign: "center", justifyContent: "center" }}>{strInReqLan.serTitle.toUpperCase()}</Text>
                            <Text style={{ color: "gray", marginTop: "1%", textAlign: "center", justifyContent: "center" }} >{this.props.selectedJob.serTitle}</Text>
                        </View>
                        <View style={{ height: 28, width: 65, marginTop: 10, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ overtimeSolicitorsName: val })}      // this is necessary for this component
                                text1='E'                        // optional: first text in switch button --- default ON
                                text2='D'                       // optional: second text in switch button --- default OFF
                                switchWidth={65}                 // optional: switch width --- default 44
                                switchHeight={28}                 // optional: switch height --- default 100
                                // switchdirection='rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                                switchBorderRadius={0}          // optional: switch border radius --- default oval
                                switchSpeedChange={500}           // optional: button change speed --- default 100
                            // switchBorderColor='#A8ADAB'       // optional: switch border color --- default #d4d4d4
                            // switchBackgroundColor='red'      // optional: switch background color --- default #fff
                            // btnBorderColor='gray'          // optional: button border color --- default #00a4b9
                            // btnBackgroundColor='#A8ADAB'      // optional: button background color --- default #00bcd4
                            // fontColor='#b1b1b1'               // optional: text font color --- default #b1b1b1
                            // activeFontColor='#fff'            // optional: active font color --- default #fff
                            />

                        </View>

                        {
                            ([strInReqLan.overtimeSolicitorsName] in this.state.dropDownOptions && this.state.overtimeSolicitorsName === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.overtimeSolicitorsName]}
                                    selectedOption={this.state.selectedOption[strInReqLan.overtimeSolicitorsName]}
                                    heading={strInReqLan.overtimeSolicitorsName}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.overtimeSolicitorsName}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%", backgroundColor: "green" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ applicationScheme: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.applicationScheme] in this.state.dropDownOptions && this.state.applicationScheme === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.applicationScheme]}
                                    selectedOption={this.state.selectedOption[strInReqLan.applicationScheme]}
                                    heading={strInReqLan.applicationScheme}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.applicationScheme}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whoIsYourLeader: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.whoIsYourLeader] in this.state.dropDownOptions && this.state.whoIsYourLeader === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.whoIsYourLeader]}
                                    selectedOption={this.state.selectedOption[strInReqLan.whoIsYourLeader]}
                                    heading={strInReqLan.whoIsYourLeader}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.whoIsYourLeader}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ area_tag_local: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.area_tag_local] in this.state.dropDownOptions && this.state.area_tag_local === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.area_tag_local]}
                                    selectedOption={this.state.selectedOption[strInReqLan.area_tag_local]}
                                    heading={strInReqLan.area_tag_local}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.area_tag_local}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ externalService: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.externalService] in this.state.dropDownOptions && this.state.externalService === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.externalService]}
                                    selectedOption={this.state.selectedOption[strInReqLan.externalService]}
                                    heading={strInReqLan.externalService}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.externalService}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ vehicle: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.vehicle] in this.state.dropDownOptions && this.state.vehicle === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.vehicle]}
                                    selectedOption={this.state.selectedOption[strInReqLan.vehicle]}
                                    heading={strInReqLan.vehicle}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.vehicle}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ returnToArea: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.returnToArea] in this.state.dropDownOptions && this.state.returnToArea === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.returnToArea]}
                                    selectedOption={this.state.selectedOption[strInReqLan.returnToArea]}
                                    heading={strInReqLan.returnToArea}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.returnToArea}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whichCard_documentLost: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.whichCard_documentLost] in this.state.dropDownOptions && this.state.whichCard_documentLost === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.whichCard_documentLost]}
                                    selectedOption={this.state.selectedOption[strInReqLan.whichCard_documentLost]}
                                    heading={strInReqLan.whichCard_documentLost}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.whichCard_documentLost}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ urgencyReport: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.urgencyReport] in this.state.dropDownOptions && this.state.urgencyReport === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.urgencyReport]}
                                    selectedOption={this.state.selectedOption[strInReqLan.urgencyReport]}
                                    heading={strInReqLan.urgencyReport}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.urgencyReport}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ additionalInformation: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.additionalInformation] in this.state.dropDownOptions && this.state.additionalInformation === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.additionalInformation]}
                                    selectedOption={this.state.selectedOption[strInReqLan.additionalInformation]}
                                    heading={strInReqLan.additionalInformation}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.additionalInformation}
                                    that={this}
                                />
                        }
                        {/* ************************Multiple selsection******************** */}
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ nameOfWhoAuthorized: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.nameOfWhoAuthorized] in this.state.dropDownOptions && this.state.nameOfWhoAuthorized === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.nameOfWhoAuthorized]}
                                    selectedOption={this.state.selectedOption[strInReqLan.nameOfWhoAuthorized]}
                                    heading={strInReqLan.nameOfWhoAuthorized}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.nameOfWhoAuthorized}
                                    that={this}
                                />
                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ item1RequestReason: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.item1RequestReason] in this.state.dropDownOptions && this.state.item1RequestReason === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.item1RequestReason]}
                                    selectedOption={this.state.selectedOption[strInReqLan.item1RequestReason]}
                                    heading={strInReqLan.item1RequestReason}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.item1RequestReason}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whereDoYouLive: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {/* **************WICH SAFETY EQUIPMENT IS NEEDED**************** */}
                        {
                            ([strInReqLan.whereDoYouLive] in this.state.dropDownOptions && this.state.whereDoYouLive === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.whereDoYouLive]}
                                    selectedOption={this.state.selectedOption[strInReqLan.whereDoYouLive]}
                                    heading={strInReqLan.whereDoYouLive}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.whereDoYouLive}
                                    that={this}
                                />

                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ didYouPreviouslyWarned: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.didYouPreviouslyWarned] in this.state.dropDownOptions && this.state.didYouPreviouslyWarned === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.didYouPreviouslyWarned]}
                                    selectedOption={this.state.selectedOption[strInReqLan.didYouPreviouslyWarned]}
                                    heading={strInReqLan.didYouPreviouslyWarned}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.didYouPreviouslyWarned}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ reasonOfTheAbsence: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.reasonOfTheAbsence] in this.state.dropDownOptions && this.state.reasonOfTheAbsence === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.reasonOfTheAbsence]}
                                    selectedOption={this.state.selectedOption[strInReqLan.reasonOfTheAbsence]}
                                    heading={strInReqLan.reasonOfTheAbsence}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.reasonOfTheAbsence}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ howManyDaysOfAbscence: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.howManyDaysOfAbscence] in this.state.dropDownOptions && this.state.howManyDaysOfAbscence === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.howManyDaysOfAbscence]}
                                    selectedOption={this.state.selectedOption[strInReqLan.howManyDaysOfAbscence]}
                                    heading={strInReqLan.howManyDaysOfAbscence}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.howManyDaysOfAbscence}
                                    that={this}
                                />
                        }



                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ askFor: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.askFor] in this.state.dropDownOptions && this.state.askFor === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.askFor]}
                                    selectedOption={this.state.selectedOption[strInReqLan.askFor]}
                                    heading={strInReqLan.askFor}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.askFor}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ reportThat: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.reportThat] in this.state.dropDownOptions && this.state.reportThat === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.reportThat]}
                                    selectedOption={this.state.selectedOption[strInReqLan.reportThat]}
                                    heading={strInReqLan.reportThat}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.reportThat}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ requestThat: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.requestThat] in this.state.dropDownOptions && this.state.requestThat === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.requestThat]}
                                    selectedOption={this.state.selectedOption[strInReqLan.requestThat]}
                                    heading={strInReqLan.requestThat}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.requestThat}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ warningThat: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.warningThat] in this.state.dropDownOptions && this.state.warningThat === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.warningThat]}
                                    selectedOption={this.state.selectedOption[strInReqLan.warningThat]}
                                    heading={strInReqLan.warningThat}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.warningThat}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: -20, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ requiresThat: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.requiresThat] in this.state.dropDownOptions && this.state.requiresThat === 1) ?
                                <DropDownArrSer
                                    dropDownList={this.state.dropDownOptions[strInReqLan.requiresThat]}
                                    selectedOption={this.state.selectedOption[strInReqLan.requiresThat]}
                                    heading={strInReqLan.requiresThat}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.requiresThat}
                                    that={this}
                                />
                        }

                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}
                        {/* **********************Multiple option************************* */}

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ defectThatNeedDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.defectThatNeed] in this.state.dropDownOptions && this.state.defectThatNeedDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 13 }}>{strInReqLan.defectThatNeed}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.defectThatNeed]}
                                        selectedOption={this.state.selectedOption[strInReqLan.defectThatNeed]}
                                        heading={strInReqLan.defectThatNeed}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this} />

                                </View>

                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.defectThatNeed}</Text>
                        }


                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: 15, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whichSafetyEquipmentDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {

                            ([strInReqLan.whichSafetyEquipment] in this.state.dropDownOptions && this.state.whichSafetyEquipmentDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold", marginTop: "6%", fontSize: 11.5 }}>{strInReqLan.whichSafetyEquipment}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.whichSafetyEquipment]}
                                        selectedOption={this.state.selectedOption[strInReqLan.whichSafetyEquipment]}
                                        heading={strInReqLan.whichSafetyEquipment}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this}


                                        input={true}
                                        change={(e) => { this.setState({ amountOfwhichSafetyEquipment: e }) }}
                                    />
                                </View>
                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.whichSafetyEquipment}</Text>
                        }




                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: 15, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whichToolIsNeededDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>


                        {

                            ([strInReqLan.whichToolIsNeeded] in this.state.dropDownOptions && this.state.whichToolIsNeededDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold", marginTop: "6%", fontSize: 13 }}>{strInReqLan.whichToolIsNeeded}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.whichToolIsNeeded]}
                                        selectedOption={this.state.selectedOption[strInReqLan.whichToolIsNeeded]}
                                        heading={strInReqLan.whichToolIsNeeded}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this}

                                        input={true}
                                        change={(e) => { this.setState({ amountOfwhichToolIsNeeded: e }) }}

                                    />
                                </View>
                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.whichToolIsNeeded}</Text>
                        }



                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: 15, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ whichEquipmentIsNeededDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {

                            ([strInReqLan.whichEquipmentIsNeeded] in this.state.dropDownOptions && this.state.whichEquipmentIsNeededDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold", marginTop: "6%", fontSize: 13 }}>{strInReqLan.whichEquipmentIsNeeded}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.whichEquipmentIsNeeded]}
                                        selectedOption={this.state.selectedOption[strInReqLan.whichEquipmentIsNeeded]}
                                        heading={strInReqLan.whichEquipmentIsNeeded}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this}

                                        input={true}
                                        change={(e) => { this.setState({ amountOfwhichEquipmentIsNeeded: e }) }}

                                    />
                                </View>

                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.whichEquipmentIsNeeded}</Text>
                        }


                        <View style={{ height: 28, width: 65, marginBottom: 10, marginTop: 15, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ howMuchIsNeededDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {

                            ([strInReqLan.howMuchIsNeeded] in this.state.dropDownOptions && this.state.howMuchIsNeededDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold", marginTop: "6%", fontSize: 13 }}>{strInReqLan.howMuchIsNeeded}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.howMuchIsNeeded]}
                                        selectedOption={this.state.selectedOption[strInReqLan.howMuchIsNeeded]}
                                        heading={strInReqLan.howMuchIsNeeded}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this} />
                                </View>
                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.howMuchIsNeeded}</Text>
                        }


                        {/* ////////////////////////////////imageselector///////////////////////////// */}




                        <View style={{ marginTop: "5%" }}>
                            <Button bordered danger
                                value={this.state.imageArray}
                                // style={styles.buttonbar} block
                                style={{
                                    width: "90%",
                                    textAlign: "center",
                                    justifyContent: "center",

                                }}
                                onPress={() => {
                                    MultiImage.pickImage({
                                        showCamera: true,
                                        maxNum: 3,
                                        multiple: true
                                    }).then((imageArray) => {
                                        console.log(imageArray, "image arryyyyyyyyyyyyyyyyyyyyy")
                                        this.setState({ imageArray: imageArray })
                                    }).catch(e => {
                                    });
                                }}>
                                <Text
                                >
                                    {strInReqLan.selectImage}</Text>
                            </Button>
                        </View>
                        < View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", alignItems: "center", width: "90%", }} >


                            {this.state.imageArray !== undefined || null ?
                                this.state.imageArray.map((image) => {
                                    return (

                                        <Image style={{ width: 80, height: 65, margin: "1%", marginTop: "5%" }}
                                            source={
                                                {
                                                    uri: image
                                                }
                                            }
                                            resizeMode="contain"
                                        />
                                    )

                                }) : null

                            }
                        </View>


                        <View
                            style={{
                                marginTop: "5%"

                            }}

                        >
                            <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ dateAndTimeStartDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.dateAndTimeStartDis === 1) ? (
                                <Item style={{ backgroundColor: '#ffffff', width: '90%', height: 40 }}>
                                    <DatePicker
                                        // customStyles={{dateInput:{borderWidth: 0}}}

                                        style={{
                                            width: "100%",
                                            borderWidth: 0,
                                            // marginLeft:"-4%"
                                            // color: "red"
                                            // flexDirection: "row"

                                        }}

                                        date={this.state.dateAndTimeStart}
                                        mode="datetime"
                                        placeholder={strInReqLan.dateOfTheBegining}
                                        // placeholderTextColor="red"

                                        format='MMMM Do YYYY, h:mm:ss a'
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date(2018, 12, 31)}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{

                                            dateInput: {
                                                // marginLeft: "3%",
                                                // width: "100%
                                                borderWidth: 0,
                                                fontSize: 10,
                                                // color:"red"


                                            },

                                            placeholderText: {
                                                textAlign: "left",
                                                marginLeft: "-10%"

                                            }


                                        }}
                                        onDateChange={(dateAndTimeStart) => { this.setState({ dateAndTimeStart: dateAndTimeStart }) }}
                                    />
                                </Item>

                            ) : (
                                    <Item style={{ backgroundColor: '#ffffff', width: '90%', height: 40 }}>
                                        <DatePicker
                                            disabled={true}
                                            style={{
                                                width: "100%",
                                                borderWidth: 0,
                                            }}

                                            date={this.state.dateAndTimeStart}
                                            mode="datetime"
                                            placeholder={strInReqLan.dateOfTheBegining}
                                            // placeholderTextColor="red"

                                            format='MMMM Do YYYY, h:mm:ss a'
                                            minimumDate={new Date(2018, 1, 1)}
                                            maximumDate={new Date(2018, 12, 31)}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {

                                                    borderWidth: 0,
                                                    fontSize: 10,
                                                    // color:"red"


                                                },

                                                placeholderText: {
                                                    textAlign: "left",
                                                    marginLeft: "-10%"

                                                }
                                            }}
                                            onDateChange={(dateAndTimeStart) => { this.setState({ dateAndTimeStart: dateAndTimeStart }) }}
                                        />
                                    </Item>
                                )}



                        </View>


                        <View
                            style={{
                                marginTop: "5%"

                            }}

                        >
                            <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ dateAndTimeEndDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.dateAndTimeEndDis === 1) ? (
                                <Item style={{ backgroundColor: '#ffffff', width: '90%', height: 40 }}>
                                    <DatePicker
                                        // customStyles={{dateInput:{borderWidth: 0}}}

                                        style={{
                                            width: "100%",
                                            borderWidth: 0,
                                            // marginLeft:"1%"

                                        }}
                                        date={this.state.dateAndTimeEnd}
                                        mode="datetime"
                                        placeholder={strInReqLan.dateOfTheEnd}
                                        // placeHolderTextStyle={{ color: "red", fontSize: 8, marginLeft: "13%" }}
                                        // textStyle={{ color: "#EC4651", fontSize: 13, marginLeft: "16%" }}


                                        format='MMMM Do YYYY, h:mm:ss a'
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date(2018, 12, 31)}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        // placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 15, marginLeft: "13%" }}

                                        customStyles={{

                                            dateInput: {
                                                // marginLeft: "5%",
                                                // width: "100%
                                                borderWidth: 0,
                                                fontSize: 10,
                                                // color:"red"


                                            },
                                            placeholderText: {
                                                textAlign: "left",
                                                marginLeft: 0
                                            }

                                        }}
                                        onDateChange={(dateAndTimeEnd) => { this.setState({ dateAndTimeEnd: dateAndTimeEnd }) }}
                                    />
                                </Item>

                            ) : (
                                    <Item style={{ backgroundColor: '#ffffff', width: '90%', height: 40 }}>
                                        <DatePicker
                                            disabled={true}

                                            style={{
                                                width: "100%",
                                                borderWidth: 0,
                                                // marginLeft:"1%"

                                            }}
                                            date={this.state.dateAndTimeEnd}
                                            mode="datetime"
                                            placeholder={strInReqLan.dateOfTheEnd}
                                            // placeHolderTextStyle={{ color: "red", fontSize: 8, marginLeft: "13%" }}
                                            // textStyle={{ color: "#EC4651", fontSize: 13, marginLeft: "16%" }}


                                            format='MMMM Do YYYY, h:mm:ss a'
                                            minimumDate={new Date(2018, 1, 1)}
                                            maximumDate={new Date(2018, 12, 31)}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            // placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 15, marginLeft: "13%" }}

                                            customStyles={{

                                                dateInput: {
                                                    // marginLeft: "5%",
                                                    // width: "100%
                                                    borderWidth: 0,
                                                    fontSize: 10,
                                                    // color:"red"


                                                },
                                                placeholderText: {
                                                    textAlign: "left",
                                                    marginLeft: 0
                                                }

                                            }}
                                            onDateChange={(dateAndTimeEnd) => { this.setState({ dateAndTimeEnd: dateAndTimeEnd }) }}
                                        />
                                    </Item>
                                )}




                        </View>



                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////input fields/////////////////////////////////////////////////////////// */}

                        <View style={{ marginTop: "5%" }}>
                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ discribeWhenMarkedAboveDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.discribeWhenMarkedAboveDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input

                                        placeholder={strInReqLan.discribeWhenMarkedAbove}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 12 }}
                                        onChangeText={(e) => { this.setState({ discribeWhenMarkedAbove: e }) }}
                                        value={this.state.discribeWhenMarkedAbove}
                                    />
                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.discribeWhenMarkedAbove}

                                    />
                                )}



                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ reportTheCIDDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.reportTheCIDDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.reportTheCID}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ reportTheCID: e }) }}
                                        value={this.state.reportTheCID}
                                    />
                                </Item>


                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.reportTheCID}

                                    />
                                )}





                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ reportTheDatesDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.reportTheDatesDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.reportTheDates}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 12 }}
                                        onChangeText={(e) => { this.setState({ reportTheDates: e }) }}
                                        value={this.state.reportTheDates}
                                    />
                                </Item>


                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.reportTheDates}

                                    />
                                )}




                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ reportTheDatesCompensateDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.reportTheDatesCompensateDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.reportTheDatesCompensate}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 12 }}
                                        onChangeText={(e) => { this.setState({ reportTheDatesCompensate: e }) }}
                                        value={this.state.reportTheDatesCompensate}
                                    />
                                </Item>


                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.reportTheDatesCompensate}

                                    />
                                )}


                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ kmReportDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.kmReportDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.kmReport}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ kmReport: e }) }}
                                        value={this.state.kmReport}
                                    />
                                </Item>


                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.kmReport}

                                    />
                                )}


                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ overtimeReasonDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.overtimeReasonDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.overtimeReason}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 15 }}
                                        onChangeText={(e) => { this.setState({ overtimeReason: e }) }}
                                        value={this.state.overtimeReason}
                                    />
                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.overtimeReason}

                                    />
                                )}

                        </View>




                        <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ generalObservationsDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}
                            />
                        </View>


                        {(this.state.generalObservationsDis === 1) ? (
                            <View style={styles.containerTextarea} >
                                <Textarea
                                    disabled={true}
                                    enabled={false}

                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    onChangeText={(e) => { this.setState({ generalObservations: e }) }}
                                    defaultValue={this.state.generalObservations}
                                    maxLength={120}
                                    placeholder={strInReqLan.generalObservations}
                                    placeholderTextColor={'#c7c7c7'}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        ) : (
                                <View style={{
                                    backgroundColor: "#EBEBEB", width: "90%", height: 180, marginTop: "5%"


                                }} >
                                    <Text style={{ color: "#8D8D8D", padding: 18, fontSize: 14, opacity: 0.2 }}>{strInReqLan.generalObservations}</Text>

                                </View>
                            )}












                        {

                            (this.props.isLoader === true) ?
                                (
                                    <Loading />

                                ) :
                                (


                                    <Button block style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#EC4651', width: "90%" }} onPress={this.savePRform.bind(this)} >
                                        <Text >{strInReqLan.submitPost}</Text>
                                    </Button>


                                    // <Button block info style={styles.button} onPress={this.savePRform.bind(this)} >
                                    //     <Text style={styles.btnTextMargin}>{strInReqLan.submitPost}</Text>
                                    // </Button>
                                )
                        }



                        {
                            (this.props.isError === true) ? (
                                <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                            ) : null
                        }


                    </ScrollView>

















                </View>

                {/* <View style={{ flex: 1, backgroundColor: "#E61825" }}>
                    <Footer>
                        <FooterTab style={{ backgroundColor: "#E61825", }}>
                            <Button vertical  >
                                <Image style={{ width: 23, height: 23, }}
                                    source={require('../assets/images/edit.png')}
                                    resizeMode="contain"
                                />
                            </Button>
                            <Button vertical >
                                <Image style={{ width: 23, height: 23, }}
                                    source={require('../assets/images/deleteicon.png')}
                                    resizeMode="contain"
                                />
                            </Button>
                        </FooterTab>
                    </Footer>
                </View> */}
            </View >
        );
    }
}


function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        jobListArr: state.root.jobListArr,
        dropDownOptions: state.root.dropDownOptions,
        selectedJob: state.root.selectedJob,
        // heading: state.root.heading

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
        errorRemove: () => {
            dispatch(errorRemove());
        },
        loaderStart: () => {
            dispatch(loaderStart());
        },
        saveUserPRDropDown: (dObj, jobId, prAdditionalData, imageArray, navigation) => {
            dispatch(saveUserPRDropDown(dObj, jobId, prAdditionalData, imageArray, navigation));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(CreateJobs);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },

    contentContainer: {
        paddingBottom: 1800,
        backgroundColor: "white",
        // marginTop: "0%"
        marginLeft: "5%"

    },

    // contentContainer: {
    //     paddingBottom: 100,
    //     backgroundColor: "white",
    //     // flex: 1
    //     // containerForCanvas
    // },
    containerForCanvas: {
        height: 220, marginTop: 12
    },

    functionButton: {
        marginHorizontal: 2.5, marginVertical: 8, height: 25, width: 50,
        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
    }
    ,


    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',



    },
    textareaContainer: {
        marginTop: "5%",
        width: "90%",
        height: 180,
        padding: 10,
        backgroundColor: '#F6F6F6',

    },

    // imgSize: {
    //     width: "50%",
    //     // height: 100,
    // },
    // imgView: {
    //     flexGrow: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     // height: 200,
    // },
    // footerColor: {
    //     backgroundColor: "#cc3333"
    // },
    marginText: {
        color: '#004D94',
        textAlign: 'center',
        // marginTop: 0
        marginBottom: 7,
        marginTop: 7

    },

    btnTextMargin: {
        fontWeight: 'bold',
        marginTop: 24



    },
    button: {
        width: '90%', backgroundColor: '#EC4651', marginBottom: '0%', marginTop: '5%', borderColor: '#EC4651', borderWidth: 1,
        shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30
    },




});

const styl = StyleSheet.create({
    // header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 0.5, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { justifyContent: 'center', alignItems: 'center', width: '90%', marginTop: 7, marginBottom: 10 },
    // input1: { height: "9.5%", width: "100%", borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    // icons: { color: '#2196f3', marginRight: 10 },
    // form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})



//
// <ScrollView style={{ flex: 8, backgroundColor: "blue" }}>

// <Text>Hello</Text>

// </ScrollView>

