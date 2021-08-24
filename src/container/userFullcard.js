import React, { Component } from 'react';
import {
    Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View
    , Picker, Left, Right, Spinner, Header, Body, Title, DatePicker, FooterTab, Footer, Tab, Tabs, TabHeading,
} from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';
import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
import LogoImage from '../component/logoImage';
import { createJobData, getJobsList, delPost, } from '../store/action/action';
import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import ImageSlieder from '../component/imageSlider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Moment from 'moment';








class userFullCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        // this.setDateStarting = this.setDateStarting.bind(this);
        // this.setDateExpirejob = this.setDateExpirejob.bind(this);
    }
    // setDateStarting(newDate) {
    //     this.setState({ begginingDate: newDate });
    // }

    // setDateExpirejob(newDate) {
    //     this.setState({ expTermDate: newDate });
    // }


    // componentWillUnmount() {
    //     this.props.errorRemove()
    //     this.setState({
    //         jobListArr: this.props.jobListArr
    //     })
    // }


    deletePost(index) {
        let cloneKey = this.props.jobListArr[index].jobId
        this.props.delPost(cloneKey, this.props.navigation, this.props.jobListArr)

    }

    editPost(index) {
        this.props.navigation.navigate("EditPost")

    }

    render() {




        let viewJob = this.props.navigation.getParam('vewJob');
        viewJob = JSON.parse(viewJob);



        console.log(viewJob, "***********************")
        const uriPath = viewJob.image;


        // viewPr = this.props.navigation.getParam('viewPr');
        // console.log(viewPr, "***********************")

        let viewPr;

        if (this.props.navigation.getParam('viewPr') !== undefined) {


            viewPr = this.props.navigation.getParam('viewPr');

            viewPr = JSON.parse(viewPr);

            let optionNameArr;
            for (var optionNames in viewPr) {
                optionNameArr = viewPr[optionNames];
            }



        }
        else {
            // alert(strInReqLan.pleaseUpdatePr)
            console.log(viewPr, "viewPrrrrrrrr")
        }

        console.log(viewPr, "viewPrrrrrrrr")







        // const uriPathPr = viewPr.prAdditionalDataArr[0].photosUri[0];

        // console.log(uriPath)
        // console.log("primageeeeeeeeeeeee", viewPr, viewJob)

        // console.log(optionNameArr, "optionNameArroptionNameArroptionNameArr")

        // console.log(validSelection,"***")






        // console.log(this.props.navigation.getParam('vewJob'),'////8888888888888',viewJob)
        // console.log(this.props.jobListArr, this.props.index, '**********************', this.props.jobListArr.length >= this.props.index + 1, this.props.jobListArr.length, this.props.index + 1)
        return (

            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.7
                    // ,backgroundColor:"yellow" 
                    
                    }}>
                    <Header androidStatusBarColor="#AE000B"
                        style={{ backgroundColor: '#E61825', }}>
                        <Left>
                            <TouchableOpacity transparent
                                onPress={() => this.props.navigation.goBack()}

                            >
                    
                                <MaterialIcons name='arrow-back' style={{ marginRight: 20, fontSize: 35, color: "white" }} />

                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ marginLeft: "8%", fontWeight: "bold" }}>{strInReqLan.view}</Title>
                        </Body>

                    </Header>

                </View>


                {/* ******************************************* */}
                {/* <Container> */}
                {/* <Header hasTabs /> */}
                <Tabs
                    // tabBarUnderlineStyle={{borderBottomWidth:2}} 
                    style={{
                        flex: 8,
                        //  marginTop: -8

                        // backgroundColor: "yellow"

                    }}
                >
                    <Tab heading={strInReqLan.jobService} tabStyle={{ backgroundColor: '#E61825' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#E61825' }} activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>



                        <View style={{ flex: 8, backgroundColor: "white" }}>

                            <View style={{ marginTop: "2%" }} >
                                {
                                    (this.props.allJobListArr.length >= this.props.index + 1) ? (
                                        <View style={{ backgroundColor: "white" }}>
                                            {
                                                (viewJob.type === strInReqLan.createNewAdmServices) ?
                                                    (

                                                        <ScrollView contentContainerStyle={styles.contentContainer} >
                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.type}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/service-logo-blue.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='user-cog' style={{ marginRight: 20, fontSize: 12, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.serTitle}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/jobTitle.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.serStatus}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/statusblue.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='check-circle-outline' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.serEmail}</Text>
                                                                {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                                    source={require('../assets/images/emailblueios.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='email' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.serResName}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/master_icon.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.inputForService}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.serResNum}</Text>
                                                                {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                                    source={require('../assets/images/telephonelogo.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.inputForSignForService}>
                                                                <Text style={{ textDecorationLine: "underline", fontSize: 15, marginHorizontal: "3%" }}>{strInReqLan.signature}</Text>


                                                                <Image style={{ width: 280, height: 100, marginLeft: 25 }}
                                                                    source={{ uri: uriPath }}
                                                                    resizeMode="contain"
                                                                />
                                                            </Item>






                                                        </ScrollView>

                                                    )
                                                    :

                                                    (

                                                        <ScrollView contentContainerStyle={styles.contentContainer} >




                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.type}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/service-logo-blue.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='user-cog' style={{ marginRight: 20, fontSize: 12, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.jobTitle}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/jobTitle.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.status}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/statusblue.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='check-circle-outline' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.email}</Text>
                                                                {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                                                    source={require('../assets/images/emailblueios.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='email' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.responsibleName}</Text>
                                                                {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                                    source={require('../assets/images/master_icon.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.responsibleNumber}</Text>
                                                                {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                                    source={require('../assets/images/telephonelogo.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.input}>
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{viewJob.contractNoOfJob}</Text>
                                                                {/* <Image style={{ width: 22, height: 50, marginRight: 20 }}
                                                                    source={require('../assets/images/jobqty.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Icon name='numeric' style={{ marginRight: 20, fontSize: 15, color: "white", borderRadius: 100, backgroundColor: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={{ justifyContent: "space-between", height: "16%", marginLeft: "5%", marginRight: "5%" }}  >

                                                                <Text style={{ width: "80%", marginHorizontal: "3%" }} >{viewJob.address}</Text>
                                                                <Right>
                                                                    {/* <Image style={{ width: 20.8, height: 25, marginRight: 20, }}
                                                                        source={require('../assets/images/address.png')}
                                                                        resizeMode="contain"
                                                                    /> */}
                                                                    <Entypo name='location' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                                </Right>
                                                            </Item>
                                                            <Item style={styl.input} >
                                                                {/* <Text>{this.props.jobListArr[this.props.index].begginingDate}</Text> */}
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{Moment(viewJob.begginingDate).format('ddd DD MMM YY')}</Text>
                                                                {/* <Image style={{ width: 18, height: 20, marginRight: 20 }}
                                                                    source={require('../assets/images/calender.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Entypo name='calendar' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>
                                                            <Item style={styl.input} >
                                                                {/* <Text>{this.props.jobListArr[this.props.index].expTermDate}</Text> */}
                                                                <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{Moment(viewJob.expTermDate).format('ddd DD MMM YY')}</Text>
                                                                {/* <Image style={{ width: 18, height: 20, marginRight: 20 }}
                                                                    source={require('../assets/images/calender.png')}
                                                                    resizeMode="contain"
                                                                /> */}
                                                                <Entypo name='calendar' style={{ marginRight: 20, fontSize: 15, color: "#2D669A" }} />

                                                            </Item>

                                                            <Item style={styl.inputForSign}>
                                                                <Text style={{ textDecorationLine: "underline", fontSize: 15, marginHorizontal: "3%" }}>{strInReqLan.signature}</Text>


                                                                <Image style={{ width: 280, height: 100, marginLeft: 25 }}
                                                                    source={{ uri: uriPath }}
                                                                    resizeMode="contain"
                                                                />
                                                            </Item>




                                                        </ScrollView>)
                                            }
                                        </View>


                                    ) : null
                                }

                                {/* {
    (this.props.isLoader === true) ?
        (
            <Loading />
        ) :
        (
            <Button block info style={styl.button} >
                <Text style={styles.btnTextMargin}>{strInReqLan.submitPost}</Text>
            </Button>
        )
} */}
                                {
                                    (this.props.isError === true) ? (
                                        <ErrorMessage errorMessge={this.props.errorMessage}></ErrorMessage>
                                    ) : null
                                }





                            </View>

                        </View>
                        {/* <View style={{ flex: 1, backgroundColor: "#E61825" }}>
                            <Footer>
                                <FooterTab style={{ backgroundColor: "#E61825", }}>
                                    <Button vertical onPress={() => this.props.navigation.navigate("EditPost", { vewJob: JSON.stringify(viewJob) })} >
                                        <Image style={{ width: 23, height: 23, }}
                                            source={require('../assets/images/editwhite.png')}
                                            resizeMode="contain"
                                        />
                                    </Button>
                                    <Button vertical onPress={this.deletePost.bind(this, this.props.index)}>
                                        <Image style={{ width: 23, height: 23, }}
                                            source={require('../assets/images/deleteicon.png')}
                                            resizeMode="contain"
                                        />
                                    </Button>
                                </FooterTab>
                            </Footer>
                        </View> */}

                    </Tab>



                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}
                    {/* **************************************************pre registration************************************************** */}



                    <Tab heading={strInReqLan.preregistration} tabStyle={{ backgroundColor: '#E61825' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#E61825' }} activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>

                        {
                            <ScrollView contentContainerStyle={styles.contentContainerForPr}
                                style={{ marginTop: "5%" }}
                            >
                                {

                                    (viewPr !== undefined) ?

                                        (Object.keys(viewPr).map((optionName, index) => {
                                            let optionValues = viewPr[optionName];
                                            console.log(viewPr, 'optionname************', optionValues)
                                            if (optionName !== "prAdditionalDataArr") {
                                                if (optionName === "MATERIAL" || optionName === "MATERIAL") {
                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?
                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                                <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName}</Text>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    ('prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].amountOfMaterial) ? (
                                                                        <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].amountOfMaterial}</Text>

                                                                    ) : (
                                                                            null

                                                                        )
                                                                }
                                                            </View> : null
                                                    )
                                                }
                                                else if (optionName === "TEAM" || optionName === "EQUIPE") {
                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?
                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                                <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName}</Text>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    ('prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].amountOfTeam) ? (
                                                                        <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].amountOfTeam}</Text>

                                                                    ) : (
                                                                            null

                                                                        )
                                                                }
                                                            </View> : null
                                                    )
                                                }
                                                else if (optionName === "WHICH SAFETY EQUIPMENT IS NEEDED" || optionName === "QUAL EQUIPAMENTO DE SEGURANÇA É NECESSÁRIO") {
                                                    console.log(optionName, "**************/////////////")

                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?

                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                                <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        console.log(option.optionName, "/*/*/")
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName}</Text>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    ('prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].amountOfwhichSafetyEquipment) ? (
                                                                        <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].amountOfwhichSafetyEquipment}</Text>

                                                                    ) : (
                                                                            null

                                                                        )
                                                                }
                                                            </View> : null

                                                    )
                                                }
                                                else if (optionName === "WHICH TOOL IS NEEDED" || optionName === "QUAL FERRAMENTA É NECESSÁRIA") {


                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?

                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                                <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName}</Text>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    ('prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].amountOfwhichToolIsNeeded) ? (
                                                                        <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].amountOfwhichToolIsNeeded}</Text>

                                                                    ) : (
                                                                            null

                                                                        )
                                                                }
                                                            </View> : null

                                                    )
                                                }



                                                else if (optionName === "WHICH EQUIPMENT IS NEEDED" || optionName === "QUAL EQUIPAMENTO É NECESSÁRIO") {


                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?

                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                                <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName}</Text>
                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }

                                                                {
                                                                    ('prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].amountOfwhichEquipmentIsNeeded) ? (
                                                                        <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].amountOfwhichEquipmentIsNeeded}</Text>

                                                                    ) : (
                                                                            null

                                                                        )
                                                                }
                                                            </View> : null

                                                    )
                                                }
                                                else {

                                                    var showOption = false;
                                                    for (var i = 0; i < optionValues.length; i++) {
                                                        let dropdownOption = optionValues[i];
                                                        if (dropdownOption.selected === true) {
                                                            showOption = true;
                                                        }
                                                    }

                                                    return (

                                                        (showOption === true) ?

                                                            <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }} >


                                                                <View>
                                                                    <Text style={{ marginBottom: "1%" }}>{optionName}: </Text>
                                                                </View>

                                                                {
                                                                    optionValues.map((option, index) => {
                                                                        return (
                                                                            (option.selected === true) ?
                                                                                <View>

                                                                                    <Text style={{ color: "gray", fontSize: 13 }} key={index}>{option.optionName.toLowerCase()}</Text>
                                                                                </View>

                                                                                :
                                                                                null

                                                                        )
                                                                    })
                                                                }
                                                            </View > : null


                                                    )
                                                }

                                            }
                                            else {
                                                return null;
                                            }
                                        })) : null}

                                <View>
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] && viewPr.prAdditionalDataArr[0].dateAndTimeStart &&
                                            viewPr.prAdditionalDataArr[0].dateAndTimeEnd) ?
                                            (

                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    {/* <Text>Hello</Text> */}
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.dateOfBeggingOfTheOccurrence}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].dateAndTimeStart}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        //cut kia hun && viewPr.prAdditionalDataArr[0].dateAndTimeStart 

                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].dateAndTimeEnd) ?
                                            (

                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.dateOfEndOfTheOccurrence}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].dateAndTimeEnd}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        //cut kia hun && viewPr.prAdditionalDataArr[0].dateAndTimeStart 
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].serviceYouHaveDone) ?
                                            (

                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.serviceYouHaveDone}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].serviceYouHaveDone}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].customersOsNumber) ?
                                            (

                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.customersOsNumber}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].customersOsNumber}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].codeOrOmFromTheCustomer) ?
                                            (


                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.codeOrOmFromTheCustomer}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].codeOrOmFromTheCustomer}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].requestedService) ?
                                            (



                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.requestedService}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].requestedService}</Text>
                                                </View>


                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].discribeWhenMarkedAbove) ?
                                            (




                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.discribeWhenMarkedAbove}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].discribeWhenMarkedAbove}</Text>
                                                </View>


                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].reportTheCID) ?
                                            (
                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.reportTheCID}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].reportTheCID}</Text>
                                                </View>


                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].reportTheDates) ?
                                            (

                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.reportTheDates}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].reportTheDates}</Text>
                                                </View>


                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].reportTheDatesCompensate) ?
                                            (


                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.reportTheDatesCompensate}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].reportTheDatesCompensate}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].kmReport) ?
                                            (



                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.kmReport}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].kmReport}</Text>
                                                </View>
                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].overtimeReason) ?
                                            (


                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.overtimeReason}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].overtimeReason}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                    {
                                        (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                            viewPr.prAdditionalDataArr[0].generalObservations) ?
                                            (


                                                <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", marginLeft: "5%", padding: 10 }}>
                                                    <Text style={{ marginBottom: "1%" }}>{strInReqLan.generalObservations}: </Text>

                                                    <Text style={{ color: "gray", fontSize: 13 }}>{viewPr.prAdditionalDataArr[0].generalObservations}</Text>
                                                </View>

                                            ) :
                                            null
                                    }
                                </View>

                                {
                                    //cuttttt
                                    (viewPr && viewPr !== undefined && 'prAdditionalDataArr' in viewPr && viewPr.prAdditionalDataArr && viewPr.prAdditionalDataArr.length > 0 && viewPr.prAdditionalDataArr[0] &&
                                        viewPr.prAdditionalDataArr[0].photosUri) ?
                                        (


                                            // <View style={{ borderBottomWidth: 0.4, borderBottomColor: "gray", width: "90%", height: 300, marginLeft: "5%", padding: 10 ,}}>
                                            // console.log("urllllllllllllllllllllllllllllllll",
                                            // viewPr.prAdditionalDataArr[0].photosUri)
                                            <View style={{ width: "90%", marginHorizontal: "5%" }}>

                                                <ImageSlieder imageArr={viewPr.prAdditionalDataArr[0].photosUri} />
                                            </View>
                                            /* </View>
                                    viewPr.prAdditionalDataArr[0].photosUri.map((url, index) => {


                                        console.log(url,"urllllllllllllllllllllllllllllllll",
                                        viewPr.prAdditionalDataArr[0].photosUri)
                                        return (



                                        )
                                    }) */

                                        ) :
                                        null
                                }





                            </ScrollView>




                        }
                    </Tab>

                </Tabs>
                {/* </Container> */}





















            </View>






        );
    }
}
// joblitarry[this.props.index].servicenumber

function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        index: state.root.index,
        jobListArr: state.root.jobListArr,
        allJobListArr: state.root.allJobListArr
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
        delPost: (cloneKey, navigate, jobListArr) => {
            dispatch(delPost(cloneKey, navigate, jobListArr));
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(userFullCard);


const styles = StyleSheet.create({

    contentContainer: {
        paddingBottom: 180,
        backgroundColor: "white",
        marginTop: "0%"

    },
    contentContainerForPr: {
        // paddingBottom: 700,
        backgroundColor: "white",
        marginTop: "0%"

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
        marginTop: 0

    }


});

const styl = StyleSheet.create({
    input: { justifyContent: "space-between", height: "9.2%", marginLeft: "5%", marginRight: "5%" },
    inputForSign: { justifyContent: "space-between", height: "35%", marginLeft: "5%", marginRight: "5%" },
    inputForSignForService: { justifyContent: "space-between", height: "52%", marginLeft: "5%", marginRight: "5%" },
    inputForService: { justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    inputText: { fontSize: 15, },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '20%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})