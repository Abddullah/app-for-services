import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail, View, searchBar, Title, Left, Right, } from 'native-base';
import {
    FooterTab, Footer, Tab, Tabs, TabHeading,
} from 'native-base';


import { Image, style, Platform, TouchableOpacity, ScrollView, BackHandler, ActivityIndicator } from 'react-native';
// import { Footer, FooterTab, Icon, Fab } from 'native-base';
import { Header, Card, CardItem, Body } from "native-base";

import * as firebase from 'firebase'
import LogoImage from '../component/logoImage';
import strInReqLan from "../store/config/config";
import {
    StyleSheet,

} from 'react-native';
import Modal from "react-native-modal";
import Loading from "../component/loader";

import { connect } from 'react-redux';
import { getJobsList, setIndex, logOut, loaderStart } from '../store/action/action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';



class CompanyHome extends Component {

    constructor() {
        super()
        this.state = {
            prCloneState: {},
            jobListArr: [],
            flagForBackHandler: true,
            delIsModalVisible: false,


        }
    }

    componentWillUnmount() {

        // if (this.state.flagForBackHandler === true) {
        //     BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
        // }
    }

    // componentWillMount() {
    //     this.props.getJobsList()

    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps, "addaadadda")
    //     this.setState({
    //         jobListArr: nextProps.jobListArr
    //     })




    // }

    //  _DeltoggleModal = () =>
    //  _DeltoggleModal = () =>
    //     this.setState({ delIsModalVisible: !this.state.delIsModalVisible });

    viewPost(index) {

        this.props.loaderStart()


        console.log(this.props.ALLREPORTS, "alll reporttss")


        let jobKeys = this.props.jobkeys[index]
        // console.log(this.props.objPreRegistration)
        console.log(jobKeys, "454545")





        var prClone;
        if (this.props.objPreRegistration !== null) {
            prClone = this.props.objPreRegistration[jobKeys]
            this.props.setIndex(index, this.props.navigation, this.props.jobListArr[index], jobKeys, prClone)

        }
        // if (this.props.objPreRegistration !== null) {
        //     prClone = this.props.objPreRegistration[jobKeys]
        //     this.props.setIndex(index, this.props.navigation, this.props.jobListArr[index], prClone,jobKeys)

        // }


        else {
            console.log(index, this.props.navigation, this.props.jobListArr[index], jobKeys, "dabbu")
            this.props.setIndex(index, this.props.navigation, this.props.jobListArr[index], jobKeys)
        }


        // console.log(jobKeys,"jobkeysssssssss")
        // console.log(prClone,"prClonerrrrr")


        // if (prClone === null) {
        //     this.props.setIndex(index, this.props.navigation, this.props.jobListArr[index])

        // }
        // else {

        //     this.props.setIndex(index, this.props.navigation, this.props.jobListArr[index], prClone)
        // }

        // _DeltoggleModal = () =>
        // this.setState({ delIsModalVisible: !this.state.delIsModalVisible });

    }
    logOut() {
        this.setState({
            flagForBackHandler: false
        })
        // alert(index)
        // this.props.navigation.navigate("FullCard")
        this.props.logOut(this.props.navigation)
    }

    render() {
        console.log(this.props.allReportsArr, "alll reporttss")

        // console.log(this.state.jobListArr.type === strInReqLan.createNewJob)

        return (
            <View style={styles.container}>
                <View style={styles.cardFlex}>
                    <Header androidStatusBarColor="#AE000B"
                        style={{ backgroundColor: '#E61825' }}>
                        {/* <Left>
                            <TouchableOpacity transparent>

                                <Image style={{ width: 50, height: 25 }}
                                    source={require('../assets/images/backarrow.png')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </Left> */}
                        <Body>
                            <Title style={{ marginLeft: "5%", fontWeight: "bold" }}>{strInReqLan.feeds}</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.logOut.bind(this)}>
                                {/* <Image source={require('../../src/assets/images/logout.png')} resizeMode="contain"
                                    style={{ height: 30, width: 30 }}
                                /> */}

                                <Icon name='logout' style={{ marginRight: 7, fontSize: 22, color: "white" }} />
                            </Button>
                        </Right>
                    </Header>



                    <ScrollView contentContainerStyle={styles.contentContainer}
                    // stickyHeaderIndices={[0]}
                    >



                        <Content padder >

                            {this.props.jobListArr.map((jobListArr, index) => {
                                console.log(this.props.jobListArr, "asasasasasas", jobListArr)

                                return (
                                    <Card key={index} >
                                        <TouchableOpacity onPress={this.viewPost.bind(this, index)}>

                                            <CardItem style={{ borderColor: "black", borderBottomWidth: 0.5, }}>
                                                <Left>
                                                    <Image source={require('../../src/assets/images/jobTitle.png')} resizeMode="contain"
                                                        style={{ height: 50, width: 50 }}
                                                    />
                                                    <Body>
                                                        {
                                                            (jobListArr.type === "Empregos" || jobListArr.type === "Jobs")
                                                                ?

                                                                (<View>
                                                                    <Text>{strInReqLan.jobTitle}</Text><Text note>{jobListArr.jobTitle}</Text>
                                                                </View>) :
                                                                (<View>
                                                                    <Text>{strInReqLan.serTitle}</Text><Text note>{jobListArr.serTitle}</Text>
                                                                </View>)
                                                        }
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem >
                                                <Left>
                                                    {/* <Image source={require('../../src/assets/images/service-logo.png')} resizeMode="contain"
                                                        style={{ height: 30, width: 25 }}
                                                    /> */}


                                                    <FontAwesome5 name='user-cog' style={{ marginRight: 20, fontSize: 16, color: "#F05760" }} />

                                                    <Body>
                                                        <Text note>{jobListArr.type}</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem >
                                                <Left>
                                                    {/* <Image source={require('../../src/assets/images/telephonelogo1.png')} resizeMode="contain"
                                                        style={{ height: 25, width: 25 }}
                                                    /> */}
                                                    <FontAwesome5 name='phone-square' style={{ marginRight: 20, fontSize: 18, color: "#F05760" }} />

                                                    <Body>
                                                        {
                                                            (jobListArr.type === "Empregos" || jobListArr.type === "Jobs") ?
                                                                (<View>
                                                                    <Text note>{jobListArr.responsibleNumber}</Text>
                                                                </View>) :
                                                                (<View>
                                                                    <Text note>{jobListArr.serResNum}</Text>
                                                                </View>)
                                                        }
                                                        {/* <Text note>{jobListArr.responsibleNumber}</Text> */}
                                                    </Body>

                                                </Left>
                                            </CardItem>
                                            <CardItem >
                                                <Left>
                                                    {/* <Image source={require('../../src/assets/images/status.png')} resizeMode="contain"
                                                        style={{ height: 25, width: 25 }}
                                                    /> */}
                                                    <Icon name='check-circle-outline' style={{ marginRight: 20, fontSize: 20, color: "#F05760" }} />

                                                    <Body>
                                                        {
                                                            (jobListArr.type === "Empregos" || jobListArr.type === "Jobs") ?
                                                                (
                                                                    <Text note>{jobListArr.status}</Text>
                                                                ) :
                                                                (
                                                                    <Text note>{jobListArr.serStatus}</Text>
                                                                )
                                                        }

                                                    </Body>

                                                </Left>
                                            </CardItem>
                                        </TouchableOpacity>
                                        <CardItem >
                                            <Button block info style={styl.button} onPress={this.viewPost.bind(this, index)}>
                                                <Text style={styles.btnTextMargin}>{strInReqLan.view}</Text>
                                            </Button>
                                        </CardItem>
                                    </Card>
                                )
                            })
                            }

                        </Content>
                    </ScrollView>
                </View>

                {/* <View style={{ flex: 1, backgroundColor: "#E61825" }}> */}
                <Footer  style={{ backgroundColor: "#E61825"  }}>
                    <FooterTab style={{backgroundColor: "#E61825",marginHorizontal:12  }}>
                        <TouchableOpacity style={{ flex: 0.3, }} onPress={() => this.props.navigation.push("CreateJobs")}>
                            <View style={styles.profile}>
                                <Image style={{ backgroundColor: 'transparent', height: "100%", width: "100%" }} source={require('../../src/assets/images/addjoblogo.png')} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 0.3 }} onPress={() => this.props.navigation.push("preRegistration")}>
                            <View style={styles.profile}>
                                <Image style={{ backgroundColor: 'transparent', height: "70%", width: "70%" }} source={require('../../src/assets/images/register-logo.png')} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1 }} >
                            <View style={styles.pin}>
                                <Image style={{ height: 19, width: 12.5 }} resizeMode="contain" source={require('../../src/assets/images/search_iconx.png')} />
                                <Text style={{ fontSize: 14, color: '#b3b3b3', marginLeft: 12 }}>{strInReqLan.search}</Text>
                            </View>
                        </TouchableOpacity>

                    </FooterTab>
                </Footer>
                {/* </View> */}

                {/* <View style={{flex:1}}>
                    <TouchableOpacity style={{ flex: 0.5, marginLeft: '5%' }} onPress={() => this.props.navigation.push("CreateJobs")}>
                        <View style={styles.profile}>
                            <Image style={{ backgroundColor: 'transparent', height: "100%", width: "100%" }} source={require('../../src/assets/images/addjoblogo.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.5, marginLeft: '1%' }} onPress={() => this.props.navigation.push("preRegistration")}>
                        <View style={styles.profile}>
                            <Image style={{ backgroundColor: 'transparent', height: "70%", width: "70%" }} source={require('../../src/assets/images/register-logo.png')} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1.1, marginRight: '30%' }} >
                        <View style={styles.pin}>
                            <Image style={{ height: 19, width: 12.5 }} resizeMode="contain" source={require('../../src/assets/images/search_iconx.png')} />
                            <Text style={{ fontSize: 14, color: '#b3b3b3', marginLeft: 12 }}>{strInReqLan.search}</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}



                {/* <View style={styles.Footer}>
                    <TouchableOpacity style={{ flex: 0.5, marginLeft: '5%' }} onPress={() => this.props.navigation.push("CreateJobs")}>
                        <View style={styles.profile}>
                            <Image style={{ backgroundColor: 'transparent', height: "100%", width: "100%" }} source={require('../../src/assets/images/addjoblogo.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.5, marginLeft: '1%' }} onPress={() => this.props.navigation.push("preRegistration")}>
                        <View style={styles.profile}>
                            <Image style={{ backgroundColor: 'transparent', height: "70%", width: "70%" }} source={require('../../src/assets/images/register-logo.png')} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1.1, marginRight: '30%' }} >
                        <View style={styles.pin}>
                            <Image style={{ height: 19, width: 12.5 }} resizeMode="contain" source={require('../../src/assets/images/search_iconx.png')} />
                            <Text style={{ fontSize: 14, color: '#b3b3b3', marginLeft: 12 }}>{strInReqLan.search}</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}










                {/* <Modal isVisible={this.state.delIsModalVisible}
                    backdropColor="black"
                    backdropOpacity={0.83}
                // style={{ backgroundColor: "red", flex: 1 }}
                >

                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress={this._DeltoggleModal.bind(this)}>

                            <Text>
                                hello moto5555555555555555555555
                        </Text>
                        </TouchableOpacity>

                    </View>
                </Modal> */}







                {(this.props.isLoader === true) ? (



                    <View style={{ position: "absolute", backgroundColor: 'rgba(0, 0, 0, 0.5)', width: "100%", height: "100%", justifyContent: "center" }}>
                        {/* <Text style={{textAlign:"center",}}>
                            Loading
                      </Text> */}
                        <ActivityIndicator style={{ flex: 1.5 }} size={40} color="white" />
                        {/* <View style={{ marginTop: "25%" }}>
                            <Loading  />
                        </View> */}
                    </View>



                ) :
                    (null)}



            </View>
        );
    }
}


function mapStateToProp(state) {
    return ({
        jobListArr: state.root.jobListArr,
        objPreRegistration: state.root.objPreRegistration,
        jobkeys: state.root.jobkeys,
        allReportsArr: state.root.allReportsArr,
        isLoader: state.root.isLoader

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getJobsList: () => {
            dispatch(getJobsList());
        },
        setIndex: (index, navigation, jobView, jobKeys, prClone, ) => {
            dispatch(setIndex(index, navigation, jobView, jobKeys, prClone));
        },
        logOut: (navigation) => {
            dispatch(logOut(navigation));
        },
        loaderStart: () => {
            dispatch(loaderStart());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(CompanyHome);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    contentContainer: {
        paddingBottom: 20,
        backgroundColor: "white",
        // opacity: 1
        // flex: 1
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
        color: '#66CCCC',
        textAlign: 'center',
        marginTop: 15
    },

    btnTextMargin: {
        fontWeight: 'bold',

    },
    headerStyle: {
        fontWeight: 'bold',
        color: "red"

    },

    // Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "rgba(0,0,0,0.1)", flexDirection: 'row' },
    // fotterMainContainer: {
    //     // color: 'white',
    //     // fontWeight: "bold"
    //     // backgroundColor: "blue",
    //     flex: 0.2
    // },
    // fotterChildContainer: {
    //     // color: 'white',
    //     // fontWeight: "bold"
    //     // flex: 0.5,
    //     height: "60%",
    //     backgroundColor: "red",
    //     marginTop: "12%",
    //     // marginLeft: "7%",

    // },


    cardFlex: {
        // color: 'white',
        // fontWeight: "bold"

        flex: 1
    }
    ,



    header: { backgroundColor: "white", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 56, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    logo: { width: 72, height: 35, marginLeft: 20, marginTop: 8, resizeMode: 'contain' },
    masterBack: { height: 30, width: 94 },
    gameBack: { height: 30, width: 60, marginLeft: 12 },
    masterIcon: { position: "absolute", width: 15, height: Platform.OS === 'ios' ? 16 : 15, marginHorizontal: 10 },
    learnerIcon: { width: 98, height: Platform.OS === 'ios' ? 34 : 34, marginHorizontal: 2, marginVertical: 3, marginTop: 5 },
    expertIcon: { width: 94, height: Platform.OS === 'ios' ? 34 : 34, marginHorizontal: 2, marginVertical: 3, marginTop: 5 },

    gameIcon: { position: "absolute", width: 15, height: Platform.OS === 'ios' ? 11 : 11, marginLeft: 23 },
    Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "red", flexDirection: 'row', },
    profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 2.5, },
    searchBox: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
    dialog: { backgroundColor: '#ffffff', paddingBottom: 0, paddingTop: 0, marginTop: 0 },
    circle: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
    pin: { backgroundColor: '#ffffff', borderColor: "#E61825", borderWidth: 0.5, width: "100%", height: 50, borderRadius: 52, justifyContent: 'center', alignItems: 'center', top: 2.5, bottom: 0, }


});

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 10, elevation: 15 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { borderRadius: 52, width: '80%', backgroundColor: '#004D94', marginLeft: '10%', marginRight: '5%', borderColor: '#004D94', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 15 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})