import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, Items, Item, View, Picker } from 'native-base';
import strInReqLan from "../store/config/config";


export default class PrSelectionJobs extends Component {

    handle_change() {
        console.log(this.props.onChangeFunc, 'this.props.onChangeFuncthis.props.onChangeFunc');
        this.props.onChangeFunc();

    }


    render() {
        let that = this.props.that;


        let prData = this.props.prClone;
        console.log(prData, "4545555555555")
        let headingForPr = []
        for (var key in prData) {
            // console.log(key, "key")
            // console.log(prData[key], "prData")
            if (key === "prAdditionalDataArr") {
                console.log(prData[key][0], "prAdditionalDatarr")
                for (var property in prData[key][0]) {
                    console.log(property, "property", prData[key][0][property])
                    if (prData[key][0][property] !== "" && property === "generalObservations") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.generalObservations)

                    }
                    else if (prData[key][0][property] !== "" && property === "requestedService") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.requestedService)

                    }
                    else if (prData[key][0][property] !== "" && property === "serviceYouHaveDone") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.serviceYouHaveDone)

                    }
                    else if (prData[key][0][property] !== "" && property === "codeOrOmFromTheCustomer") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.codeOrOmFromTheCustomer)

                    }
                    else if (prData[key][0][property] !== "" && property === "customersOsNumber") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.customersOsNumber)

                    }
                    else if (prData[key][0][property] !== "" && property === "discribeWhenMarkedAbove") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.discribeWhenMarkedAbove)

                    }
                    else if (prData[key][0][property] !== "" && property === "kmReport") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.kmReport)

                    }
                    else if (prData[key][0][property] !== "" && property === "overtimeReason") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.overtimeReason)

                    }
                    else if (prData[key][0][property] !== "" && property === "reportTheCID") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.reportTheCID)

                    }
                    else if (prData[key][0][property] !== "" && property === "reportTheDates") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.reportTheDates)

                    }
                    else if (prData[key][0][property] !== "" && property === "reportTheDatesCompensate") {
                        console.log("takli")
                        headingForPr.push(strInReqLan.reportTheDatesCompensate)

                    }

                }




            }
            // console.log(key, "keykeykey")














            //     if (prData[key][0][property] !== "" && property === "generalObservations" || property === "requestedService" || property === "serviceYouHaveDone"
            //     || property === "codeOrOmFromTheCustomer" || property === "customersOsNumber" || property === "discribeWhenMarkedAbove" || property === "kmReport"
            //     || property === "overtimeReason" || property === "reportTheCID" || property === "reportTheDates" || property === "reportTheDatesCompensate") {
            //     console.log("takli")
            //     headingForPr.push(property)

            // }



            for (var i = 0; i < prData[key].length; i++) {

                console.log(prData[key], "optionheads")
                console.log(prData[key][i], "optionName")
                if (prData[key][i].selected === true) {
                    console.log(key, "validoption")
                    headingForPr.push(key)
                }


            }

        }





        return (
            <Item style={styles.input} >


                {/* <Picker mode="dropdown" style={{ marginLeft: "10%", width: 270 }} selectedValue={that.state.selectedPr} onValueChange={this.props.onChangeFunc.bind(that)} >
                    <Items style={{ fontSize: 12 }} label={strInReqLan.selectpreregistration} value={""} />
                    {
                        this.props.jobListArr
                            .filter((unFilteredjobListArr) => {
                                return unFilteredjobListArr.jobId == this.props.jobKey
                            }).map((jobListArr, index) => {
                                console.log(jobListArr.jobId, "5555555555555")
                                return (
                                    <Items style={{ fontSize: 12 }} label={jobListArr.jobId} value={JSON.stringify(jobListArr.jobId)} key={index} />
                                )
                            })
                    } */}












                <Picker mode="dropdown" style={{  marginRight: 5 }}  selectedValue={that.state.selectedPr} onValueChange={this.props.onChangeFunc.bind(that)} >
                    <Items style={{ fontSize: 12 }} label={strInReqLan.selectpreregistration} value={""} />

                    {
                        headingForPr.map((key, index) => {
                            return (
                                <Items style={{ fontSize: 12 }} label={key.toLocaleLowerCase()} value={key} key={index} />
                            )
                            // console.log(key, 'kfasdjfasd;4kl=fjasdklfjasdklfjas',index);
                            // for (var prop in key) {
                            //     console.log(prop, key[prop], 'inside object loop')
                            //     return (
                            //         <Items style={{ fontSize: 12 }} label={key[prop]} value={key[prop]} key={index} />
                            //     )
                            // }
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
