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
import { createJobData, editPost, loaderStart } from '../store/action/action';
import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';








class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            type: "",
            // for job stats//
            jobTitle: "",
            status: strInReqLan.notStarted,
            email: "",
            responsibleName: "",
            responsibleNumber: "",
            contractNoOfJob: "",
            address: "",
            begginingDate: "",
            expTermDate: "",
            // flagForTitle: false,
            // flagForStatus: false,

            // for service stats//
            serTitle: "",
            serStatus: strInReqLan.active,
            serEmail: "",
            serResName: "",
            serResNum: "",
        }
        this.setDateStarting = this.setDateStarting.bind(this);
        this.setDateExpirejob = this.setDateExpirejob.bind(this);
    }
    setDateStarting(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ begginingDate: cloneDateInmiliSecond });

    }

    setDateExpirejob(newDate) {
        let cloneDateInmiliSecond = new Date(newDate).getTime();
        this.setState({ expTermDate: cloneDateInmiliSecond });


    }



    update() {
        this.props.loaderStart()
        if (this.state.type === "Empregos" || this.state.type === "Jobs") {
            if (this.state.begginingDate === "" || this.state.expTermDate === "") {
                this.props.errorForPostJob()
            }
            else {
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
                    image: this.state.image,
                    jobDate: this.state.jobDate
                }
                this.props.editPost(user, strInReqLan.createNewJobs, this.props.navigation, this.state.begginingDate, this.props.jobListArr[this.props.index].jobId)
            }
        }
        else if (this.state.type === "Crie novos serviços administrativos" || this.state.type === "Administrative services") {
            let user = {
                serTitle: this.state.serTitle,
                serStatus: this.state.serStatus,
                serEmail: this.state.serEmail,
                serResName: this.state.serResName,
                serResNum: this.state.serResNum,
                type: this.state.type,
                image: this.state.image,
                jobDate: this.state.jobDate


            }
            this.props.editPost(user, strInReqLan.createNewAdmServices, this.props.navigation, null, this.props.jobListArr[this.props.index].jobId)
        }
    }
    componentWillUnmount() {
        this.props.errorRemove()
    }

    componentWillMount() {
        this.setState({
            type: this.props.jobListArr[this.props.index].type,
            serStatus: this.props.jobListArr[this.props.index].serStatus,
            jobTitle: this.props.jobListArr[this.props.index].jobTitle,
            status: this.props.jobListArr[this.props.index].status,
            email: this.props.jobListArr[this.props.index].email,
            responsibleName: this.props.jobListArr[this.props.index].responsibleName,
            responsibleNumber: this.props.jobListArr[this.props.index].responsibleNumber,
            contractNoOfJob: this.props.jobListArr[this.props.index].contractNoOfJob,
            address: this.props.jobListArr[this.props.index].address,
            begginingDate: this.props.jobListArr[this.props.index].begginingDate,
            expTermDate: this.props.jobListArr[this.props.index].expTermDate,
            jobDate: this.props.jobListArr[this.props.index].jobDate,

            serTitle: this.props.jobListArr[this.props.index].serTitle,
            serStatus: this.props.jobListArr[this.props.index].serStatus,
            serEmail: this.props.jobListArr[this.props.index].serEmail,
            serResName: this.props.jobListArr[this.props.index].serResName,
            serResNum: this.props.jobListArr[this.props.index].serResNum,
            image: this.props.jobListArr[this.props.index].image,



        })
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



    render() {
        viewJob = this.props.navigation.getParam('vewJob');
        viewJob = JSON.parse(viewJob);
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Header androidStatusBarColor="#AE000B"
                    style={{ backgroundColor: '#E61825', marginBottom: "2%" }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => this.props.navigation.navigate("FullCard")}>

                            {/* <Image style={{ width: 50, height: 25 }}
                                source={require('../assets/images/backarrow.png')}
                                resizeMode="contain"
                            /> */}
                            <MaterialIcons name='arrow-back' style={{ marginRight: 20, fontSize: 35, color: "white" }} />

                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ marginLeft: "5%", fontWeight: "bold" }}>{strInReqLan.updatePost}</Title>
                    </Body>

                </Header>
                <ScrollView contentContainerStyle={styles.contentContainer} style={{ backgroundColor: "white" }}>
                    <Form >
                        {/* ///////////////////////////////DROPDOWN/////////////////////////////// */}
                        <View style={{ alignItems: 'center', }}>
                            {/* <View >
                                <Item style={styl.input} >
                                    <Picker mode="dropdown" selectedValue={this.state.type} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                                        <Items style={{ fontSize: 12 }} label={strInReqLan.createNewJobs} value={strInReqLan.createNewJobs} />

                                        <Items style={{ fontSize: 12 }} label={strInReqLan.createNewAdmServices} value={strInReqLan.createNewAdmServices} />
                                    </Picker>
                                </Item>
                            </View> */}

                            {
                                (this.state.type === strInReqLan.createNewAdmServices) ?
                                    <View style={{ backgroundColor: "white" }}>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.serTitle}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15, }}
                                                onChangeText={(e) => { this.setState({ serTitle: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].serTitle}
                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/jobTitle.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

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
                                                defaultValue={this.props.jobListArr[this.props.index].serEmail}
                                            />
                                            {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                source={require('../assets/images/emailblueios.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='email' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleName}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serResName: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].serResName}
                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/master_icon.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleNumber}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ serResNum: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].serResNum}
                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/telephonelogo.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        {/* <View style={{ backgroundColor: "red", marginTop: "15.2%" }}>
                                        </View> */}

                                    </View>
                                    :

                                    (<View style={{ backgroundColor: "white" }}>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.jobTitle}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                defaultValue={this.props.jobListArr[this.props.index].jobTitle}
                                                onChangeText={(e) => { this.setState({ jobTitle: e }) }}


                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/jobTitle.png')}
                                                resizeMode="contain"
                                            /> */}

                                            <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#004D94" }} />

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
                                                defaultValue={this.props.jobListArr[this.props.index].email}
                                            />
                                            {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                source={require('../assets/images/emailblueios.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='email' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleName}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ responsibleName: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].responsibleName}

                                            />
                                            {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                source={require('../assets/images/master_icon.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.responsibleNumber}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ responsibleNumber: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].responsibleNumber}

                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/telephonelogo.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.contractNoOfJob}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                keyboardType={'numeric'}
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ contractNoOfJob: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].contractNoOfJob}

                                            />
                                            {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                source={require('../assets/images/jobqty.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Icon name='numeric' style={{ marginRight: 20, fontSize: 15, color: "white", borderRadius: 100, backgroundColor: "#2D669A" }} />

                                        </Item>

                                        <Item style={styl.input}>
                                            <Input
                                                placeholder={strInReqLan.address}
                                                placeholderStyle={{ fontSize: 10 }}
                                                placeholderTextColor="#b3b3b3"
                                                style={{ marginLeft: "10%", fontSize: 15 }}
                                                onChangeText={(e) => { this.setState({ address: e }) }}
                                                defaultValue={this.props.jobListArr[this.props.index].address}

                                            />
                                            {/* <Image style={{ width: 20.8, height: 25, marginRight: 20, }}
                                                source={require('../assets/images/address.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Entypo name='location' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        {/* ///////////////////////////////Date/////////////////////////////// */}
                                        <Item style={{ justifyContent: "space-between" }}>
                                            <DatePicker
                                                // defaultDate={new Date(2018, 4, 4)}
                                                // minimumDate={new Date(2018, 1, 1)}
                                                // maximumDate={new Date(2018, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                placeHolderText={Moment(this.props.jobListArr[this.props.index].begginingDate).format('ddd DD MMM YY')}
                                                textStyle={{ color: "black", fontSize: 15, marginLeft: "16%" }}
                                                placeHolderTextStyle={{ color: "black", marginLeft: "17%", fontSize: 15 }}
                                                onDateChange={this.setDateStarting}
                                            // defaultValue={this.props.jobListArr[this.props.index].begginingDate}

                                            />
                                            {/* <Image style={{ width: 18, height: 20, marginRight: 20 }}
                                                source={require('../assets/images/calender.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Entypo name='calendar' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                        </Item>
                                        <Item style={{ justifyContent: "space-between" }}>
                                            <DatePicker
                                                // defaultDate={new Date(2018, 4, 4)}
                                                // minimumDate={new Date(2018, 1, 1)}
                                                // maximumDate={new Date(2018, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                placeHolderText={Moment(this.props.jobListArr[this.props.index].expTermDate).format('ddd DD MMM YY')}
                                                textStyle={{ color: "black", fontSize: 15, marginLeft: "16%" }}
                                                placeHolderTextStyle={{ color: "black", fontSize: 15, marginLeft: "17%" }}
                                                onDateChange={this.setDateExpirejob}
                                            />
                                            {/* <Image style={{ width: 18, height: 20, marginRight: 20 }}
                                                source={require('../assets/images/calender.png')}
                                                resizeMode="contain"
                                            /> */}
                                            <Entypo name='calendar' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

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

                                    <Button block style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#EC4651', width: "90%", marginHorizontal: "5%" }} onPress={this.update.bind(this)}  >
                                        <Text style={styles.btnTextMargin}>{strInReqLan.update}</Text>
                                    </Button>




                                    // <Button block info style={styl.button} onPress={this.update.bind(this)}>
                                    //     <Text style={styles.btnTextMargin}>{strInReqLan.update}</Text>
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
        index: state.root.index,
        jobListArr: state.root.jobListArr
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        editPost: (updatedPost, type, navigation, date, key) => {
            dispatch(editPost(updatedPost, type, navigation, date, key));
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

export default connect(mapStateToProp, mapDispatchToProp)(EditPost);


const styles = StyleSheet.create({

    contentContainer: {
        paddingBottom: 100,
        backgroundColor: "white",
        // flex: 1
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
        textAlign: "center",
        justifyContent: "center"
        // marginTop: 5

    }


});

const styl = StyleSheet.create({
    // header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 0.5, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { justifyContent: 'center', alignItems: 'center', width: '90%', },
    // input1: { height: "9.5%", width: "100%", borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 5, elevation: 15 },
    // icons: { color: '#2196f3', marginRight: 10 },
    // form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: {
        width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%',
        borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2,
        elevation: 9, marginBottom: 30
    },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})