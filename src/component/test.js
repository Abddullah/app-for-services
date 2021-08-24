import React, { Component } from 'react';
import { Container, Button, Text, Content, Form, Items, Item, Input, Label, Alert, Thumbnail, View, Picker, Left, Right, Spinner, Header, Body, Title, DatePicker, FooterTab, Footer, Icon } from 'native-base';
import { ScrollView, Image, TouchableOpacity, } from 'react-native';

import * as firebase from 'firebase'
import strInReqLan from "../store/config/config";
import ErrorMessage from '../component/errorMessage';
// import DropDown from '../component/dropDown';
// import LogoImage from '../component/logoImage';
import { createJobData, errorForPostJob } from '../store/action/action';
// import { errorForPostJob } from '../store/action/action';
import { errorRemove } from '../store/action/action';
import { connect } from 'react-redux';
import Loading from '../component/loader';
import {
    StyleSheet,
} from 'react-native';
import Textarea from 'react-native-textarea';




class DropDownOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empty: ""

        }


    }

    onValueChange(value) {
        this.setState({ empty: value });
    }

    createOption() {
        console.log("hello")
        // console.log(this.props.navigation, "*****************")

        this.props.navigation.navigate("EditPost")

    }




    render() {

        // console.log(this.props.dropDownList, '*****************')
        // console.log(this.state.dropdownA[0], "arrrrrrrrrrrrrrrrrrrrrrrr")
        // console.log(this.props.dropDownList[0], "headingdddddddddddd")
        // console.log(this.props.heading, "headingdddddddddddd")
        // console.log(this.props.navigation, "*****************")
        return (
            <View>
                <Item style={styles.input} >
                    <Picker mode="dropdown" selectedValue={this.state.empty} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                        <Items style={{ fontSize: 12 }} label={this.props.heading} value={""} />
                        {this.props.dropDownList.map((dropDownList, index) => {
                            return (
                                <Items style={{ fontSize: 12 }} label={dropDownList} value={dropDownList} key={index} />
                            )
                        })}
                    </Picker>
                </Item>



                <Item style={{ height: "27%", width: "90%", justifyContent: "space-between" }}>
                    {/* <TouchableOpacity > */}
                    <Button style={{ backgroundColor: "grey", padding: 5, width: "30%" }} onPress={this.createOption.bind(this)}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../../src/assets/images/add.png')}
                            resizeMode="contain"
                        />
                    </Button>
                    {/* </TouchableOpacity> */}
                    <View style={{ backgroundColor: "grey", padding: 5, width: "30%" }}>

                        <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/edit.png')}
                            resizeMode="contain"
                        />

                    </View>
                    <View style={{ backgroundColor: "grey", padding: 5, width: "30%" }}>
                        <Image style={{ width: 23, height: 23, }}
                            source={require('../assets/images/deleteicon.png')}
                            resizeMode="contain"
                        />
                    </View>
                </Item>
            </View>

        );
    }
}

export default DropDownOptions;



const styles = StyleSheet.create({
    input: { justifyContent: 'center', alignItems: 'center', width: '90%' },

});

