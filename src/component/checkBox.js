import React, { Component } from 'react';
import { StyleSheet, style, Image, TouchableOpacity, FlatList ,ScrollView} from 'react-native';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body, Title, DatePicker } from 'native-base';
import strInReqLan from "../store/config/config";
import Modal from "react-native-modal";
import { errorRemove, createDropDownOption, getRegisterDropDownOption } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import SelectMultiple from 'react-native-select-multiple'
import Icon from 'react-native-vector-icons/MaterialIcons';





class CheckBox extends Component {
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
            optionToEdit: "",



            selectedTeam: []


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
            let optionObj = {
                optionName: this.state.createOption,
                selected: false
            }
            dObj.push(optionObj);
            // dObj[this.state.createOption] = false
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
            // delete dObj[this.state.optionToEdit];
            // dObj[this.state.editInput] = false;
            let optionObj = {
                optionName: this.state.editInput,
                selected: false
            }
            dObj.splice(this.state.editIndex, 1, optionObj)
            alert(strInReqLan.optionUpdated)
            this.setState({
                editInput: ""
            })
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
        this.props.createDropDownOption(dObj, this.props.heading, this.props.selectedJob.jobId)
    }


    onSelectionsChange = (selectedTeam) => {
        console.log(selectedTeam, '++++++++++++++++++++++++++++++++++++++++++++')
        // selectedFruits is array of { label, value }
        this.setState({ selectedTeam })
    }

    render() {
        const team = []

        // Object.keys(this.props.dropDownList).map((key, index) => {
        //     console.log(key[index], '////////////////////////////////////')
        //     team.push(key)
        //     // return (
        //     //     <Items style={{ fontSize: 12 }} label={key} value={key} key={index} />
        //     // )
        // })


        this.props.dropDownList.map((key, index) => {
            // console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas', this.props.dropDownList);
            for (var prop in key) {
                // console.log(prop, key[prop], 'inside object looppppppppppppp')
                return (
                    team.push(key[prop])
                )
            }
        })



        // console.log(team, "aaaaaaaaaaaaaaaaaaaaa")
        let that = this.props.that;
        return (
            <View >

                <View

                // disabled={true}
                // enabled={false}
                >
                    {/* <Text style={{ fontWeight: "bold" }}>Team</Text> */}
                    <SelectMultiple

                        items={team}
                        style={{
                            width: '90%',
                            // width: this.props.input ? 100 : 270
                        }}
                        selectedItems={this.props.selectedOption}
                        onSelectionsChange={this.props.onChangeFunc.bind(that, this.props.heading)}
                    />

                    {(this.props.input) ? (
                        <Item style={{
                            height: 50, width: "90%",
                            //  borderWidth: 0.5,
                            // borderColor: 'red',
                        }}>
                            <Input
                                placeholder={strInReqLan.amount}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="black"
                                style={{ marginLeft: "5%", fontSize: 15 }}
                                onChangeText={this.props.change}
                                keyboardType={'numeric'}

                            // value={this.props.amountOfMaterial}
                            />
                        </Item>
                    ) : (null)
                    }


                </View>


                <Item style={{
                    height: 50, width: "90%",
                    //  borderWidth: 0.5,
                    // borderColor: 'red',
                }}>
                    <Button bordered success style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.createOption.bind(this)}>
                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/add.png')}
                            resizeMode="contain"
                        /> */}
                        <Icon name='add' style={{ fontSize: 22, color: "#7EC77E" }} />

                    </Button>
                    <Button bordered warning style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.editOption.bind(this)}>

                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/edit.png')}
                            resizeMode="contain"
                        /> */}
                        <Icon name='edit' style={{ fontSize: 22, color: "#F1B45E" }} />


                    </Button>
                    <Button bordered danger style={{ height: "80%", width: "22%", justifyContent: "center", alignItems: "center", marginTop: "2%", marginLeft: "8%" }} onPress={this.delOption.bind(this)}>
                        {/* <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/delete.png')}
                            resizeMode="contain"
                        /> */}
                        <Icon name='delete' style={{ fontSize: 22, color: "#E61825" }} />

                    </Button>
                </Item>



                {/* /////////////////////////////////////////Modal for create//////////////////////////////////////////////// */}
                {/* <Modal isVisible={this.state.isModalVisible}
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
                            <Text style={{ textAlign: "center", color: "white" }}>{strInReqLan.goBack}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> */}

                <Modal isVisible={this.state.isModalVisible}
                    backdropColor="black"
                    backdropOpacity={0.83}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Item style={styles.input}>
                            <Input
                                placeholder={strInReqLan.createOption}
                                placeholderStyle={{ fontSize: 10 }}
                                placeholderTextColor="white"
                                keyboardType={'email-address'}
                                style={{ marginLeft: "10%", color: "white", fontSize: 15 }}
                                onChangeText={(e) => { this.setState({ createOption: e }) }}
                                value={this.state.createOption}
                            />
                            {/* <Image style={{ width: 22, height: 12, marginRight: 20 }}
                                source={require('../assets/images/emailblueios.png')}
                                resizeMode="contain"
                            /> */}
                        </Item>
                        <Button block info style={styles.button} onPress={this._saveOptions.bind(this)} >
                            <Text style={{ marginTop: "3%" }}>{strInReqLan.createOptionSave}</Text>
                        </Button>

                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{ textAlign: "center", color: "white", marginTop: "5%", textDecorationLine: "underline" }}>{strInReqLan.goBack}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


                {/* /////////////////////////////////////////Modal for edit//////////////////////////////////////////////// */}

                {/* <Modal isVisible={this.state.editIsModalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            {

                                this.props.dropDownList.map((key, index) => {
                                    console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas', this.props.dropDownList);
                                    for (var prop in key) {
                                        return (
                                            <View>
                                                <TouchableOpacity onPress={this.editDropOption.bind(this, key[prop], index)}>
                                                    <Text style={styles.deleteModalText}  >{key[prop]}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }


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
                            <Text style={{ textAlign: "center", color: "white" }}>{strInReqLan.goBack}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> */}



                <Modal isVisible={this.state.editIsModalVisible}
                    backdropColor="black"
                    backdropOpacity={0.83}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <ScrollView contentContainerStyle={styles.contentContainer}>

                                <Item style={{ borderBottomWidth: 0.5, borderColor: 'white', }}>
                                    <Input
                                        placeholder={strInReqLan.editOption}
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="white"
                                        style={{ marginLeft: "10%", fontSize: 15, color: "white", }}
                                        onChangeText={(e) => { this.setState({ editInput: e }) }}
                                        value={this.state.editInput}

                                    />
                                </Item>
                                <Button
                                    // style={styles.button}
                                    style={{
                                        // color="#841584",
                                        backgroundColor: '#EC4651',
                                        width: "100%",
                                        textAlign: "center",
                                        justifyContent: "center",
                                        marginTop: "3%"

                                    }}
                                    onPress={this._saveEditableOptions.bind(this)} >
                                    <Text >{strInReqLan.editOption}</Text>
                                </Button>
                                {

                                    this.props.dropDownList.map((key, index) => {
                                        console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas', this.props.dropDownList);
                                        for (var prop in key) {
                                            return (

                                                <View style={{
                                                    borderBottomWidth: 0.3, borderColor: 'white',
                                                }}>

                                                    <TouchableOpacity onPress={this.editDropOption.bind(this, key[prop], index)}>

                                                        <Text style={styles.deleteModalText}  >{key[prop]}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            )
                                        }


                                    })
                                }
                                <TouchableOpacity onPress={this._EdittoggleModal}>
                                    <Text style={{ textAlign: "center", color: "white", marginTop: "12%", textDecorationLine: "underline" }}>{strInReqLan.goBack}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>





                {/* /////////////////////////////////////////Modal for delete//////////////////////////////////////////////// */}
                {/* <Modal isVisible={this.state.delIsModalVisible}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            {

                                this.props.dropDownList.map((key, index) => {
                                    // console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas', this.props.dropDownList);
                                    for (var prop in key) {
                                        return (
                                            <View>
                                                <TouchableOpacity onPress={this.deleteDropOption.bind(this, key[prop], index)}>
                                                    <Text style={styles.deleteModalText}  >{key[prop]}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }


                                })
                            }

                        </View>

                        <TouchableOpacity onPress={this._DeltoggleModal}>
                            <Text style={{ textAlign: "center", color: "white" }}>{strInReqLan.goBack}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> */}
                <Modal isVisible={this.state.delIsModalVisible}
                    backdropColor="black"
                    backdropOpacity={0.83}
                // style={{ backgroundColor: "red", flex: 1 }}
                >

                    <View style={{ flex: 1 }} >

                        <ScrollView contentContainerStyle={styles.contentContainer}>

                            <View style={styles.container}>
                                <View style={{
                                    backgroundColor: "#AE000B", width: "100%",
                                    borderRadius: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff'

                                }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 22, color: "white", justifyContent: "center", textAlign: 'center' }}>{strInReqLan.tapToDelete}</Text>
                                </View>
                                {

                                    this.props.dropDownList.map((key, index) => {
                                        console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas', this.props.dropDownList);
                                        for (var prop in key) {
                                            return (
                                                <View style={{
                                                    borderBottomWidth: 0.5, borderColor: 'white',
                                                }}>
                                                    <TouchableOpacity onPress={this.deleteDropOption.bind(this, key[prop], index)}>
                                                        <Text style={styles.deleteModalText}  >{key[prop]}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }


                                    })
                                }
                            </View>

                            <TouchableOpacity onPress={this._DeltoggleModal}>
                                <Text style={{ textAlign: "center", color: "white", marginTop: "12%", textDecorationLine: "underline" }}>{strInReqLan.goBack}</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </Modal>


            </View >

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

export default connect(mapStateToProp, mapDispatchToProp)(CheckBox);



const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },
    button: { width: '90%', backgroundColor: '#EC4651', marginTop: '5%', marginLeft: '5%', marginRight: '5%', borderColor: '#EC4651', borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    // inputForService: {justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    deleteModalText: {
        fontSize: 20,
        color: '#fff'
    },
    inputForService: { justifyContent: "space-between", height: "14%", marginLeft: "5%", marginRight: "5%" },
    contentContainer: {
        paddingBottom: 300,
        // backgroundColor: "white",
        // flex: 1
    },

});

