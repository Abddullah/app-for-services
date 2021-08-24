import React, { Component } from 'react';
import { StyleSheet, style, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import {
    Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View,
    Picker, Left, Right, Spinner, Header, Body, Title, DatePicker, Icon
} from 'native-base';
import strInReqLan from "../store/config/config";
import Modal from "react-native-modal";
import { errorRemove, createDropDownOption, getRegisterDropDownOption } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';




class DisibleDd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            delIsModalVisible: false,
            editIsModalVisible: false,
            empty: "",

            createOption: '',
            flag: false,
            editInput: "",
            optionToEdit: ""

        }
        // console.log(this.props.selectedJob, '************************')
    }


    // componentWillMount() {
    //     this.props.getRegisterDropDownOption(this.props.heading)

    // }

    onValueChange(value) {
        this.setState({ empty: value });
    }

    createOption() {
        this._toggleModal()
        // this._saveOptions()

    }
    editOption() {
        this._EdittoggleModal()
        // this._saveOptions()

    }
    delOption() {
        this._DeltoggleModal()
        // this._saveOptions()

    }



    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    _DeltoggleModal = () =>
        this.setState({ delIsModalVisible: !this.state.delIsModalVisible });
    _EdittoggleModal = () =>
        this.setState({ editIsModalVisible: !this.state.editIsModalVisible });




    _saveOptions() {
        if (this.state.createOption === "") {
            alert(strInReqLan.allFields)
        }
        else {
            let dObj = this.props.dropDownList;
            // let optionName = this.state.createOption.toString()
            // dObj[this.state.createOption] = false
            // [this.state.createOption] = false
            let optionObj = {
                optionName: this.state.createOption,
                selected: false
            }
            dObj.push(optionObj)
            // console.log(dObj, "dobjjjjjjjjjjjjjjjjjj", optionName)
            // console.log(this.state.createOption, '********//////', this.props.selectedOption, this.props.selectedJob, dObj)
            alert(strInReqLan.optionCreated)
            this.setState({
                createOption: ""
            })
            this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
        }
    }
    _saveEditableOptions() {
        if (this.state.editInput === "") {
            alert(strInReqLan.allFields)
        }
        else {
            let dObj = this.props.dropDownList;
            // let optionName = this.state.editInput.toString()
            // dObj[this.state.createOption] = false
            // [this.state.createOption] = false
            let optionObj = {
                optionName: this.state.editInput,
                selected: false
            }
            dObj.splice(this.state.editIndex, 1, optionObj)
            // delete dObj[this.state.optionToEdit];
            // dObj[this.state.editInput] = false;
            alert(strInReqLan.optionUpdated)
            this.setState({
                editInput: ""
            })
            console.log(dObj, "aaaaaaaaaaaaaaaaaaaaa")
            this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
        }
    }

    deleteDropOption(optionToDelete, index) {
        let dObj = this.props.dropDownList;
        // delete dObj[optionToDelete]
        dObj.splice(index, 1)
        alert(strInReqLan.optionDeleted)
        this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
    }







    editDropOption(editOption, index) {
        let dObj = this.props.dropDownList;
        this.setState({
            editIndex: index,
            editInput: editOption,
            optionToEdit: editOption
        })
        // this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
    }

    sortObject() {

    }

    render() {
        let that = this.props.that;
        // console.log(this.props.heading,"headingggggggggggdddddddddddddddd")
        return (
            <View style={{
                height: "3%",
                // width: "91%"
            }}>
                <Item style={styles.input} >
                    <Picker mode="dropdown" enabled={false}
                        style={{ marginLeft: "10%", width: this.props.input ? 100 : 270 }}
                    // selectedValue={this.props.selectedOption} 
                    // onValueChange={this.props.onChangeFunc.bind(that, this.props.heading)}
                    >
                        <Items style={{ fontSize: 12 }} label={this.props.heading} value={""} />

                    </Picker>

                    {(this.props.input) ? (
                        <Input
                            placeholder='Amount'
                            placeholderStyle={{ fontSize: 10 }}
                            placeholderTextColor="black"
                            style={{ marginLeft: "5%", fontSize: 15 }}
                            onChangeText={this.props.change}
                            value={this.props.amountOfMaterial}
                            keyboardType={'numeric'}
                            disabled={true}

                        />
                    ) : (null)
                    }
                </Item>



                <Item style={{
                    height: "40%", width: "90%",
                    backgroundColor: "rgba(0,0,0,0.02)",

                    //  borderWidth: 0.5,
                    // borderColor: 'red',

                }}>
                    <Button disabled={true} bordered success style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.createOption.bind(this)}>
                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/add.png')}
                            resizeMode="contain"
                        /> */}
                    </Button>
                    <Button disabled={true} bordered warning style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.editOption.bind(this)}>

                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/edit.png')}
                            resizeMode="contain"
                        /> */}
                        {/* <Icon name='arrow-back' /> */}

                    </Button>
                    <Button disabled={true} bordered danger style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.delOption.bind(this)}>
                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/delete.png')}
                            resizeMode="contain"
                        /> */}
                    </Button>






                </Item>






            </View>

        );
    }
}


function mapStateToProp(state) {
    return ({
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        selectedJob: state.root.selectedJob
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        createDropDownOption: (dObj, type, jobId) => {
            dispatch(createDropDownOption(dObj, type, jobId));
        },
        getRegisterDropDownOption: (type, ) => {
            dispatch(getRegisterDropDownOption(type));
        },
        errorForPostJob: () => {
            dispatch(errorForPostJob());
        },
        errorRemove: () => {
            dispatch(errorRemove());
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(DisibleDd);



const styles = StyleSheet.create({
    input: {
        backgroundColor: "rgba(0,0,0,0.02)",
        justifyContent: 'center', alignItems: 'center', width: '90%'
    },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    // inputForService: {justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    deleteModalText: {
        fontSize: 20,
        color: '#fff',
        marginTop: "3%", marginBottom: "2%", marginLeft: "5%"
    },
    inputForService: { justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    contentContainer: {
        paddingBottom: 195,
        // backgroundColor: "white",
        // flex: 1
    },

});

