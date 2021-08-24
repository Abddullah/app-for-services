import React, { Component } from 'react';
import { StyleSheet, style, Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body, Title, DatePicker } from 'native-base';
import strInReqLan from "../store/config/config";
import Modal from "react-native-modal";
import { errorRemove, createDropDownOption, getRegisterDropDownOption } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';




class DropDown extends Component {
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
            dObj[this.state.createOption] = false
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
            delete dObj[this.state.optionToEdit];
            dObj[this.state.editInput] = false;
            alert(strInReqLan.optionUpdated)
            this.setState({
                editInput: ""
            })
            this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
        }
    }

    deleteDropOption(optionToDelete) {
        let dObj = this.props.dropDownList;
        delete dObj[optionToDelete]
        alert(strInReqLan.optionDeleted)
        this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
    }







    editDropOption(editOption) {
        let dObj = this.props.dropDownList;
        this.setState({
            editInput: editOption,
            optionToEdit: editOption
        })
        this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
    }

    sortObject(){

    }

    render() {
        let that = this.props.that;
        // console.log(this.props.heading,"headingggggggggggdddddddddddddddd")
        return (
            <View style={{ height: "4%" }}>
                <Item style={styles.input} >
                    <Picker mode="dropdown" selectedValue={this.props.selectedOption} style={{ marginLeft: "10%", width:this.props.input ? 100 : 270 }}
                     onValueChange={this.props.onChangeFunc.bind(that, this.props.heading)} >
                        <Items style={{ fontSize: 12 }} label={this.props.heading} value={""} />

                        {
                            Object.keys(this.props.dropDownList).map((key, index) => {
                                // console.log(key	, 'object keys in drop down')
                                return (
                                    <Items style={{ fontSize: 12 }} label={key} value={key} key={index} />
                                )
                            })
                        }



                        {/* {this.props.dropDownOptions.map((dropDownOptions, index) => {
                            return (
                                <Items style={{ fontSize: 12 }} label={dropDownOptions} value={dropDownOptions} key={index} />
                            )
                        })} */}
                    </Picker>

                    {(this.props.input) ? (
                        <Input
                            placeholder='Amount'
                            placeholderStyle={{ fontSize: 10 }}
                            placeholderTextColor="#b3b3b3"
                            style={{ marginLeft: "5%", fontSize: 15 }}
                            onChangeText={this.props.change}
                            value={this.props.amountOfMaterial}
                        />
                    ) : (null)
                    }
                </Item>



                <Item style={{
                    height: "40%", width: "90%",
                    //  borderWidth: 0.5,
                    // borderColor: 'red',
                }}>
                    <Button bordered success style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.createOption.bind(this)}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/add.png')}
                            resizeMode="contain"
                        />
                    </Button>
                    <Button bordered warning style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.editOption.bind(this)}>

                        <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/edit.png')}
                            resizeMode="contain"
                        />

                    </Button>
                    <Button bordered danger style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.delOption.bind(this)}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/delete.png')}
                            resizeMode="contain"
                        />
                    </Button>





                    {/* <Button style={{ backgroundColor: "grey", padding: 5, width: "30%" }} onPress={this.createOption.bind(this)}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/add.png')}
                            resizeMode="contain"
                        />
                    </Button>
                    <Button style={{ backgroundColor: "grey", padding: 5, width: "30%" }} onPress={this.editOption.bind(this)}>

                        <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/edit.png')}
                            resizeMode="contain"
                        />

                    </Button>
                    <Button style={{ backgroundColor: "grey", padding: 5, width: "30%" }} onPress={this.delOption.bind(this)}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/deleteicon.png')}
                            resizeMode="contain"
                        />
                    </Button> */}


                </Item>



                {/* /////////////////////////////////////////Modal for create//////////////////////////////////////////////// */}
                <Modal isVisible={this.state.isModalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <Item style={styles.input}>
                            <Input
                                placeholder={strInReqLan.email}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="#b3b3b3"
                                keyboardType={'email-address'}
                                style={{ marginLeft: "10%", fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ createOption: e }) }}
                                value={this.state.createOption}
                            />
                            <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                source={require('../assets/images/emailblueios.png')}
                                resizeMode="contain"
                            />
                        </Item>
                        <Button block info style={styles.button} onPress={this._saveOptions.bind(this)} >
                            <Text style={styles.btnTextMargin}>{strInReqLan.submitPost}</Text>
                        </Button>

                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{ textAlign: "center", color: "white" }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


                {/* /////////////////////////////////////////Modal for edit//////////////////////////////////////////////// */}

                <Modal isVisible={this.state.editIsModalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            {
                                Object.keys(this.props.dropDownList).map((key, index) => {
                                    // console.log(key, 'object keys in drop down')
                                    return (
                                        <View>
                                            <TouchableOpacity onPress={this.editDropOption.bind(this, key)}>
                                                <Text style={styles.deleteModalText}  >{key}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }

                        </View>
                        <Item style={styles.input}>
                            <Input
                                placeholder={strInReqLan.serTitle}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="#b3b3b3"
                                style={{ marginLeft: "10%", fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ editInput: e }) }}
                                value={this.state.editInput}
                            />
                            <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                source={require('../assets/images/jobTitle.png')}
                                resizeMode="contain"
                            />
                        </Item>
                        <Button block info style={styles.button} onPress={this._saveEditableOptions.bind(this)} >
                            <Text style={styles.btnTextMargin}>{strInReqLan.submitPost}</Text>
                        </Button>

                        <TouchableOpacity onPress={this._EdittoggleModal}>
                            <Text style={{ textAlign: "center", color: "white" }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


                {/* /////////////////////////////////////////Modal for delete//////////////////////////////////////////////// */}
                <Modal isVisible={this.state.delIsModalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            {
                                Object.keys(this.props.dropDownList).map((key, index) => {
                                    // console.log(key, 'object keys in drop down')
                                    return (
                                        <View>
                                            <TouchableOpacity onPress={this.deleteDropOption.bind(this, key)}>
                                                <Text style={styles.deleteModalText}  >{key}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <TouchableOpacity onPress={this._DeltoggleModal}>
                            <Text style={{ textAlign: "center", color: "white" }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


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

export default connect(mapStateToProp, mapDispatchToProp)(DropDown);



const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    // inputForService: { justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    deleteModalText: {
        fontSize: 20,
        color: '#fff'
    },
    inputForService: { justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },


});

