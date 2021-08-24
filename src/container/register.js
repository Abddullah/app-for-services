import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body, Title, FooterTab, Footer, Icon } from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';
import PreRegisterJobSelectionDropDown from '../component/preregJobDropdown';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
// import DropDown from '../component/dropDown';
import DropDownArr from '../component/dropDownArr';
import DisibleDd from '../component/dissibleOptions';
import DisibleInput from '../component/disableInput';
// import DisCheckBox from '../component/disibleCheckBox';
import SwitchButton from '../component/mySwitchButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CheckBox from '../component/checkBox';

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

            reportThatFlag: true,
            isLoader: false,
            imgUrl: [],
            //////////////////////////additional data state//////////////////////////
            amountOfMaterial: "",
            amountOfTeam: "",
            serviceYouHaveDone: "",
            dateAndTimeStart: "",
            dateAndTimeEnd: "",
            customersOsNumber: "",
            codeOrOmFromTheCustomer: "",
            requestedService: "",
            generalObservations: "",
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
            },
            dropDownOptions: {
                prAdditionalData: {}
            },


            /////////////////////////////// states for switches///////////////////////////////
            reportThat: 1,
            discipline: 1,
            requestThat: 1,
            requester: 1,
            occurrence: 1,
            area_tag_local: 1,
            specialEquipmentApplied: 1,
            interventionType: 1,
            climate: 1,
            thereWasADelay: 1,
            applicationScheme: 1,
            delayedTime: 1,
            scope: 1,
            materialApplie: 1,
            materialAvailable: 1,
            timeSpent: 1,
            numberOfProfessionalsInvolved: 1,
            reasonForDelay: 1,
            inspectionResponsibleName: 1,
            inspectionResults: 1,
            reInspectionResults: 1,
            material: 1,
            additionalInformation: 1,
            checkBoxDis: 1,


            serviceYouHaveDoneDis: 1,
            customersOsNumberDis: 1,
            codeOrOmFromTheCustomerDis: 1,
            requestedServiceDis: 1,
            generalObservationsDis: 1,
            dateAndTimeStartDis: 1,
            dateAndTimeEndDis: 1,


        }

        this.uploadImage = this.uploadImage.bind(this);

    }




    uploadImage(images) {
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
        console.log(value, 'valueeeeee');
        console.log(dropDownHeading, "dd Heading", "5555");
        console.log(this.state.dropDownOptions, "dd option");
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


    // componentWillMount() {
    //     console.log(this.state.dropDownOptions,"wilmounttttttttttt")
    // }




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


        console.log("savePRform", this.props.isLoader)

        // this.props.loaderStart();

        if (this.state.imageArray !== undefined) {

            this.uploadImage(this.state.imageArray)
                .then(() => {

                    let prAdditionalData = {
                        amountOfMaterial: this.state.amountOfMaterial,
                        amountOfTeam: this.state.amountOfTeam,
                        serviceYouHaveDone: this.state.serviceYouHaveDone,
                        dateAndTimeStart: this.state.dateAndTimeStart,
                        dateAndTimeEnd: this.state.dateAndTimeEnd,
                        customersOsNumber: this.state.customersOsNumber,
                        codeOrOmFromTheCustomer: this.state.codeOrOmFromTheCustomer,
                        requestedService: this.state.requestedService,
                        generalObservations: this.state.generalObservations,
                        photosUri: this.state.imgUrl

                    }


                    let prAdditionalDataArr = []
                    prAdditionalDataArr.push(prAdditionalData)
                    let dropDownOptionsClone = this.state.dropDownOptions;
                    dropDownOptionsClone.prAdditionalDataArr = prAdditionalDataArr





                    // console.log(prAdditionalDataArr, "arrrrrrrrrrrrrrr")
                    // console.log(dropDownOptionsClone, "ddddddddddddddddddddd")
                    // console.log(this.state.dropDownOptions, "prAdditionalData")
                    this.props.saveUserPRDropDown(this.state.dropDownOptions, this.props.selectedJob.jobId, prAdditionalData, this.state.imageArray, this.props.navigation, this.propsobjPreRegistration)


                    this.setState({

                        imageArray: [],
                        imgUrl: [],
                        //////////////////////////additional data state//////////////////////////
                        amountOfMaterial: "",
                        amountOfTeam: "",
                        serviceYouHaveDone: "",
                        dateAndTimeStart: "",
                        dateAndTimeEnd: "",
                        customersOsNumber: "",
                        codeOrOmFromTheCustomer: "",
                        requestedService: "",
                        generalObservations: "",
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
                        },
                        dropDownOptions: {
                            // prAdditionalData: {}
                        }




                    })



                })

        }

        else {

            let prAdditionalData = {
                amountOfMaterial: this.state.amountOfMaterial,
                amountOfTeam: this.state.amountOfTeam,
                serviceYouHaveDone: this.state.serviceYouHaveDone,
                dateAndTimeStart: this.state.dateAndTimeStart,
                dateAndTimeEnd: this.state.dateAndTimeEnd,
                customersOsNumber: this.state.customersOsNumber,
                codeOrOmFromTheCustomer: this.state.codeOrOmFromTheCustomer,
                requestedService: this.state.requestedService,
                generalObservations: this.state.generalObservations,
                photosUri: this.state.imgUrl

            }


            let prAdditionalDataArr = []
            prAdditionalDataArr.push(prAdditionalData)
            let dropDownOptionsClone = this.state.dropDownOptions;
            dropDownOptionsClone.prAdditionalDataArr = prAdditionalDataArr





            // console.log(prAdditionalDataArr, "arrrrrrrrrrrrrrr")
            // console.log(dropDownOptionsClone, "ddddddddddddddddddddd")
            // console.log(this.state.dropDownOptions, "prAdditionalData")
            this.props.saveUserPRDropDown(this.state.dropDownOptions, this.props.selectedJob.jobId, prAdditionalData, this.state.imageArray, this.props.navigation, this.props.objPreRegistration)

            this.setState({

                imageArray: [],
                imgUrl: [],
                //////////////////////////additional data state//////////////////////////
                amountOfMaterial: "",
                amountOfTeam: "",
                serviceYouHaveDone: "",
                dateAndTimeStart: "",
                dateAndTimeEnd: "",
                customersOsNumber: "",
                codeOrOmFromTheCustomer: "",
                requestedService: "",
                generalObservations: "",
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
                },
                dropDownOptions: {
                    // prAdditionalData: {}
                }




            })





        }




    }



    render() {
        console.log(this.props.selectedJob, "selecteddddddddddddddddddddd")
        // console.log("selectedTeam", this.state.selectedTeam)
        // console.log("heading", this.state.selectedOption)
        // console.log(this.props.dropDownOptions, "valueeeOptionaction")
        console.log(this.state.dropDownOptions, 'this.state.dropDownOptions this.state.dropDownOptions this.state.dropDownOptions ')
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
                            <Text style={{ marginBottom: "1%", fontSize: 13, fontWeight: "bold", textAlign: "center", justifyContent: "center" }}>{strInReqLan.jobTitle}</Text>
                            <Text style={{ color: "gray", marginTop: "1%", textAlign: "center", justifyContent: "center" }} >{this.props.selectedJob.jobTitle}</Text>
                        </View>

                        <View style={{ height: 28, width: 65, marginTop: 10, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ reportThat: val })}      // this is necessary for this component
                                text1='E'                        // optional: first text in switch button --- default ON
                                text2='D'                       // optional: second text in switch button --- default OFF
                                switchWidth={65}                 // optional: switch width --- default 44
                                switchHeight={28}                 // optional: switch height --- default 100
                                // switchdirection='rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                                switchBorderRadius={0}          // optional: switch border radius --- default oval
                                switchSpeedChange={500}           // optional: button change speed --- default 100
                            // switchBorderColor='#d4d4d4'       // optional: switch border color --- default #d4d4d4
                            // switchBackgroundColor='#fff'      // optional: switch background color --- default #fff
                            // btnBorderColor='#00a4b9'          // optional: button border color --- default #00a4b9
                            // btnBackgroundColor='#00bcd4'      // optional: button background color --- default #00bcd4
                            // fontColor='#b1b1b1'               // optional: text font color --- default #b1b1b1
                            // activeFontColor='#fff'            // optional: active font color --- default #fff
                            />

                        </View>




                        {
                            ([strInReqLan.reportThat] in this.state.dropDownOptions && this.state.reportThat === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.reportThat]}
                                    selectedOption={this.state.selectedOption[strInReqLan.reportThat]}
                                    heading={strInReqLan.reportThat}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                // <Text>{strInReqLan.reportThat}</Text>
                                <DisibleDd
                                    heading={strInReqLan.reportThat}
                                    that={this}
                                />

                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ discipline: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.discipline] in this.state.dropDownOptions && this.state.discipline === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.discipline]}
                                    selectedOption={this.state.selectedOption[strInReqLan.discipline]}
                                    heading={strInReqLan.discipline}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.discipline}
                                    that={this}
                                />
                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
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
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
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
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ requester: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>


                        {
                            ([strInReqLan.requester] in this.state.dropDownOptions && this.state.requester === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.requester]}
                                    selectedOption={this.state.selectedOption[strInReqLan.requester]}
                                    heading={strInReqLan.requester}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.requester}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ occurrence: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.occurrence] in this.state.dropDownOptions && this.state.occurrence === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.occurrence]}
                                    selectedOption={this.state.selectedOption[strInReqLan.occurrence]}
                                    heading={strInReqLan.occurrence}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.occurrence}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
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
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
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
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ specialEquipmentApplied: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.specialEquipmentApplied] in this.state.dropDownOptions && this.state.specialEquipmentApplied === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.specialEquipmentApplied]}
                                    selectedOption={this.state.selectedOption[strInReqLan.specialEquipmentApplied]}
                                    heading={strInReqLan.specialEquipmentApplied}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.specialEquipmentApplied}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ interventionType: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.interventionType] in this.state.dropDownOptions && this.state.interventionType === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.interventionType]}
                                    selectedOption={this.state.selectedOption[strInReqLan.interventionType]}
                                    heading={strInReqLan.interventionType}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.interventionType}
                                    that={this}
                                />
                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ climate: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.climate] in this.state.dropDownOptions && this.state.climate === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.climate]}
                                    selectedOption={this.state.selectedOption[strInReqLan.climate]}
                                    heading={strInReqLan.climate}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.climate}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ thereWasADelay: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.thereWasADelay] in this.state.dropDownOptions && this.state.thereWasADelay === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.thereWasADelay]}
                                    selectedOption={this.state.selectedOption[strInReqLan.thereWasADelay]}
                                    heading={strInReqLan.thereWasADelay}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.thereWasADelay}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
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
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
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
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ delayedTime: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.delayedTime] in this.state.dropDownOptions && this.state.delayedTime === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.delayedTime]}
                                    selectedOption={this.state.selectedOption[strInReqLan.delayedTime]}
                                    heading={strInReqLan.delayedTime}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.delayedTime}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ scope: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.scope] in this.state.dropDownOptions && this.state.scope === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.scope]}
                                    selectedOption={this.state.selectedOption[strInReqLan.scope]}
                                    heading={strInReqLan.scope}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.scope}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ materialApplie: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.materialApplie] in this.state.dropDownOptions && this.state.materialApplie === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.materialApplie]}
                                    selectedOption={this.state.selectedOption[strInReqLan.materialApplie]}
                                    heading={strInReqLan.materialApplie}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.materialApplie}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ materialAvailable: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.materialAvailable] in this.state.dropDownOptions && this.state.materialAvailable === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.materialAvailable]}
                                    selectedOption={this.state.selectedOption[strInReqLan.materialAvailable]}
                                    heading={strInReqLan.materialAvailable}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.materialAvailable}
                                    that={this}
                                />
                        }

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ timeSpent: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>


                        {
                            ([strInReqLan.timeSpent] in this.state.dropDownOptions && this.state.timeSpent === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.timeSpent]}
                                    selectedOption={this.state.selectedOption[strInReqLan.timeSpent]}
                                    heading={strInReqLan.timeSpent}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.timeSpent}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ numberOfProfessionalsInvolved: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.numberOfProfessionalsInvolved] in this.state.dropDownOptions && this.state.numberOfProfessionalsInvolved === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.numberOfProfessionalsInvolved]}
                                    selectedOption={this.state.selectedOption[strInReqLan.numberOfProfessionalsInvolved]}
                                    heading={strInReqLan.numberOfProfessionalsInvolved}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.numberOfProfessionalsInvolved}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ reasonForDelay: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.reasonForDelay] in this.state.dropDownOptions && this.state.reasonForDelay === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.reasonForDelay]}
                                    selectedOption={this.state.selectedOption[strInReqLan.reasonForDelay]}
                                    heading={strInReqLan.reasonForDelay}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.reasonForDelay}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ inspectionResponsibleName: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.inspectionResponsibleName] in this.state.dropDownOptions && this.state.inspectionResponsibleName === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.inspectionResponsibleName]}
                                    selectedOption={this.state.selectedOption[strInReqLan.inspectionResponsibleName]}
                                    heading={strInReqLan.inspectionResponsibleName}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.inspectionResponsibleName}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ inspectionResults: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.inspectionResults] in this.state.dropDownOptions && this.state.inspectionResults === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.inspectionResults]}
                                    selectedOption={this.state.selectedOption[strInReqLan.inspectionResults]}
                                    heading={strInReqLan.inspectionResults}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.inspectionResults}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ reInspectionResults: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.reInspectionResults] in this.state.dropDownOptions && this.state.reInspectionResults === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.reInspectionResults]}
                                    selectedOption={this.state.selectedOption[strInReqLan.reInspectionResults]}
                                    heading={strInReqLan.reInspectionResults}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this} />
                                :
                                <DisibleDd
                                    heading={strInReqLan.reInspectionResults}
                                    that={this}
                                />
                        }
                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ material: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>
                        {
                            ([strInReqLan.material] in this.state.dropDownOptions && this.state.material === 1) ?
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
                                    dropDownList={this.state.dropDownOptions[strInReqLan.material]}
                                    selectedOption={this.state.selectedOption[strInReqLan.material]}
                                    heading={strInReqLan.material}
                                    selectedJob={this.state.selectedJob}
                                    onChangeFunc={this.onValueChangeHandleForDropDownArr}
                                    that={this}

                                    input={true}
                                    change={(e) => { this.setState({ amountOfMaterial: e }) }}
                                    value={this.state.amountOfMaterial}

                                />



                                :
                                <DisibleDd
                                    // input={true}
                                    heading={strInReqLan.material}
                                    that={this}
                                />
                        }


                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
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
                                <DropDownArr
                                    // heading={this.state.reportThatHeading.reportThat}
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






                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}
                        {/* **********************Multiple team option************************* */}

                        <View style={{ height: 28, width: 65, marginBottom: 10, marginLeft: "70%" }}>
                            <SwitchButton
                                onValueChange={(val) => this.setState({ checkBoxDis: val })}
                                text1='E'
                                text2='D'
                                switchWidth={65}
                                switchHeight={28}
                                switchBorderRadius={0}
                                switchSpeedChange={500}

                            />

                        </View>

                        {
                            ([strInReqLan.team] in this.state.dropDownOptions && this.state.checkBoxDis === 1) ?
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>{strInReqLan.team}</Text>
                                    <CheckBox style={{ marginTop: "3%", marginBottom: "3%", }}
                                        // heading={this.state.reportThatHeading.reportThat}
                                        dropDownList={this.state.dropDownOptions[strInReqLan.team]}
                                        selectedOption={this.state.selectedOption[strInReqLan.team]}
                                        heading={strInReqLan.team}
                                        selectedJob={this.state.selectedJob}
                                        onChangeFunc={this.onValueChangeHandleForCheckBox}
                                        that={this}

                                        input={true}
                                        change={(e) => { this.setState({ amountOfTeam: e }) }}
                                    // value={this.state.amountOfMaterial}

                                    />
                                </View>
                                :
                                <Text style={{
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    width: "90%",
                                    color: "grey",
                                }}>{strInReqLan.team}</Text>

                        }


                        <View
                            style={{
                                marginTop: "5%"

                            }}
                        >
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

                                            // dateIcon: {
                                            //     position: 'absolute',
                                            //     left: 0,
                                            //     top: 4,
                                            //     marginLeft: "85%",
                                            //     height:20,
                                            //     width:20

                                            // },
                                            // ... You can check the source to find the other keys.
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

                                            format='MMMM Do YYYY, h:mm:ss a'
                                            minimumDate={new Date(2018, 1, 1)}
                                            maximumDate={new Date(2018, 12, 31)}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 10,



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

                                        style={{
                                            width: "100%",
                                            borderWidth: 0,

                                        }}
                                        date={this.state.dateAndTimeEnd}
                                        mode="datetime"
                                        placeholder={strInReqLan.dateOfTheEnd}


                                        format='MMMM Do YYYY, h:mm:ss a'
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date(2018, 12, 31)}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"

                                        customStyles={{

                                            dateInput: {

                                                borderWidth: 0,
                                                fontSize: 10,


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

                                            }}
                                            date={this.state.dateAndTimeEnd}
                                            mode="datetime"
                                            placeholder={strInReqLan.dateOfTheEnd}


                                            format='MMMM Do YYYY, h:mm:ss a'
                                            minimumDate={new Date(2018, 1, 1)}
                                            maximumDate={new Date(2018, 12, 31)}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"

                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 10,


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










                        <View

                            style={{
                                marginTop: "5%"

                            }}
                        >




                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ serviceYouHaveDoneDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.serviceYouHaveDoneDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.serviceYouHaveDone}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 13 }}
                                        onChangeText={(e) => { this.setState({ serviceYouHaveDone: e }) }}
                                        value={this.state.serviceYouHaveDone}
                                    />

                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.serviceYouHaveDone}

                                    />
                                )}





                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ customersOsNumberDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.customersOsNumberDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.customersOsNumber}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 13 }}
                                        onChangeText={(e) => { this.setState({ customersOsNumber: e }) }}
                                        value={this.state.customersOsNumber}
                                    />

                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.customersOsNumber}

                                    />
                                )}



                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ codeOrOmFromTheCustomerDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.codeOrOmFromTheCustomerDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.codeOrOmFromTheCustomer}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 10 }}
                                        onChangeText={(e) => { this.setState({ codeOrOmFromTheCustomer: e }) }}
                                        value={this.state.codeOrOmFromTheCustomer}
                                    />

                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.codeOrOmFromTheCustomer}

                                    />
                                )}




                            <View style={{ height: 28, width: 65, marginBottom: 5, marginLeft: "70%" }}>
                                <SwitchButton
                                    onValueChange={(val) => this.setState({ requestedServiceDis: val })}
                                    text1='E'
                                    text2='D'
                                    switchWidth={65}
                                    switchHeight={28}
                                    switchBorderRadius={0}
                                    switchSpeedChange={500}
                                />
                            </View>
                            {(this.state.requestedServiceDis === 1) ? (
                                <Item style={styl.input}>
                                    <Input
                                        placeholder={strInReqLan.requestedService}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "8%", fontSize: 13 }}
                                        onChangeText={(e) => { this.setState({ requestedService: e }) }}
                                        value={this.state.requestedService}
                                    />
                                </Item>

                            ) : (
                                    <DisibleInput
                                        heading={strInReqLan.requestedService}

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
                                    style={styles.textarea}
                                    containerStyle={styles.textareaContainer}
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
                                    <Button block style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#EC4651', width: "90%" }}  onPress={this.savePRform.bind(this)} >
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
        objPreRegistration: state.root.objPreRegistration,

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
        saveUserPRDropDown: (dObj, jobId, prAdditionalData, imageArray, navigation, objPreRegistration) => {
            dispatch(saveUserPRDropDown(dObj, jobId, prAdditionalData, imageArray, navigation, objPreRegistration));
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
        paddingBottom: 1500,
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

