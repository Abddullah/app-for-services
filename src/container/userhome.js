import React, { Component } from 'react';
import {
    Container, Button, Text, Content, Form, Item, Input, Label, Alert, Thumbnail,
    View, searchBar, Title, Left, Right, Tab, Tabs
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
import { connect } from 'react-redux';
import { getJobsListInUser, setIndex, logOut, report, setIndexForUser, deleteReport, loaderStart, prClone } from '../store/action/action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Report from '../container/report';
import Loading from '../component/loader';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';




class UserHome extends Component {

    constructor() {
        super()
        this.state = {
            prCloneState: {},
            allJobListArr: [],
            allReportsArr: [],
            flagForDetReport: true,
            flagForBackHandler: true,
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         flag:!this.state.flag
    //     })
    // }
    // componentWillMount() {
    //     this.props.getJobsListInUser()

    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.allJobListArr, "nextttttttttttttttt")
    //     console.log(nextProps.allReportsArr, "allReporallReportsArrtsArr")
    //     this.setState({
    //         allReportsArr: nextProps.allReportsArr,
    //         allJobListArr: nextProps.allJobListArr,
    //     })

    // }
    componentWillUnmount() {
        if (this.state.flagForBackHandler === true) {
            BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
        }
    }

    viewPost(index) {
        this.props.loaderStart();


        let jobKeys = this.props.allJobkeys[index]
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        var prClone;
        if (isEmpty(this.props.objAllPreRegistration) === false) {
            prClone = this.props.objAllPreRegistration[jobKeys]

            setTimeout(() => {
                this.props.setIndexForUser(index, this.props.navigation, this.props.allJobListArr[index], prClone)
            }, 50)



            console.log("if")
        }


        else {
            console.log("else")
            setTimeout(() => {
                this.props.setIndexForUser(index, this.props.navigation, this.props.allJobListArr[index])

            }, 50)

        }




    }
    logOut() {

        this.setState({
            flagForBackHandler: false
        })
        this.props.logOut(this.props.navigation)
    }
    notification() {

        alert("there is no notification as of now")
        // this.props.navigation.navigate("FullCard")
        // this.props.logOut(this.props.navigation)
    }
    deleteReport(index, reportKey, jobkeys) {
        let cloneReport = this.props.allReportsArr
        console.log(index, reportKey, jobkeys, "deleettttt")
        this.props.deleteReport(index, reportKey, jobkeys, cloneReport, this.props.navigation)
        // this.props.navigation.navigate("FullCard")
        // this.props.logOut(this.props.navigation)
        this.setState({
            flagForDetReport: !this.state.flagForDetReport
        })
    }
    report(index, navigation, Title, type) {

        console.log(index, navigation, Title, "ganji")


        // var prClone;
        // if (this.props.objAllPreRegistration !== null) {
        //     prClone = this.props.objAllPreRegistration

        // }
        // console.log(prClone, "prclone")



        let jobKeys = this.props.allJobkeys[index]

        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }



        var prClone;
        if (isEmpty(this.props.objAllPreRegistration) === false) {
            prClone = this.props.objAllPreRegistration[jobKeys]
            this.props.report(index, navigation, Title, type, prClone)
            // console.log("if", this.props.objAllPreRegistration, isEmpty(this.props.objAllPreRegistration))

        }


        else {
            this.props.report(index, navigation, Title, type)
            // console.log("else")

        }






    }


    Capitalize(str) {
        console.log(str, "strrrrrrr")
        if (str !== undefined) {

            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        // console.log(str, "strrrrrrr")
    }

    render() {
        // console.log(this.props.allReportsArr, "ALLREPORTSALLREPORTS", this.state.flag)
        // this.setState({
        //     flag:this.state.flag
        //     !state.isLoader
        // })
        // console.log(this.props.allReportsArr, "kkkkkkkkkkkkk")
        // console.log(this.props.allJobListArr[0], "sffsfssffs", )

        // console.log(this.state.jobListArr.type === strInReqLan.createNewJob)
        // console.log(this.state.allJobListArr, "555555555555")

        return (

            <View style={styles.container}>
                {(this.props.isLoader === true) ? (



                    <View style={{ position: "absolute", zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: "100%", height: "100%", justifyContent: "center" }}>
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
                                    <Title style={{ marginLeft: "5%", fontWeight: "bold" }}>{strInReqLan.feeds} </Title>
                                </Body>
                                <Right>
                                    <Button transparent style={{}} onPress={this.notification.bind(this)}>
                                        {/* <Image source={require('../../src/assets/images/logout.png')} resizeMode="contain"
                                    style={{ height: 30, width: 30 }}
                                /> */}

                                        <Icon name='bell' style={{ marginRight: -10, fontSize: 22, color: "white" }} />
                                    </Button>
                                    <Button transparent onPress={this.logOut.bind(this)}>
                                        {/* <Image source={require('../../src/assets/images/logout.png')} resizeMode="contain"
                                    style={{ height: 30, width: 30 }}
                                /> */}

                                        <Icon name='logout' style={{ fontSize: 22, color: "white" }} />
                                    </Button>
                                </Right>
                            </Header>


                            <Tabs
                                style={{ flex: 8, marginTop: -8 }}
                            >
                                <Tab heading={strInReqLan.jobService} tabStyle={{ backgroundColor: '#E61825' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#E61825' }} activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>

                                    <ScrollView contentContainerStyle={styles.contentContainer}>

                                        <Content padder>
                                            {
                                                // Object.keys(this.state.allJobListArr).map((item, index) => {
                                                console.log(this.state.allJobListArr, "itemitemitemitem")
                                                // })
                                            }
                                            {this.props.allJobListArr.map((allJobListArr, index) => {
                                                console.log(allJobListArr, "individual", this.state.allJobListArr)
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
                                                                            (allJobListArr.type === "Empregos" || allJobListArr.type === "Jobs")
                                                                                ?

                                                                                (<View>
                                                                                    <Text>{strInReqLan.jobTitle}</Text><Text note>{allJobListArr.jobTitle}</Text>
                                                                                </View>) :
                                                                                (<View>
                                                                                    <Text>{strInReqLan.serTitle}</Text><Text note>{allJobListArr.serTitle}</Text>
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
                                                                        <Text note>{allJobListArr.type}</Text>
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
                                                                            (allJobListArr.type === "Empregos" || allJobListArr.type === "Jobs") ?
                                                                                (<View>
                                                                                    <Text note>{allJobListArr.responsibleNumber}</Text>
                                                                                </View>) :
                                                                                (<View>
                                                                                    <Text note>{allJobListArr.serResNum}</Text>
                                                                                </View>)
                                                                        }
                                                                    </Body>

                                                                </Left>
                                                            </CardItem>
                                                            <CardItem >
                                                                <Left>
                                                                    {/* <Image source={require('../../src/assets/images/status.png')} resizeMode="contain"
                                                                        style={{ height: 25, width: 25 }}
                                                                    /> */}

                                                                    <Icon name='check-circle-outline' style={{ marginRight: 20, fontSize: 21, color: "#F05760" }} />

                                                                    <Body>
                                                                        {
                                                                            (allJobListArr.type === "Empregos" || allJobListArr.type === "Jobs") ?
                                                                                (
                                                                                    <Text note>{allJobListArr.status}</Text>
                                                                                ) :
                                                                                (
                                                                                    <Text note>{allJobListArr.serStatus}</Text>
                                                                                )
                                                                        }

                                                                    </Body>

                                                                </Left>
                                                            </CardItem>
                                                        </TouchableOpacity>

                                                        <CardItem >
                                                            {
                                                                (allJobListArr.type === "Empregos" || allJobListArr.type === "Jobs") ?
                                                                    (<Button block info style={styl.button} onPress={this.report.bind(this, index, this.props.navigation, allJobListArr.jobTitle, allJobListArr.type)} >
                                                                        <Text style={styles.btnTextMargin}>{strInReqLan.Report}</Text>
                                                                    </Button>

                                                                    )
                                                                    :
                                                                    (
                                                                        <Button block info style={styl.button} onPress={this.report.bind(this, index, this.props.navigation, allJobListArr.serTitle, allJobListArr.type)} >
                                                                            <Text style={styles.btnTextMargin}>{strInReqLan.Report}</Text>
                                                                        </Button>

                                                                        // <Text style={styles.btnTextMargin}>{strInReqLan.Report}</Text>
                                                                    )
                                                            }

                                                        </CardItem>
                                                    </Card>
                                                )
                                            })
                                            }

                                        </Content>
                                    </ScrollView>



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

                                </Tab>
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                {/* </Report> */}
                                <Tab heading={strInReqLan.Report} tabStyle={{ backgroundColor: '#E61825' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#E61825' }} activeTextStyle={{ color: '#fff', fontWeight: 'normal' }}>

                                    <ScrollView contentContainerStyle={{
                                        paddingBottom: "2%",
                                        backgroundColor: "white",
                                        paddingHorizontal: "2%",
                                        paddingVertical: "1%",
                                    }}>

                                        {this.props.allReportsArr.map((allReportsArr, index) => {



                                            console.log(allReportsArr, index, "khar")
                                            return (
                                                <View style={styles.reportCard} key={index}>
                                                    <TouchableOpacity onPress={this.deleteReport.bind(this, index, allReportsArr.reportKey, allReportsArr.jobkeys)}>

                                                        <Icon name='close' style={{ marginVertical: "1.5%", marginHorizontal: "-2.5%", textAlign: 'right', fontSize: 22, color: "red", }}

                                                        />
                                                    </TouchableOpacity>



                                                    <Item style={{ justifyContent: "space-between", height: 30 }} >


                                                        <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{allReportsArr.type}</Text>
                                                        {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                            source={require('../assets/images/service-logo-blue.png')}
                                                            resizeMode="contain"
                                                        /> */}
                                                        <FontAwesome5 name='user-cog' style={{ marginRight: 20, fontSize: 12, color: "#004D94" }} />


                                                    </Item>
                                                    <Item style={{ justifyContent: "space-between", height: 35 }} >
                                                        <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{allReportsArr.title}</Text>
                                                        {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                            source={require('../assets/images/jobTitle.png')}
                                                            resizeMode="contain"
                                                        /> */}
                                                        <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#004D94" }} />


                                                    </Item>
                                                    <Item style={{ justifyContent: "space-between", height: 35 }} >



                                                        <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{this.Capitalize(allReportsArr.HedingForPR)}</Text>
                                                        {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                            source={require('../assets/images/jobTitle.png')}
                                                            resizeMode="contain"
                                                        /> */}
                                                        <Icon name='subtitles' style={{ marginRight: 20, fontSize: 15, color: "#004D94" }} />


                                                    </Item>
                                                    <Item style={{ justifyContent: "space-between", height: 35 }} >
                                                        <Text style={{ fontSize: 15, marginHorizontal: "3%" }}>{allReportsArr.name}</Text>
                                                        {/* <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                                            source={require('../assets/images/master_icon.png')}
                                                            resizeMode="contain"
                                                        /> */}
                                                        <FontAwesome5 name='user' style={{ marginRight: 20, fontSize: 15, color: "#004D94" }} />


                                                    </Item>

                                                    <View style={{ justifyContent: "center", alignItems: "center", height: 65 }}>

                                                        <Image style={{ width: 100, height: 80, alignItems: "center", justifyContent: "center", borderBottomColor: "black", borderBottomWidth: 22 }}
                                                            // source={require('../assets/images/sig.png')}
                                                            source={{ uri: allReportsArr.image }}

                                                            resizeMode="contain"
                                                        />

                                                        {/* <Image style={{ width: 280, height: 100, marginLeft: 25 }}
                                                source={{ uri: uriPath }}
                                                resizeMode="contain"
                                            /> */}
                                                    </View>
                                                </View>



                                            )
                                        })
                                        }
                                    </ScrollView>


                                </Tab>
                            </Tabs>






                        </View>

                

            </View>


        )
    }

}

function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        jobListArr: state.root.jobListArr,
        allJobListArr: state.root.allJobListArr,
        allReportsArr: state.root.allReportsArr,
        objAllPreRegistration: state.root.objAllPreRegistration,
        objPreRegistration: state.root.objPreRegistration,
        jobkeys: state.root.jobkeys,
        allJobkeys: state.root.allJobkeys,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getJobsListInUser: () => {
            dispatch(getJobsListInUser());
        },
        setIndexForUser: (index, navigation, jobView, prClone) => {
            dispatch(setIndexForUser(index, navigation, jobView, prClone));
        },
        logOut: (navigation) => {
            dispatch(logOut(navigation));
        },
        report: (index, navigation, Title, type, prClone) => {
            dispatch(report(index, navigation, Title, type, prClone));
        },
        deleteReport: (index, reportKey, jobkeys, cloneReport, navigation) => {
            dispatch(deleteReport(index, reportKey, jobkeys, cloneReport, navigation));
        },
        loaderStart: () => {
            dispatch(loaderStart());
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(UserHome);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    contentContainer: {
        paddingBottom: "2%",
        backgroundColor: "white",

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
    reportCard: {
        // paddingVertical:"2%",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1.5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        paddingHorizontal: 22

    },

    // Footer: {position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "rgba(0,0,0,0.1)", flexDirection: 'row' },
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
    profile: { backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 0.5, width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
    searchBox: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
    dialog: { backgroundColor: '#ffffff', paddingBottom: 0, paddingTop: 0, marginTop: 0 },
    circle: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
    pin: { backgroundColor: '#ffffff', borderColor: "#E61825", borderWidth: 0.5, width: 215, height: 50, borderRadius: 52, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0, flexDirection: 'row' }


});

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 10, elevation: 15 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { borderRadius: 52, width: '80%', backgroundColor: '#004D94', marginLeft: '10%', marginRight: '5%', borderColor: '#004D94', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 15 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }

})