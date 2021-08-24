import React, { Component } from 'react';
import {
    Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header,
    Body, Title, DatePicker
} from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
import LogoImage from '../component/logoImage';
import { createJobData, errorForPostJob, loaderStart } from '../store/action/action';
// import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Textarea from 'react-native-textarea';


// import * as firebase from 'firebase'
// import FirebaseClient from './FirebaseClient'
import RNFetchBlob from 'rn-fetch-blob'

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob







class CreateJobs extends Component {
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
        if (this.path !== 0) {
            this.canvas2.save('RNSketchCanvas', this.fileNameToSave, true, "jpeg", false, false, false)
        } else {
            this.props.errorForPostJob()
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


















    render() {
        return (
            <View>
                <Header androidStatusBarColor="#AE000B"
                    style={{ backgroundColor: '#E61825', marginBottom: "2%" }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => this.props.navigation.navigate("CompanyHome")}>
                            {/* <Icon name='arrow-back' /> */}

                            {/* <Image style={{ width: 50, height: 25 }}
                                source={require('../assets/images/backarrow.png')}
                                resizeMode="contain"
                            /> */}
                            <MaterialIcons name='arrow-back' style={{ marginRight: 20, fontSize: 35, color: "white" }} />

                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ marginLeft: "2%", fontWeight: "bold" }}>{strInReqLan.postRequest}</Title>
                    </Body>

                </Header>
                <ScrollView contentContainerStyle={styles.contentContainer} style={{ backgroundColor: "white" }}>


                    <Form>
                        {/* <LogoImage /> */}
                        {/* ///////////////////////////////DROPDOWN/////////////////////////////// */}
                        {/* <Text style={{ textAlign: "center", fontWeight: "bold" }}>Please Create Create Jobs / Administration Service</Text> */}
                        <View style={{ alignItems: 'center', }}>
                            <View >
                                <Item style={styl.input} >
                                    <Picker mode="dropdown" selectedValue={this.state.type} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                                        <Items style={{ fontSize: 12 }} label={strInReqLan.createNewJobs} value={strInReqLan.createNewJobs} />

                                        <Items style={{ fontSize: 12 }} label={strInReqLan.createNewAdmServices} value={strInReqLan.createNewAdmServices} />
                                    </Picker>
                                </Item>
                            </View>

                            {
                                (this.state.type === strInReqLan.createNewAdmServices) ?
                                    <View>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.serTitle}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serTitle: e }) }}
                                                value={this.state.serTitle}
                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/jobTitle.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='subtitles' style={{ marginRight: 20, fontSize: 19, color: "#2D669A" }} />

                                        </Item>

                                        <Item style={styl.input} >
                                            <Picker mode="dropdown" selectedValue={this.state.serStatus} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChangeForSerStatus.bind(this)} >
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.active} value={strInReqLan.active} />
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.inActive} value={strInReqLan.inActive} />
                                            </Picker>
                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.email}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'email-address'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serEmail: e }) }}
                                                value={this.state.serEmail}
                                            />
                                            {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                source={require('../assets/images/emailblueios.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='email' style={{ marginRight: 20, fontSize: 19, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleName}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serResName: e }) }}
                                                value={this.state.serResName}
                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/master_icon.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleNumber}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serResNum: e }) }}
                                                value={this.state.serResNum}
                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/telephonelogo.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>

                                        <View style={styles.containerForCanvas}>
                                            <RNSketchCanvas
                                                ref={ref => this.canvas2 = ref}

                                                containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                                canvasStyle={{ backgroundColor: '#F6F6F6', flex: 1 }}
                                                onPathsChange={val => {
                                                    console.log(val)
                                                    this.path = val
                                                }}
                                                onSketchSaved={(success, filePath) => {
                                                    console.log('onSketchSaved', 'filePath: ' + filePath, success);
                                                    this.uploadImage(filePath)
                                                        .then(url => {
                                                            console.log('uploaded', url);
                                                            this.setState({ image_uri: url });


                                                            if (this.state.type === strInReqLan.createNewJobs) {
                                                                if (this.state.begginingDate === "" || this.state.expTermDate === "") {
                                                                    this.props.errorForPostJob()
                                                                }
                                                                else {
                                                                    console.log(this.state.image_uri, "imageeeeeeeeeeeeeeeeeeeeeeee")
                                                                    let user = {
                                                                        jobTitle: this.state.jobTitle,
                                                                        status: this.state.status,
                                                                        email: this.state.email,
                                                                        responsibleName: this.state.responsibleName,
                                                                        responsibleNumber: this.state.responsibleNumber,
                                                                        contractNoOfJob: this.state.contractNoOfJob,
                                                                        address: this.state.address,
                                                                        begginingDate: this.state.begginingDate,
                                                                        expTermDate: this.state.expTermDate,
                                                                        type: this.state.type,
                                                                        jobDate: Date.now(),
                                                                        // test:"test",
                                                                        image: url,
                                                                        // flagForTitle:true,
                                                                        // flagForStatus:true,
                                                                    }
                                                                    console.log(user, 'iserrerererere')
                                                                    this.props.createJobData(user, strInReqLan.createNewJobs, this.props.navigation, this.props.jobListArr, this.state.begginingDate)
                                                                }
                                                            }
                                                            else if (this.state.type === strInReqLan.createNewAdmServices) {
                                                                let user = {
                                                                    serTitle: this.state.serTitle,
                                                                    serStatus: this.state.serStatus,
                                                                    serEmail: this.state.serEmail,
                                                                    serResName: this.state.serResName,
                                                                    serResNum: this.state.serResNum,
                                                                    type: this.state.type,
                                                                    image: url,
                                                                    jobDate: Date.now(),


                                                                    // image_uri: this.state.image_uri,
                                                                    // flagForTitle:false,
                                                                    // flagForStatus:false,


                                                                }
                                                                this.props.createJobData(user, strInReqLan.createNewAdmServices, this.props.navigation, this.props.jobListArr)
                                                            }






                                                        })
                                                        .catch(error => console.log(error))

                                                }

                                                }



                                                closeComponent={<Text style={{ color: 'black', marginLeft: "35%", textDecorationLine: "underline" }}>{strInReqLan.signature}</Text>}
                                                // closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                                                // undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                                                clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>{strInReqLan.clear}</Text></View>}
                                                // eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                                                // strokeComponent={color => (
                                                //     <View style={[styles.strokeColorButton]} />
                                                // )}
                                                // strokeSelectedComponent={(color, index, changed) => {
                                                //     return (
                                                //         <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                                                //     )
                                                // }}
                                                // strokeWidthComponent={(w) => {
                                                //     return (<View>
                                                //         <View style={{
                                                //             backgroundColor: 'white', marginHorizontal: 2.5,
                                                //             width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                                //         }} />
                                                //     </View>
                                                //     )
                                                // }}
                                                // saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
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


                                    </View>
                                    :

                                    (<View>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.jobTitle}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ jobTitle: e }) }}


                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/jobTitle.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='subtitles' style={{ marginRight: 20, fontSize: 19, color: "#2D669A" }} />

                                        </Item>

                                        <Item style={styl.input} >
                                            <Picker mode="dropdown" selectedValue={this.state.status} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChangeForStatus.bind(this)} >
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.notStarted} value={strInReqLan.notStarted} />
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.initiad} value={strInReqLan.initiad} />
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.parallized} value={strInReqLan.parallized} />
                                                <Items style={{ fontSize: 12 }} label={strInReqLan.concluded} value={strInReqLan.concluded} />
                                            </Picker>
                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.email}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'email-address'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ email: e }) }}
                                                value={this.state.email}
                                            />
                                            {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                source={require('../assets/images/emailblueios.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='email' style={{ marginRight: 20, fontSize: 19, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleName}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ responsibleName: e }) }}
                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/master_icon.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleNumber}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ responsibleNumber: e }) }}
                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/telephonelogo.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.contractNoOfJob}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ contractNoOfJob: e }) }}
                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/jobqty.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='numeric' style={{ marginRight: 20, fontSize: 18, color: "white", borderRadius: 100, backgroundColor: "#2D669A" }} />

                                        </Item>

                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.address}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ address: e }) }}
                                            />
                                            {/* <Image style={{ width: 20.8, height: 25, marginRight: 20, }}
                                                source={require('../assets/images/address.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Entypo name='location' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        {/* ///////////////////////////////Date/////////////////////////////// */}
                                        <Item style={{ backgroundColor: '#ffffff', justifyContent: "space-between" }}>
                                            <DatePicker
                                                defaultDate={new Date()}
                                                minimumDate={new Date(2018, 1, 1)}
                                                maximumDate={new Date(2018, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                placeHolderText={strInReqLan.begginingDate}
                                                textStyle={{ color: "#EC4651", fontSize: 15, marginLeft: "16%" }}
                                                placeHolderTextStyle={{ color: "#d3d3d3", marginLeft: "17%", fontSize: 15 }}
                                                onDateChange={this.setDateStarting}
                                            />
                                            {/* <Image style={{ width: 18, height: 20, marginRight: 20 }}
                                                source={require('../assets/images/calender.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Entypo name='calendar' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={{ backgroundColor: '#ffffff', justifyContent: "space-between" }}>
                                            <DatePicker
                                                defaultDate={new Date()}
                                                minimumDate={new Date(2018, 1, 1)}
                                                maximumDate={new Date(2018, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                placeHolderText={strInReqLan.expTermDate}
                                                textStyle={{ color: "#EC4651", fontSize: 15, marginLeft: "16%" }}
                                                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 15, marginLeft: "13%" }}
                                                onDateChange={this.setDateExpirejob}
                                            />
                                            <Entypo name='calendar' style={{ marginRight: 20, fontSize: 18, color: "#2D669A" }} />

                                        </Item>
                                        <View style={styles.containerForCanvas}>
                                            <RNSketchCanvas
                                                ref={ref => this.canvas2 = ref}

                                                containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                                canvasStyle={{ backgroundColor: '#F6F6F6', flex: 1 }}
                                                onPathsChange={val => {
                                                    console.log(val)
                                                    this.path = val
                                                }}
                                                onSketchSaved={(success, filePath) => {
                                                    console.log('onSketchSaved', 'filePath: ' + filePath, success);
                                                    this.uploadImage(filePath)
                                                        .then(url => {
                                                            console.log('uploaded', url);
                                                            this.setState({ image_uri: url });


                                                            if (this.state.type === strInReqLan.createNewJobs) {
                                                                if (this.state.begginingDate === "" || this.state.expTermDate === "") {
                                                                    this.props.errorForPostJob()
                                                                }
                                                                else {
                                                                    console.log(this.state.image_uri, "imageeeeeeeeeeeeeeeeeeeeeeee")
                                                                    let user = {
                                                                        jobTitle: this.state.jobTitle,
                                                                        status: this.state.status,
                                                                        email: this.state.email,
                                                                        responsibleName: this.state.responsibleName,
                                                                        responsibleNumber: this.state.responsibleNumber,
                                                                        contractNoOfJob: this.state.contractNoOfJob,
                                                                        address: this.state.address,
                                                                        begginingDate: this.state.begginingDate,
                                                                        expTermDate: this.state.expTermDate,
                                                                        type: this.state.type,
                                                                        jobDate: Date.now(),
                                                                        // test:"test",
                                                                        image: url,
                                                                        // flagForTitle:true,
                                                                        // flagForStatus:true,
                                                                    }
                                                                    console.log(user, 'iserrerererere')
                                                                    this.props.createJobData(user, strInReqLan.createNewJobs, this.props.navigation, this.props.jobListArr, this.state.begginingDate)
                                                                }
                                                            }
                                                            else if (this.state.type === strInReqLan.createNewAdmServices) {
                                                                let user = {
                                                                    serTitle: this.state.serTitle,
                                                                    serStatus: this.state.serStatus,
                                                                    serEmail: this.state.serEmail,
                                                                    serResName: this.state.serResName,
                                                                    serResNum: this.state.serResNum,
                                                                    type: this.state.type,
                                                                    image: url,
                                                                    jobDate: Date.now(),
                                                                    // test:"test",

                                                                    // image_uri: this.state.image_uri,
                                                                    // flagForTitle:false,
                                                                    // flagForStatus:false,


                                                                }
                                                                this.props.createJobData(user, strInReqLan.createNewAdmServices, this.props.navigation, this.props.jobListArr)
                                                            }






                                                        })
                                                        .catch(error => console.log(error))

                                                }

                                                }



                                                closeComponent={<Text style={{ color: 'black', marginLeft: "35%", textDecorationLine: "underline" }}>{strInReqLan.signature}</Text>}
                                                // closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                                                // undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                                                clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>{strInReqLan.clear}</Text></View>}
                                                // eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                                                // strokeComponent={color => (
                                                //     <View style={[styles.strokeColorButton]} />
                                                // )}
                                                // strokeSelectedComponent={(color, index, changed) => {
                                                //     return (
                                                //         <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                                                //     )
                                                // }}
                                                // strokeWidthComponent={(w) => {
                                                //     return (<View>
                                                //         <View style={{
                                                //             backgroundColor: 'white', marginHorizontal: 2.5,
                                                //             width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                                //         }} />
                                                //     </View>
                                                //     )
                                                // }}
                                                // saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
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



                                    </View>)
                            }
                        </View>
                        {
                            (this.props.isLoader === true) ?
                                (
                                    <Loading />
                                ) :
                                (


                                    <Button block style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#EC4651', width: "90%", marginHorizontal: "5%" }} onPress={this.onSubmit.bind(this)}   >
                                        <Text >{strInReqLan.submitPost}</Text>
                                    </Button>

                                    // <Button block info style={styl.button} onPress={this.onSubmit.bind(this)}   >
                                    // </Button>
                                )
                        }
                        {
                            (this.props.isError === true) ? (
                                <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                            ) : null
                        }
                    </Form>
                    {/* <Text style={styles.marginText}
                    onPress={() => this.props.navigation.navigate("CompanyHome")}>
                    {strInReqLan.backToHomePage}
                </Text> */}
                    {/* <Text style={styles.marginText}
                >
                    {strInReqLan.readTermsOfUse}
                </Text> */}

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
        jobListArr: state.root.jobListArr,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        createJobData: (userDetails, type, navigation, jobListArr) => {
            dispatch(createJobData(userDetails, type, navigation, jobListArr));
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

export default connect(mapStateToProp, mapDispatchToProp)(CreateJobs);


const styles = StyleSheet.create({

    contentContainer: {
        paddingBottom: 100,
        backgroundColor: "white",
        // flex: 1
        // containerForCanvas
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
        marginTop: 22

    }


});

const styl = StyleSheet.create({
    // header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 0.5, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },
    // input1: { height: "9.5%", width: "100%", borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    // icons: { color: '#2196f3', marginRight: 10 },
    // form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})