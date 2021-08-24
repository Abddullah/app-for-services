import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, Items, Item, View, Picker } from 'native-base';
import strInReqLan from "../store/config/config";


export default class PreRegisterSerSelectionDropDown extends Component {

    handle_change() {
        console.log(this.props.onChangeFunc, 'this.props.onChangeFuncthis.props.onChangeFunc');
        this.props.onChangeFunc();

    }


    render() {
        let that = this.props.that;
        console.log(that.state.selected, '555555')
        return (
            <Item style={styles.input} >
                <Picker mode="dropdown" style={{ marginLeft: "10%", width: 270 }} selectedValue={that.state.selectedJob} onValueChange={this.props.onChangeFunc.bind(that)} >
                    <Items style={{ fontSize: 12 }} label={strInReqLan.selectService} value={""} />
                    {
                        this.props.jobListArr
                            .filter((unFilteredjobListArr) => {
                                return unFilteredjobListArr.type == "Administrative services" || unFilteredjobListArr.type == "Serviços administrativos" 
                            }).map((jobListArr, index) => {
                                console.log(jobListArr, "5555555555555")
                                return (
                                    <Items style={{ fontSize: 12 }} label={jobListArr.serTitle} value={JSON.stringify(jobListArr)} key={index} />
                                )
                            })
                    }
                </Picker>
            </Item>

        );
    }
}


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
