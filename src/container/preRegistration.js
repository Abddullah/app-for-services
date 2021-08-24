import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Items, Item, View, Picker, Button, Header, Left, Right, Body, Title } from 'native-base';

import strInReqLan from "../store/config/config";
import PreRegisterJobSelectionDropDown from '../component/preregJobDropdown';
import PreRegisterSerSelectionDropDown from '../component/preregSerDropdown';
import { connect } from 'react-redux';
import { saveInputFormsOptions, loaderStart } from '../store/action/action';
import Loading from '../component/loader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';





class preRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: strInReqLan.createNewJobs,
            selectedJob: "",

        }
        console.log(this.props.selectedJob, '************************')
    }

    onValueChange(value) {
        console.log(value, "vallllll")
        this.setState({ type: value });
    }



    onValueChangeHandle(value) {
        this.setState({ selectedJob: value });
        console.log(value, 'valueeeeeeeeeeeeeeeeeeee')
    }
    componentWillMount() {
        //  console.log(this.props.jobListArr,"777777777")
        this.setState({
            jobListArr: this.props.jobListArr
        })

    }
    saveInputFormsOptions() {
        // console.log(this.state.selectedJob, "777778887777");
        this.props.loaderStart()


        if (this.state.selectedJob === "") {
            alert(strInReqLan.allFields)
            this.props.loaderStart()



        }

        else if (this.state.type == "Empregos" || this.state.type == "Jobs") {
            this.props.saveInputFormsOptions(this.state.selectedJob, this.state.type, this.props.navigation);
            // this.props.navigation.navigate("Register")

        }

        else {
            this.props.saveInputFormsOptions(this.state.selectedJob, this.state.type, this.props.navigation);
            // this.props.navigation.navigate("RegisterService")
        }




    }


    render() {
        // console.log(this.state.selectedJob, "1233333333333333")
        return (
            <View style={styles.container}>
                <Header androidStatusBarColor="#AE000B"
                    style={{ backgroundColor: '#E61825', marginBottom: "2%" }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => this.props.navigation.push("CompanyHome")}>
                            {/* <Icon name='arrow-back' /> */}

                            {/* <Image style={{ width: 50, height: 25 }}
                                source={require('../assets/images/backarrow.png')}
                                resizeMode="contain"
                            /> */}
                                <MaterialIcons name='arrow-back' style={{ marginRight: 20, fontSize: 35, color: "white" }} />

                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ marginLeft: "2%", fontWeight: "bold" }}>{strInReqLan.preregistration}</Title>
                    </Body>

                </Header>
                <View style={{
                    flex: 1,

                    // backgroundColor: "green",
                    // justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ width: "90%" }}>
                        <Item style={styles.input} >
                            <Picker mode="dropdown" selectedValue={this.state.type} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                                <Items style={{ fontSize: 12 }} label={strInReqLan.createNewJobs} value={strInReqLan.createNewJobs} />
                                <Items style={{ fontSize: 12 }} label={strInReqLan.createNewAdmServices} value={strInReqLan.createNewAdmServices} />


                            </Picker>
                        </Item>

                        {
                            (this.state.type === strInReqLan.createNewJobs) ?
                                (
                                    <PreRegisterJobSelectionDropDown jobListArr={this.state.jobListArr} that={this} onChangeFunc={this.onValueChangeHandle} />
                                ) :
                                (
                                    <PreRegisterSerSelectionDropDown jobListArr={this.state.jobListArr} that={this} onChangeFunc={this.onValueChangeHandle} />

                                )
                        }


                        {
                            (this.props.isLoader === true) ?
                                (
                                    <Loading />
                                ) :
                                (


                                    <Button block style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#EC4651', width: "90%", marginHorizontal: "5%" }}  onPress={this.saveInputFormsOptions.bind(this)} >
                                        <Text style={styles.btnTextMargin}>{strInReqLan.next}</Text>
                                    </Button>


                                    // <Button block info style={styles.button} onPress={this.saveInputFormsOptions.bind(this)}>
                                    //     <Text style={styles.btnTextMargin}>{strInReqLan.next}</Text>
                                    // </Button>
                                )
                        }








                    </View>


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
        jobListArr: state.root.jobListArr
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
        saveInputFormsOptions: (selectedJob, type, navigation) => {
            dispatch(saveInputFormsOptions(selectedJob, type, navigation));
        },
        loaderStart: () => {
            dispatch(loaderStart());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(preRegistration);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },


    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    // input: {justifyContent: 'center', alignItems: 'center', width: '90%' },


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

    marginText: {
        color: '#004D94',
        textAlign: 'center',
        // marginTop: 0
        marginBottom: 7,
        marginTop: -20

    },
    btnTextMargin: {
        fontWeight: 'bold',
        // marginBottom: 

    }


});
