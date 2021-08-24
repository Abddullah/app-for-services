
import ActionTypes from '../constant/constant';
import { sendEmailAPI, sendJobDataInEmailAPI, sendPrDataInEmailAPI, sendReportDataInEmailAPI } from '../../service/emailservice';
// import history from '../../History';
import * as firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()
import strInReqLan from "../config/config";
import { object } from 'firebase-functions/lib/providers/storage';






export function signupAction(user, collaborator, navigation) {
    return dispatch => {
        console.log(user, collaborator, "afaaafafafffff")
        dispatch({ type: ActionTypes.LOADER })
        if (user.password !== user.confirmPassword) {
            dispatch({ type: ActionTypes.SHOWERROR, payload: 'Password does not match.' })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    // dispatch({ type: ActionTypes.LOADER })
                    console.log(firebase.auth().currentUser.uid, '*******************///////////////////////')
                    let currentUserUid = firebase.auth().currentUser.uid;
                    user.uid = currentUserUid;
                    delete user.password;
                    delete user.confirmPassword;
                    dispatch(saveNewUserData(user, collaborator, navigation));
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    // alert(errorMessage)
                    console.log(errorMessage, "save authentication");
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        }

    }
}

function saveNewUserData(user, collaborator, navigation) {
    return dispatch => {
        firebase.database().ref('/users/' + user.uid).set(user)
            .then(() => {
                // alert("sign up")
                sendEmailAPI(user.email)
                    .then((succes) => {
                        dispatch({ type: ActionTypes.LOADER })
                        navigation.navigate("Signin")
                        // dispatch({ type: ActionTypes.LOADER })
                    })
                    .catch((error) => {
                        var errorMessage = error.message;
                        // alert(errorMessage)
                        console.log(errorMessage, "save user data");
                        dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                        setTimeout(() => {
                            dispatch({ type: ActionTypes.HIDEERROR })
                        }, 3000)
                    })
            })
            .catch((error) => {
                var errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorMessage, "save user data");
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })
    }
}





export function login(user, navigation) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                // console.log(currentUserUid, "444444444444444444444444");


                // firebase.auth.currentUserUid
                // let currentUserUid = firebase.auth().currentUser.uid;
                let userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/' + userId + '/').once('value')
                    .then(function (snapshot) {

                        let userData = snapshot.val();
                        // console.log(userData.active, "user Dataaaaaaaaaaaaaa")
                        // console.log(userData.role)
                        // console.log(strInReqLan.companyForDatabase)

                        if (userData.active === true && (userData.role === "empresa" || userData.role === "company")) {
                            navigation.navigate("CompanyHome")

                            dispatch({ type: ActionTypes.LOADER })

                        }
                        else if (userData.active === true && (userData.role === "colaborador" || userData.role === "collaborator")) {
                            navigation.navigate("UserHome")
                            dispatch({ type: ActionTypes.LOADER })


                        }
                        else {

                            dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.yourAccDeactivate })
                            setTimeout(() => {
                                dispatch({ type: ActionTypes.HIDEERROR })
                            }, 3000)

                            // alert("your account has been deactivated")
                        }

                    });
                // console.




                // alert("sign In")
                // navigation.navigate("CompanyHome")
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
                var errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorMessage)
            });

    }
}

export function unSubscribe(user, navigation) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })


        if (user.resonForDeactivate === "") {
            dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.errState })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)

            // var errorMessage = error.message;
            // alert(errorMessage)
            console.log(user.resonForDeactivate, "assssssssssssssssssss")
            // dispatch({ type: ActionTypes.LOADER })



        }

        else {
            // dispatch({ type: ActionTypes.LOADER })

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    let userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('/users/' + userId + '/').once('value')
                        .then(function (snapshot) {
                            let userData = snapshot.val();
                            console.log(userData, "aaaaaaaaaaaaaaaaaaaaa")
                            if (userData.active === false) {
                                alert(strInReqLan.alreadyAccDeactivate)
                            }
                            else {
                                userData.active = false
                                userData.reason = user.resonForDeactivate

                                firebase.database().ref('/users/' + userId).set(userData)
                                    .then(() => {
                                        // alert("sign up")
                                        dispatch({ type: ActionTypes.LOADER })
                                        // dispatch({ type: ActionTypes.LOADER })
                                        // navigation.navigate("Signin")
                                        alert(strInReqLan.yourAccDeactivate)

                                    })
                                    .catch((error) => {
                                        var errorMessage = error.message;
                                        // alert(errorMessage)
                                        console.log(errorMessage);
                                        dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                                        setTimeout(() => {
                                            dispatch({ type: ActionTypes.HIDEERROR })
                                        }, 3000)
                                    })

                            }
                            // dispatch({ type: ActionTypes.LOADER })








                        });
                    // console.




                    // alert("sign In")
                    // navigation.navigate("CompanyHome")
                })
                .catch((error) => {
                    dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                    var errorMessage = error.message;
                    // alert(errorMessage)
                    console.log(errorMessage)
                });
        }



    }
}



export function errorRemove() {
    return dispatch => {
        dispatch({ type: ActionTypes.HIDEERROR })
    }
}



export function resetEmail(user) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })

        firebase.auth().sendPasswordResetEmail(user.email)
            .then(function (user) {
                // alert("Please check your email")
                // // var err = "Please check your email";
                // this.setState({
                //     err: "Please check your email"
                // })

                dispatch({ type: ActionTypes.LOADER })


            })


            .catch((error) => {
                dispatch({ type: ActionTypes.SHOWERROR, payload: error.message })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
                var errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorMessage)
            });

    }
}




export function errorForPostJob() {
    return dispatch => {
        // console.log("heloooooooooo")
        dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.allFields })
        setTimeout(() => {
            dispatch({ type: ActionTypes.HIDEERROR })
        }, 3000)
        // dispatch({ type: ActionTypes.LOADER })

    }
}





export function createJobData(newJob, addRole, navigation, jobListArr) {
    console.log(jobListArr, "jobListArr")
    return dispatch => {
        console.log(newJob, "newwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        // dispatch({ type: ActionTypes.LOADER })
        if (newJob.jobTitle === "" || newJob.email === "" || newJob.responsibleName === "" ||
            newJob.responsibleNumber === "" || newJob.contractNoOfJob === "" || newJob.address === ""
            || newJob.begginingDate === "" || newJob.expTermDate === "" || newJob.serEmail === "" || newJob.serResName === ""
            || newJob.serResNum === "" || newJob.serStatus === "" || newJob.serTitle === "" || newJob.type === ""

        ) {
            dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.allFields })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
        else {
            let userId = firebase.auth().currentUser.uid;
            let userEmail = firebase.auth().currentUser.email;
            // newJob.push(newJobId)
            console.log(firebase.auth().currentUser, "firebase authhhhhhhhhhhhhhhh")
            console.log(userEmail, "emailllllllllllllll")


            firebase.database().ref('/jobs/' + userId + '/').push(newJob)
                .then(() => {
                    let jobListArrClone = jobListArr
                    jobListArrClone.unshift(newJob)
                    dispatch({ type: ActionTypes.LOADER })
                    dispatch({ type: ActionTypes.POSTJOBS, payload: jobListArrClone })
                    alert(strInReqLan.jobCreateSuc)
                    navigation.push("CompanyHome")

                    sendJobDataInEmailAPI(userEmail, newJob)
                        .then((succes) => {

                        })
                        .catch((error) => {
                            // var errorMessage = error.message;
                            // // alert(errorMessage)
                            // console.log(errorMessage, "save user data");
                            // dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                            // setTimeout(() => {
                            //     dispatch({ type: ActionTypes.HIDEERROR })
                            // }, 3000)
                        })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        }
    }
}

// *********************************************///report*****************************
// *********************************************///report*****************************
export function createReportData(report, strInReqLancreateNewJobs, navigation, allJobListArr, allReportsArr, HedingForPR) {
    return dispatch => {
        // dispatch({ type: ActionTypes.LOADER })

        console.log(report, "babluuuuuuuuuuuuu")

        let userId = firebase.auth().currentUser.uid;
        let userEmail = firebase.auth().currentUser.email;
        // // newJob.push(newJobId)
        // console.log(firebase.auth().currentUser, "firebase authhhhhhhhhhhhhhhh")
        // console.log(userEmail, "emailllllllllllllll")
        let jobID = report.jobkeys
        let uidOfJob;
        let emailOfJob;
        console.log(jobID, "jobIDjobID")



        // let userId = firebase.auth().currentUser.uid;
        // console.log(userId, "aaaaaaaaaaas")
        firebase.database().ref('/jobs/' + '/').once('value', (Snapshot) => {
            let jobsObj = Snapshot.val()
            console.log(jobsObj, "adadadadad")
            Object.keys(jobsObj).map((userIds, index) => {
                console.log(userIds, "8788888")
                for (var key in jobsObj[userIds]) {
                    console.log(key, "7878787")
                    if (jobID === key) {
                        uidOfJob = userIds
                        break;


                    }


                }



            })



            console.log(uidOfJob, "dabbu")
        })
        firebase.database().ref('/users/' + '/').once('value', (Snapshot) => {
            let usersObj = Snapshot.val()
            console.log(usersObj, "adadadadad")
            Object.keys(usersObj).map((userIds, index) => {
                console.log(userIds, "8788888")
                if (userIds === uidOfJob) {
                    console.log(usersObj[userIds].email, "7877777777")
                    emailOfJob = usersObj[userIds].email
                    // break;


                }




            })



            console.log(emailOfJob, "emailOfJobemailOfJob")
        })

















        firebase.database().ref('/report/' + userId + '/' + jobID + '/').push(report)
            .then(() => {
                // let arrJobID = []
                // arrJobID.push(jobID)
                console.log(allReportsArr, "allReportsArrallReportsArr")
                let CloneallReportsArr = allReportsArr
                CloneallReportsArr.unshift(report)




                dispatch({ type: ActionTypes.ALLREPORTS, payload: CloneallReportsArr })

                alert("Report created")
                navigation.navigate("UserHome")




                if (report.emailFlag === true) {
                    sendReportDataInEmailAPI(userEmail, report, emailOfJob)
                    console.log(report, "dadadadadadad", uidOfJob, emailOfJob)
                        .then((succes) => {
                            console.log(report, "aftermail function", uidOfJob, emailOfJob)
                        })
                }
                else {
                    sendReportDataInEmailAPI(report, emailOfJob)
                    console.log(report, "dadadadadadad", uidOfJob, emailOfJob)
                        .then((succes) => {
                            console.log(report, "aftermail function", uidOfJob, emailOfJob)
                        })
                }


                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((error) => {
                var errorMessage = error.message;
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })
    }
}



// **************************//////////report**********************
// **************************//////////report**********************
export function report(index, navigation, Title, type, prClone) {
    return dispatch => {

        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId + '/').once('value', (Snapshot) => {
            let obj = Snapshot.val()
            let currentUserNameForReport = obj.name
            let TitleForReport = Title;
            let typeForReport = type;
            let indexForReport = index;
            let objForReport = {
                Title: TitleForReport,
                currentUserName: currentUserNameForReport,
                type: typeForReport,
                index: indexForReport
            }

            if (prClone === undefined || prClone === null) {
                console.log("iffffffffff")
                navigation.push("Report",
                    {
                        vewObjReport: JSON.stringify(objForReport),
                    }

                )

            }
            else {
                console.log("elseelseelse")
                navigation.push("Report",
                    {
                        vewObjReport: JSON.stringify(objForReport),
                        prClone: JSON.stringify(prClone),
                    }

                )

            }




        })


    }
}




// **************************//////////report**********************
// **************************//////////report**********************
// **************************//////////report**********************
export function deleteReport(index, reportKey, jobkeys, cloneReport, navigation) {
    return dispatch => {

        let userId = firebase.auth().currentUser.uid;
        cloneReport.splice(index, 1)

        console.log(userId, cloneReport, index, "afffffffffffffffffffffffffff")

        firebase.database().ref("/report/" + userId + '/' + jobkeys + "/" + reportKey).remove()
            .then(() => {
                // navigation.push("UserHome")
                dispatch({ type: ActionTypes.ALLREPORTS, payload: cloneReport })

            })


    }

}



// *********************************************///report*****************************
// *********************************************///report*****************************

export function getJobsList(navigation) {
    return dispatch => {
        let jobListArr = [];
        let jobkey = [];
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/jobs/' + userId + '/').once('value', (Snapshot) => {
            let obj = Snapshot.val();
            console.log(Snapshot.val(), "aaaaaaaaaaaaadadaaaaaaaaaaaaaaa")
            for (var key in obj) {
                obj[key].jobId = key
                // jobkey = key
                // jobkey.push(key)
                jobListArr.push(obj[key])
            }

            jobListArr.sort(
                function (a, b) {
                    // console.log(a.reportDate,b,"abab")
                    return b.jobDate - a.jobDate
                }
            );
            for (var i = 0; i < jobListArr.length; i++) {
                console.log(jobListArr[i].jobId, "assss")
                jobkey.push(jobListArr[i].jobId)


            }
            console.log(jobkey, 'jobkeyyyyyyyyyyyy ');
            console.log(jobListArr, "actionnnnnnnnnnnnnnnnnnnnn")

            dispatch({ type: ActionTypes.POSTJOBS, payload: jobListArr })
            dispatch({ type: ActionTypes.JOBKEYS, payload: jobkey })
        })


        // let jobListArr = [];
        console.log(userId, 'userId ');

        firebase.database().ref('/pre-registration/' + userId + '/').once('value', (Snapshot) => {

        })
            .then((succes) => {
                console.log(succes.val(), "successsssssssssssss")
                let objPreRegistration = succes.val();
                dispatch({ type: ActionTypes.PREREGISTRATION, payload: objPreRegistration })
            })
            .catch((error) => {
                var errorMessage = error.message;

                // console.log(error)

                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })
        // firebase.database().ref('/report/' + '/').once('value', (Snapshot) => {

        // })
        //     .then((succes) => {
        //         console.log(succes.val(), "reportreport")
        //     })
        // let objPreRegistration = succes.val();
        // dispatch({ type: ActionTypes.PREREGISTRATION, payload: objPreRegistration })
        // .catch((error) => {
        //     var errorMessage = error.message;

        //     // console.log(error)

        //     dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
        //     setTimeout(() => {
        //         dispatch({ type: ActionTypes.HIDEERROR })
        //     }, 3000)
        // })




        navigation.navigate("CompanyHome")
    }
}




//////////////////user home page start//////////////////////////////
export function getJobsListInUser(navigation) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })

        let allJobListArr = [];
        let jobkey = [];
        // let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/jobs/' + '/').once('value', (Snapshot) => {
        })
            .then((succes) => {
                let obj = succes.val();

                Object.keys(obj).map((userIds, index) => {
                    // console.log(userIds, "aaaaaaaaaaaaa5aaaaaaaaaaaaaa")

                    for (var key in obj[userIds]) {
                        obj[userIds][key].jobId = key
                        // jobkey = key
                        // jobkey.push(key)
                        allJobListArr.push(obj[userIds][key])
                    }
                    console.log(jobkey, 'jobkeyyyyyyyyyyyy ');



                })

                allJobListArr.sort(
                    function (a, b) {
                        // console.log(a.reportDate,b,"abab")
                        return b.jobDate - a.jobDate
                    }
                );

                for (var i = 0; i < allJobListArr.length; i++) {
                    console.log(allJobListArr[i].jobId, "assss")
                    jobkey.push(allJobListArr[i].jobId)


                }

                console.log(allJobListArr, "aaaaaaaaaaaaa5aaaaaaaaaaaaaa")
                dispatch({ type: ActionTypes.ALLJOBS, payload: allJobListArr })
                dispatch({ type: ActionTypes.ALLJOBKEYS, payload: jobkey })


                // console.log(Snapshot.val(), "aaaaaaaaaaaaa5aaaaaaaaaaaaaa")

                // if (obj !== null && obj !== undefined) {

                //     Object.keys(obj).map((userIds, index) => {
                //         // console.log(userIds, "aaaaaaaaaaaaa5aaaaaaaaaaaaaa")

                //         for (var key in obj[userIds]) {
                //             obj[userIds][key].jobId = key
                //             // jobkey = key
                //             // jobkey.push(key)
                //             allJobListArr.push(obj[userIds][key])
                //         }
                //         console.log(jobkey, 'jobkeyyyyyyyyyyyy ');



                //     })

                //     allJobListArr.sort(
                //         function (a, b) {
                //             // console.log(a.reportDate,b,"abab")
                //             return b.jobDate - a.jobDate
                //         }
                //     );

                //     for (var i = 0; i < allJobListArr.length; i++) {
                //         console.log(allJobListArr[i].jobId, "assss")
                //         jobkey.push(allJobListArr[i].jobId)


                //     }

                //     dispatch({ type: ActionTypes.ALLJOBS, payload: allJobListArr })
                //     dispatch({ type: ActionTypes.ALLJOBKEYS, payload: jobkey })
                // }
            })
            .catch((succes) => {
            })

        firebase.database().ref('/pre-registration/' + '/').once('value', (Snapshot) => {


        })
            .then((succes) => {
                console.log(succes.val(), "successsssssssssssss")
                let objAllPreRegistration = succes.val();
                let objAllPreRegistrationForUser = {}
                if (objAllPreRegistration !== null && objAllPreRegistration !== undefined) {

                    Object.keys(objAllPreRegistration).map((userIds, index) => {
                        console.log(userIds, 'user ki id');
                        for (var key in objAllPreRegistration[userIds]) {
                            objAllPreRegistrationForUser[key] = objAllPreRegistration[userIds][key]

                            console.log(key, 'job ki id');
                        }





                    })
                    console.log(objAllPreRegistrationForUser, 'objAllPreRegistrationForUser');





                    dispatch({ type: ActionTypes.ALLPREREGISTRATION, payload: objAllPreRegistrationForUser })
                }

            })
            .catch((error) => {
                // var errorMessage = error.message;

                // // console.log(error)

                // dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                // setTimeout(() => {
                //     dispatch({ type: ActionTypes.HIDEERROR })
                // }, 3000)
            })

        firebase.database().ref('/report/' + '/').once('value', (Snapshot) => {
        })
            .then((succes) => {
                let userId = firebase.auth().currentUser.uid;
                let objForReport = succes.val();
                let reportDataArr = []
                console.log(objForReport, "assssssss")
                if (objForReport !== null && objForReport !== undefined && objForReport[userId] !== null && objForReport[userId] !== undefined) {
                    Object.keys(objForReport[userId]).map((jobkey, index) => {
                        console.log(jobkey, "bittu")
                        Object.keys(objForReport[userId][jobkey]).map((reportkey, index) => {
                            console.log(reportkey, "reportkey")
                            objForReport[userId][jobkey][reportkey].reportKey = reportkey
                            // reportkey.reportKey = reportkey

                            // let reportObj = objForReport[userId][jobkey]
                            // for(key in reportObj ){
                            //     key.reportKey = reportkey


                            // }
                            reportDataArr.push(objForReport[userId][jobkey][reportkey])

                        })


                    })
                    console.log(reportDataArr, "444444444444444")
                    reportDataArr.sort(
                        function (a, b) {
                            // console.log(a.reportDate,b,"abab")
                            return b.reportDate - a.reportDate
                        }
                    );
                    console.log(reportDataArr, "reportDataArrreportDataArr")



                    // dispatch({ type: ActionTypes.LOADER })

                    dispatch({ type: ActionTypes.ALLREPORTS, payload: reportDataArr })

                }
            })
            .catch(() => {
                // dispatch({ type: ActionTypes.LOADER })

                // navigation.navigate("UserHome")

            })
        dispatch({ type: ActionTypes.LOADER })

        navigation.navigate("UserHome")



        //     // console.log(userIds, "aaaaaaaaaaaaa5aaaaaaaaaaaaaa")

        //     for (var key in obj[userIds]) {
        //         obj[userIds][key].jobId = key
        //         // jobkey = key
        //         jobkey.push(key)
        //         allJobListArr.push(obj[userIds][key])
        //     }
        //     console.log(jobkey, 'jobkeyyyyyyyyyyyy ');



        // })

        // dispatch({ type: ActionTypes.ALLJOBS, payload: allJobListArr })
        // console.log(allJobListArr, "allJobListArrallJobListArr")






    }
}



















export function delPost(key, navigation, jobListArr) {
    return dispatch => {
        let userId = firebase.auth().currentUser.uid;
        console.log(userId, "afffffffffffffffffffffffffff")


        firebase.database().ref("/jobs/" + userId + '/' + key).remove()
            .then((v) => {
                firebase.database().ref("/pre-registration/" + userId + '/' + key).remove()


                // alert("post has been deleted");
                console.log('unde', jobListArr, 'jobListArr', key, v);

                let indexToDelete;

                for (var i = 0; i < jobListArr.length; i++) {
                    var jobId = jobListArr[i].jobId;
                    if (jobId === key) {
                        indexToDelete = i;
                    }
                    break;
                }
                jobListArr.splice(indexToDelete, 1);

                dispatch({ type: ActionTypes.POSTJOBS, payload: jobListArr })

                alert(strInReqLan.postHasBeenDlt)

                navigation.push("CompanyHome");

            })

            .catch((error) => {
                var errorMessage = error.message;
                alert(error)

                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })



    }

}


export function editPost(updatedPost, type, navigation, date, key) {
    return dispatch => {

        // dispatch({ type: ActionTypes.LOADER })
        if (updatedPost.jobTitle === "" || updatedPost.email === "" || updatedPost.responsibleName === "" ||
            updatedPost.responsibleNumber === "" || updatedPost.contractNoOfJob === "" || updatedPost.address === ""
            || updatedPost.begginingDate === "" || updatedPost.expTermDate === "" || updatedPost.serEmail === "" || updatedPost.serResName === ""
            || updatedPost.serResNum === "" || updatedPost.serStatus === "" || updatedPost.serTitle === "" || updatedPost.type === ""

        ) {
            dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.allFields })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
        else {


            console.log(updatedPost, key)

            // dispatch({ type: ActionTypes.LOADER })
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref("/jobs/" + userId + '/' + key).set(updatedPost)
                .then(() => {






                    let jobListArr = [];
                    let jobkey = [];
                    let userId = firebase.auth().currentUser.uid;
                    firebase.database().ref('/jobs/' + userId + '/').once('value', (Snapshot) => {
                        let obj = Snapshot.val();
                        console.log(Snapshot.val(), "aaaaaaaaaaaaadadaaaaaaaaaaaaaaa")
                        for (var key in obj) {
                            obj[key].jobId = key
                            // jobkey = key
                            // jobkey.push(key)
                            jobListArr.push(obj[key])
                        }

                        jobListArr.sort(
                            function (a, b) {
                                // console.log(a.reportDate,b,"abab")
                                return b.jobDate - a.jobDate
                            }
                        );
                        for (var i = 0; i < jobListArr.length; i++) {
                            console.log(jobListArr[i].jobId, "assss")
                            jobkey.push(jobListArr[i].jobId)


                        }
                        console.log(jobkey, 'jobkeyyyyyyyyyyyy ');
                        console.log(jobListArr, "actionnnnnnnnnnnnnnnnnnnnn")

                        dispatch({ type: ActionTypes.POSTJOBS, payload: jobListArr })
                        dispatch({ type: ActionTypes.JOBKEYS, payload: jobkey })
                    })

























                    // dispatch({ type: ActionTypes.POSTJOBS, payload: updatedPost })
                    alert(strInReqLan.postHasBeenEdt)
                    dispatch({ type: ActionTypes.LOADER })

                    navigation.navigate("CompanyHome");

                    // dispatch({ type: ActionTypes.LOADER })

                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        }





    }

}




export function setIndex(index, navigation, jobView, jobKeys, prClone, ) {
    console.log(index, navigation, jobView, jobKeys, prClone, "setindddex")

    let reportArr = []
    return dispatch => {
        console.log(jobView, prClone, "sasa")

        firebase.database().ref('/report/' + '/').once('value', (Snapshot) => {
            // console.log(Snapshot.val(), "reporttt")
            let report = Snapshot.val()
            console.log(report, "repoooorrt")

            if (report !== null) {
                Object.keys(report).map((userIds, index) => {
                    Object.keys(report[userIds]).map((jobkeyss, index) => {
                        console.log(jobkeyss, "jobkeyssjobkeyssjobkeyss")
                        if (jobkeyss === jobKeys) {
                            console.log(report[userIds][jobkeyss], "4545")
                            for (var key in report[userIds][jobkeyss]) {
                                console.log(key, "reportkeyyyy")
                                reportObj = report[userIds][jobkeyss][key]
                                reportArr.push(reportObj)

                            }


                        }

                    })

                })
            }
            else {

                console.log(reportArr, "reportArrreportArr")
            }

            reportArr.sort(
                function (a, b) {
                    console.log(a.reportDate, b, "abab")
                    return b.reportDate - a.reportDate
                }
            );
            console.log(reportArr, "reportArrreportArr")
        })
            .then(() => {
                dispatch({ type: ActionTypes.LOADER })

                dispatch({ type: ActionTypes.INDEX, payload: index })

                if (prClone !== undefined && reportArr.length !== 0) {
                    console.log("if")
                    navigation.navigate("FullCard",
                        {
                            vewJob: JSON.stringify(jobView),
                            viewPr: JSON.stringify(prClone),
                            viewReport: JSON.stringify(reportArr)
                        }

                    )
                }
                else if (prClone !== undefined) {
                    console.log("else if")
                    navigation.navigate("FullCard",
                        {
                            vewJob: JSON.stringify(jobView),
                            viewPr: JSON.stringify(prClone),
                            viewReport: []
                        }

                    )
                }
                else if (reportArr.length !== 0) {
                    console.log("else if2")
                    navigation.navigate("FullCard",
                        {
                            vewJob: JSON.stringify(jobView),
                            viewPr: undefined,
                            viewReport: JSON.stringify(reportArr)
                        }

                    )
                }
                else {
                    console.log("else")
                    navigation.navigate("FullCard",
                        {
                            vewJob: JSON.stringify(jobView),
                            viewPr: undefined,
                            viewReport: []

                        }

                    )

                }

            })
            .catch(() => { })

    }
}

export function setIndexForUser(index, navigation, jobView, prClone) {
    return dispatch => {
        if (prClone !== undefined) {
            navigation.("userFullCard",
                {
                    vewJob: JSON.stringify(jobView),
                    viewPr: JSON.stringify(prClone)
                }

            )
        }
        else {
            navigation.navigate("userFullCard",
                {
                    vewJob: JSON.stringify(jobView),
                    viewPr: undefined,

                }

            )

        }


        dispatch({ type: ActionTypes.LOADER })


        // dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })

    }
}






// export function prClone( prClone) {
//     return dispatch => {


//     }
// }










export function logOut(navigation) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })

        firebase.auth().signOut()
            .then(() => {

                dispatch({ type: ActionTypes.LOADER })
                navigation.push("Signin");


            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })
    }
}






export function createDropDownOption(dObj, headingType, jobId) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        if (dObj.createOption === "") {
            alert("please type")
            dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.allFields })
            setTimeout(() => {
                dispatch({ type: ActionTypes.HIDEERROR })
            }, 3000)
        }
        else {
            let userId = firebase.auth().currentUser.uid;
            let cloneHeadingPath;
            cloneHeadingPath = "/pre-registration/" + userId + '/' + jobId + '/' + headingType + '/';
            firebase.database().ref(cloneHeadingPath).set(dObj)
                .then(() => {
                    // dispatch({ type: ActionTypes.POSTJOBS, payload: updatedPost })

                    console.log("**********************");
                    dispatch(setDefaultPROptionsInStore(dObj[headingType]))


                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.HIDEERROR })
                    }, 3000)
                })
        }
    }
}





export function loaderStart() {
    return dispatch => {
        dispatch({ type: ActionTypes.LOADER })
        console.log("function chalu")
    }
}




export function saveUserPRDropDown(dObj, jobId, prAdditionalData, immageArr, navigation) {
    return dispatch => {
        console.log(dObj, "dobjjjjjjjjjjjjjjjjj")
        // dispatch({ type: ActionTypes.LOADER })


        // var validFlag = true;
        // var validSelection = false;
        // var invalidFieldName;
        // for (var optionNames in dObj) {


        //     let optionNameArr = dObj[optionNames];
        //     let eachOptionValid = true;
        //     for (var i = 0; i < optionNameArr.length; i++) {
        //         let eachOptions = optionNameArr[i];
        //         for (var prop in eachOptions) {
        //             if (eachOptions[prop] === undefined || eachOptions[prop] === "") {
        //                 validFlag = false
        //                 invalidFieldName = optionNames
        //             }
        //         }

        //         if (eachOptions['selected'] !== true) {
        //             eachOptionValid = false;
        //         }



        //     }
        //     if (eachOptionValid === true) {
        //         validSelection = true;
        //     }

        // }


        // console.log(validFlag,"***")
        // console.log(validSelection,"***")

        let userId = firebase.auth().currentUser.uid;
        let cloneHeadingPath;
        let userEmail = firebase.auth().currentUser.email
        cloneHeadingPath = "/pre-registration/" + userId + '/' + jobId + '/';
        // console.log(cloneHeadingPath, dObj, '55555555555555555555555555')
        firebase.database().ref(cloneHeadingPath).set(dObj)
            .then(() => {




                firebase.database().ref('/pre-registration/' + userId + '/').once('value', (Snapshot) => {

                })
                    .then((succes) => {
                        console.log(succes.val(), "successsssssssssssss")
                        let objPreRegistration = succes.val();
                        dispatch({ type: ActionTypes.PREREGISTRATION, payload: objPreRegistration })
                    })
                    .catch((error) => {
                        // var errorMessage = error.message;

                        // // console.log(error)

                        // dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                        // setTimeout(() => {
                        //     dispatch({ type: ActionTypes.HIDEERROR })
                        // }, 3000)
                    })









                dispatch({ type: ActionTypes.SETDEFDROPDOWNOPTIONS, payload: dObj })
                // alert(strInReqLan.prRegistrationIsPosted)
                // navigation.push("CompanyHome");
                alert(strInReqLan.prRegistrationIsPosted)
                navigation.navigate("CompanyHome");

                sendPrDataInEmailAPI(userEmail, dObj)
                console.log(dObj, "dadadadadadad")
                    .then((succes) => {


                        console.log(dObj, "aftermail function")
                    })

                dispatch({ type: ActionTypes.LOADER })
                // dispatch({ type: ActionTypes.POSTJOBS, payload: updatedPost })
                // dispatch(setPrAdditionalData(prAdditionalData, userId, jobId))

            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
                setTimeout(() => {
                    dispatch({ type: ActionTypes.HIDEERROR })
                }, 3000)
            })

        // dispatch({ type: ActionTypes.LOADER })

        // if (

        //     // validFlag === false ||
        //     // validSelection === false 


        //     prAdditionalData.amountOfTeam === "" ||
        //     prAdditionalData.amountOfMaterial === "" ||
        //     prAdditionalData.serviceYouHaveDone === "" ||
        //     prAdditionalData.dateAndTimeStart === "" ||
        //     prAdditionalData.dateAndTimeEnd === "" ||
        //     prAdditionalData.customersOsNumber === "" ||
        //     prAdditionalData.codeOrOmFromTheCustomer === "" ||
        //     prAdditionalData.requestedService === "" ||
        //     prAdditionalData.generalObservations === "" ||

        //     ////////////////////////////for service conditions////////////////////////////////
        //     prAdditionalData.overtimeReason === "" ||
        //     prAdditionalData.kmReport === "" ||
        //     prAdditionalData.reportTheDates === "" ||
        //     prAdditionalData.reportTheCID === "" ||
        //     prAdditionalData.discribeWhenMarkedAbove === "" ||
        //     prAdditionalData.generalObservations === "" ||
        //     prAdditionalData.amountOfwhichSafetyEquipment === "" ||
        //     prAdditionalData.amountOfwhichToolIsNeeded === "" ||
        //     prAdditionalData.amountOfwhichEquipmentIsNeeded === ""





        // ) {
        //     // alert(strInReqLan.allFields)
        //     dispatch({ type: ActionTypes.SHOWERROR, payload: strInReqLan.allFields })
        //     setTimeout(() => {
        //         dispatch({ type: ActionTypes.HIDEERROR })
        //     }, 3000)
        // }
        // else {



        // }
    }
}


// export function setPrAdditionalData(prAdditionalData, userId, jobId) {
//     // console.log("function chaluuu hai mamu k larkry", prAdditionalData, userId, jobId)
//     dispatch({ type: ActionTypes.LOADER })
//     return dispatch => {
//         firebase.database().ref('/pre-registration/' + userId + '/' + jobId + '/pre-reg-additional data').set(prAdditionalData)
//             .then(() => {
//                 console.log('saved');
//                 alert('saved');
//                 dispatch({ type: ActionTypes.LOADER })
//                 dispatch({ type: ActionTypes.PRADDIONALDATA, payload: prAdditionalData })
//             })
//             .catch((error) => {
//                 var errorMessage = error.message;
//                 // console.log(errorMessage);
//                 dispatch({ type: ActionTypes.SHOWERROR, payload: errorMessage })
//                 setTimeout(() => {
//                     dispatch({ type: ActionTypes.HIDEERROR })
//                 }, 3000)
//             })
//     }
// }


export function saveInputFormsOptions(selectedJob, type, navigation) {
    console.log(selectedJob, "**********55*************")

    return dispatch => {
        // dispatch({ type: ActionTypes.LOADER })

        // console.log(type, "******************ty")
        let userId = firebase.auth().currentUser.uid;
        let jobId = JSON.parse(selectedJob).jobId;
        // console.log(userId, jobId, '8888888')
        firebase.database().ref('/pre-registration/' + userId + '/' + jobId + '/').once('value')
            .then((inputFormsSnapshot) => {
                let inputForms = inputFormsSnapshot.val();
                dispatch({ type: ActionTypes.SELECTEDJOB, payload: JSON.parse(selectedJob) })
                if (inputForms !== null) {
                    console.log('input forms found', inputForms);
                    dispatch(setDefaultPROptionsInStore(inputForms, type, navigation))
                    // dispatch({ type: ActionTypes.LOADER })

                }
                else {
                    if (type === "Administrative services" || type === "Serviços administrativos") {
                        var dropDownOptions = makeDropDownObjectForSer();
                        console.log(dropDownOptions, "5555555555555555555555")

                        dispatch(createDefaultPROptions(dropDownOptions, userId, jobId, type));
                        // dispatch({ type: ActionTypes.LOADER })
                        // navigation.navigate("RegisterService")




                    }
                    else {
                        var dropDownOptions = makeDropDownObject();
                        dispatch(createDefaultPROptions(dropDownOptions, userId, jobId, type));
                        // dispatch({ type: ActionTypes.LOADER })
                        // navigation.navigate("Register")
                        console.log(dropDownOptions, "5555555555555555555555")




                    }




                }
                dispatch({ type: ActionTypes.LOADER })

            })
            .catch((err) => {
                console.log(err, 'inside first firebase check')
            })
    }

}


export function createDefaultPROptions(dropDownOptions, UID, jobID, type, navigation) {
    // console.log("function chaluuu")

    return dispatch => {
        console.log('/pre-registration/' + UID + '/' + jobID + '/', dropDownOptions, "***********///////")

        firebase.database().ref('/pre-registration/' + UID + '/' + jobID + '/').set(dropDownOptions)
            .then(() => {
                // console.log('saved');
                dispatch(setDefaultPROptionsInStore(dropDownOptions, type, navigation));


            })
            .catch((err) => {
                console.log(err, 'inside second firebase check')
            })
    }
}


export function makeDropDownObject() {
    return {
        [strInReqLan.reportThat]: [
            {
                optionName: "A",
                selected: false
            },
            {
                optionName: "B",
                selected: false
            },
            {
                optionName: "C",
                selected: false
            },
            {
                optionName: "D",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            },


        ]

        ,
        [strInReqLan.discipline]: [
            {
                optionName: "Elétrica",
                selected: false
            },
            {
                optionName: "TI",
                selected: false
            },
            {
                optionName: "CFTV",
                selected: false
            },
            {
                optionName: "Civil / Alvenaria",
                selected: false
            },
            {
                optionName: "Pintura",
                selected: false
            },
            {
                optionName: "Mecânica",
                selected: false
            },
            {
                optionName: "Refrigeração",
                selected: false
            },
            {
                optionName: "Todas disciplinas",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            },


        ]
        ,
        [strInReqLan.requestThat]: [
            {
                optionName: "A",
                selected: false
            },
            {
                optionName: "B",
                selected: false
            },
            {
                optionName: "C",
                selected: false
            },
            {
                optionName: "D",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            },


        ]
        ,
        [strInReqLan.requester]: [

            {
                optionName: "JOÃO",
                selected: false
            },
            {
                optionName: "PAULO",
                selected: false
            },
            {
                optionName: "PEDRO",
                selected: false
            },
            {
                optionName: "LUCAS",
                selected: false
            },
        ]
        ,
        [strInReqLan.occurrence]: [
            {
                optionName: "11",
                selected: false
            },
            {
                optionName: "12",
                selected: false
            },
            {
                optionName: "13",
                selected: false
            },
            {
                optionName: "14",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            },


        ],
        [strInReqLan.area_tag_local]: [
            {
                optionName: "Cais",
                selected: false
            },

            {
                optionName: "Administrativo",
                selected: false
            },
            {
                optionName: "Oficina",
                selected: false
            },
        ],
        [strInReqLan.specialEquipmentApplied]: [
            {
                optionName: "PTA",
                selected: false
            },
            {
                optionName: "Caminhão munck",
                selected: false
            },
            {
                optionName: "Caminhão sugador",
                selected: false
            },
            {
                optionName: "Ferramentas do contratos",
                selected: false
            },

        ],
        [strInReqLan.interventionType]: [
            {
                optionName: "Preventivo",
                selected: false
            },
            {
                optionName: "Corretivo",
                selected: false
            },
            {
                optionName: "Acompanhar terceiros",
                selected: false
            },
            {
                optionName: "Criando Obra / Contratos",
                selected: false
            },
            {
                optionName: "Serviços internos administrativos",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            },
        ],


        //////////////////////////////////multiple selection//////////////////////////////////
        [strInReqLan.team]: [
            {
                optionName: "Maria",
                selected: false
            },
            {
                optionName: "Paula",
                selected: false
            },
            {
                optionName: "Tamires",
                selected: false
            },
            {
                optionName: "Douglas",
                selected: false
            },
            {
                optionName: "Eletricistas",
                selected: false
            },
            {
                optionName: "Mecânicos",
                selected: false
            },
            {
                optionName: "Pintor",
                selected: false
            },
            {
                optionName: "Pedreiros",
                selected: false
            },

            {
                optionName: strInReqLan.DontApply,
                selected: false
            },

        ],



        [strInReqLan.climate]: [
            {
                optionName: "Sol",
                selected: false
            },
            {
                optionName: "Nublado",
                selected: false
            },
            {
                optionName: "Chuvoso",
                selected: false
            },

            {
                optionName: "Criando Obra / Contratos",
                selected: false
            },


        ],





        [strInReqLan.thereWasADelay]: [
            {
                optionName: "Sim",
                selected: false
            },
            {
                optionName: "Não",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            },
        ],


        [strInReqLan.applicationScheme]: [
            {
                optionName: "Programado",
                selected: false
            },
            {
                optionName: "Urgente",
                selected: false
            },
            {
                optionName: "Atendimento em plantão",
                selected: false
            },
            {
                optionName: "Hora extra - urgente",
                selected: false
            },
            {
                optionName: "Hora extra - programada",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            },

        ],



        [strInReqLan.delayedTime]: [
            {
                optionName: "20 minutos",
                selected: false
            },
            {
                optionName: "30 minutos",
                selected: false
            },
            {
                optionName: "50 minutos",
                selected: false
            },
            {
                optionName: "1 hora",
                selected: false
            },
            {
                optionName: "2 horas",
                selected: false
            },
            {
                optionName: "3 horas",
                selected: false
            },
            {
                optionName: "4 horas",
                selected: false
            },
            {
                optionName: "5 horas",
                selected: false
            },
            {
                optionName: "6 horas",
                selected: false
            },
            {
                optionName: "7 horas",
                selected: false
            },
            {
                optionName: "8 horas",
                selected: false
            },
            {
                optionName: "9 horas",
                selected: false
            },
            {
                optionName: "10 horas",
                selected: false
            },
            {
                optionName: "11 horas",
                selected: false
            },
            {
                optionName: "12 horas",
                selected: false
            },
            {
                optionName: "13 horas",
                selected: false
            },
            {
                optionName: "14 horas",
                selected: false
            },

            {
                optionName: strInReqLan.DontApply,
                selected: false
            }
        ],



        [strInReqLan.scope]: [
            {
                optionName: "Dentro do escopo",
                selected: false
            },
            {
                optionName: "Fora do escopo",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            }
        ],

        [strInReqLan.materialApplie]: [

            {
                optionName: "Sim",
                selected: false
            },
            {
                optionName: "Não",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            },

        ],
        [strInReqLan.materialAvailable]: [
            {
                optionName: "Sim",
                selected: false
            },
            {
                optionName: "Não",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            },
        ],
        [strInReqLan.timeSpent]: [
            {
                optionName: "20 minutos",
                selected: false
            },
            {
                optionName: "30 minutos",
                selected: false
            },
            {
                optionName: "50 minutos",
                selected: false
            },
            {
                optionName: "1 hora",
                selected: false
            },
            {
                optionName: "2 horas",
                selected: false
            },
            {
                optionName: "3 horas",
                selected: false
            },
            {
                optionName: "4 horas",
                selected: false
            },
            {
                optionName: "5 horas",
                selected: false
            },
            {
                optionName: "6 horas",
                selected: false
            },
            {
                optionName: "7 horas",
                selected: false
            },
            {
                optionName: "8 horas",
                selected: false
            },
            {
                optionName: "9 horas",
                selected: false
            },
            {
                optionName: "10 horas",
                selected: false
            },
            {
                optionName: "11 horas",
                selected: false
            },
            {
                optionName: "12 horas",
                selected: false
            },
            {
                optionName: "13 horas",
                selected: false
            },
            {
                optionName: "14 horas",
                selected: false
            },

            {
                optionName: strInReqLan.DontApply,
                selected: false
            }
        ],
        [strInReqLan.numberOfProfessionalsInvolved]: [
            {
                optionName: "1",
                selected: false
            },
            {
                optionName: "2",
                selected: false
            },
            {
                optionName: "3",
                selected: false
            },
            {
                optionName: "4",
                selected: false
            },
            {
                optionName: "5",
                selected: false
            },
            {
                optionName: "6",
                selected: false
            },
            {
                optionName: "7",
                selected: false
            },
            {
                optionName: "8",
                selected: false
            },
            {
                optionName: "9",
                selected: false
            },
            {
                optionName: "10",
                selected: false
            },

            {
                optionName: "Não se aplica",
                selected: false
            }
        ],



        [strInReqLan.reasonForDelay]: [

            {
                optionName: "Operação do cliente",
                selected: false
            },

            {
                optionName: "PTA com defeito",
                selected: false
            },

            {
                optionName: "Abandono de área",
                selected: false
            },

            {
                optionName: "Chuva pela manhã",
                selected: false
            },
            {
                optionName: "Chuva pela tarde",
                selected: false
            },
            {
                optionName: "Chuva intermitente",
                selected: false
            },
            {
                optionName: "Chuva durante todo dia",
                selected: false
            },
            {
                optionName: "Falta de equipamento",
                selected: false
            },
            {
                optionName: "Falta de energia",
                selected: false
            },
            {
                optionName: "Reparo de equipamento",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            }
        ],



        [strInReqLan.inspectionResponsibleName]: [

            {
                optionName: "TIÃO",
                selected: false
            },
            {
                optionName: "RODRIGO",
                selected: false
            },
            {
                optionName: "WALACE",
                selected: false
            },
            {
                optionName: "VILMAR",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            }
        ],


        [strInReqLan.inspectionResults]: [

            {
                optionName: "Aprovado",
                selected: false
            },
            {
                optionName: "Reprovado",
                selected: false
            },
            {
                optionName: "Em observação",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            }
        ],
        [strInReqLan.reInspectionResults]: [
            {
                optionName: "Aprovado",
                selected: false
            },
            {
                optionName: "Reprovado",
                selected: false
            },
            {
                optionName: "Em observação",
                selected: false
            },
            {
                optionName: "Não se aplica",
                selected: false
            }
        ],
        [strInReqLan.material]: [
            {
                optionName: "Fio elétrico",
                selected: false
            },
            {
                optionName: "Graxa",
                selected: false
            },
            {
                optionName: "Porca",
                selected: false
            },
            {
                optionName: "Tomada",
                selected: false
            },
            {
                optionName: "Galvanizado",
                selected: false
            },
            {
                optionName: "Tubo",
                selected: false
            },
            {
                optionName: "Prego",
                selected: false
            }
        ],
        [strInReqLan.additionalInformation]: [
            {
                optionName: strInReqLan.DontApply,
                selected: false
            }
        ]
    }
}
export function makeDropDownObjectForSer() {
    console.log("hello service")
    return {
        //////////////////////////////////administrative//////////////////////////////////
        [strInReqLan.overtimeSolicitorsName]: [
            {
                optionName: "CASSIO",
                selected: false
            },
            {
                optionName: "SILAS",
                selected: false
            },
            {
                optionName: "GIOVANNI",
                selected: false
            },
            {
                optionName: "ALAN",
                selected: false
            },
            {
                optionName: "GILDO",
                selected: false
            }
        ],

        [strInReqLan.applicationScheme]: [
            {
                optionName: "EMERGENCY",
                selected: false
            },
            {
                optionName: "SCHEDULED",
                selected: false
            },
        ],

        [strInReqLan.whoIsYourLeader]: [
            {
                optionName: "douglas.seitec@gmail.com",
                // optionName: "DOUGLAS.SEITEC@GMAIL.COM",
                selected: false
            },
            {
                optionName: "carlos.seitec@gmail.com",
                // optionName: "CARLOS.SEITEC@GMAIL.COM",
                selected: false
            },
            {
                optionName: "aracrua.seitec@gmail.com",
                // optionName: "ARACRUA.SEITEC@GMAIL.COM" ,
                selected: false
            }
        ],
        [strInReqLan.area_tag_local]: [
            {
                optionName: "TMP",
                selected: false
            },
            {
                optionName: "TMC",
                selected: false
            },
            {
                optionName: "FIBRIA INDIISTRIAL",
                selected: false
            },
            {
                optionName: "PORTOCEL",
                selected: false
            },
            {
                optionName: "FIBRIA COPM",
                selected: false
            },
            {
                optionName: "FIBRIA COCO",
                selected: false
            },
            {
                optionName: "VICEIRO ARACRUZZ",
                selected: false
            },
            {
                optionName: "VIVERIRO HELVECIA",
                selected: false
            },
            {
                optionName: "OUTRO",
                selected: false
            },
            {
                optionName: strInReqLan.DontApply,
                selected: false
            }

        ],
        [strInReqLan.externalService]: [

            {
                optionName: "WASH",
                selected: false
            },
            {
                optionName: "FUEL",
                selected: false
            },
            {
                optionName: "WORKSHOP",
                selected: false
            },
            {
                optionName: "OTHER",
                selected: false
            },
        ],
        [strInReqLan.vehicle]: [
            {
                optionName: "UNO 2132",
                selected: false
            },
            {
                optionName: "UNO 2134",
                selected: false
            },
            {
                optionName: "UNO 0975",
                selected: false
            },
            {
                optionName: "UNO 4925",
                selected: false
            },
            {
                optionName: "STRADA 5516",
                selected: false
            },
            {
                optionName: "STRADA 4804",
                selected: false
            },
            {
                optionName: "OTHER",
                selected: false
            }

        ],
        [strInReqLan.returnToArea]: [

            {
                optionName: "I TAKE IT BACK",
                selected: false
            },
            {
                optionName: "MUST PICK UP AT FUEL STATION",
                selected: false
            },
            {
                optionName: "MUST PICK UP AT WORKSHOP",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }

        ],
        [strInReqLan.whichCard_documentLost]: [
            {
                optionName: "HEALTH PLAN CARD",
                selected: false
            },
            {
                optionName: "LIFE INSURANCE",
                selected: false
            },
        ],


        [strInReqLan.urgencyReport]: [
            {
                optionName: "IT IS URGENT",
                selected: false
            },
            {
                optionName: "IT IS NOT URGENT",
                selected: false
            },
            {
                optionName: "IT CAN WAIT FOR 5 DAYS",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }

        ],
        [strInReqLan.additionalInformation]: [
            {
                optionName: "SIDE A",
                selected: false
            },
            {
                optionName: "SIDE B",
                selected: false
            },
            {
                optionName: strInReqLan.DontApply,
                selected: false
            }
        ],
        [strInReqLan.defectThatNeed]: [
            {
                optionName: "FRONT TIRE EMPTYING".toLowerCase(),
                selected: false
            },
            {
                optionName: "CHANGE LUBRICANT OIL".toLowerCase(),
                selected: false
            },
            {
                optionName: "BURNED HEADLIGHT".toLowerCase(),
                selected: false
            },
            {
                optionName: "LAKING TIRE IRON".toLowerCase(),
                selected: false
            },
            {
                optionName: "ALIGN AND BALANCE".toLowerCase(),
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED".toLowerCase(),
                selected: false
            }
        ],
        [strInReqLan.nameOfWhoAuthorized]: [

            {
                optionName: "PEDRO",
                selected: false
            },
            {
                optionName: "PAULO",
                selected: false
            },
            {
                optionName: "MANOEL",
                selected: false
            },
            {
                optionName: "WALACE",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            },

        ],
        [strInReqLan.item1RequestReason]: [

            {
                optionName: "DO NOT HAVE IT",
                selected: false
            },
            {
                optionName: "RIPPED OFF",
                selected: false
            },
            {
                optionName: "BROKE",
                selected: false
            },
            {
                optionName: "LOST",
                selected: false
            },
            {
                optionName: "FELL IN THE SEA",
                selected: false
            },
            {
                optionName: "WRONG SIZE",
                selected: false
            },
            {
                optionName: "USE WEAR",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }

        ],
        [strInReqLan.whichSafetyEquipment]: [

            {
                optionName: "41 SIZEBOOTS".toLowerCase(),
                selected: false
            },
            {
                optionName: "SAFETY GLASSES".toLowerCase(),
                selected: false
            },
            {
                optionName: "SAFETY BELT".toLowerCase(),
                selected: false
            },
            {
                optionName: "PIGMENTED GLOVE".toLowerCase(),
                selected: false
            },


        ],
        [strInReqLan.whichToolIsNeeded]: [

            {
                optionName: "UNIVERSAL PLIERS".toLowerCase(),
                selected: false
            },
            {
                optionName: "CUTTING PLIERS".toLowerCase(),
                selected: false
            },
            {
                optionName: "LONG NOSE PLIERS".toLowerCase(),
                selected: false
            },
            {
                optionName: "SCREWDRIVER".toLowerCase(),
                selected: false
            },
        ],
        [strInReqLan.whichEquipmentIsNeeded]: [

            {
                optionName: "DRILLING MACHINE".toLowerCase(),
                selected: false
            },
            {
                optionName: "SANDER".toLowerCase(),
                selected: false
            },
            {
                optionName: "BREAKING HAMMER".toLowerCase(),
                selected: false
            },
            {
                optionName: strInReqLan.DontApply.toLowerCase(),
                selected: false
            },
        ],
        [strInReqLan.howMuchIsNeeded]: [

            {
                optionName: "FRONT TIRE EMPTYING".toLowerCase(),
                selected: false
            },
            {
                optionName: "CHANGE LUBRICANT OIL".toLowerCase(),
                selected: false
            },
            {
                optionName: "BURNED HEADLIGHT".toLowerCase(),
                selected: false
            },
            {
                optionName: "LACKING TIRE IRON".toLowerCase(),
                selected: false
            },
            {
                optionName: "ALIGN AND BALANCE".toLowerCase(),
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED".toLowerCase(),
                selected: false
            },

        ],
        [strInReqLan.whereDoYouLive]: [
            {
                optionName: "COQUEIRAL",
                selected: false
            },
            {
                optionName: "IBIRAÇU",
                selected: false
            },
            {
                optionName: "GURANA",
                selected: false
            },
            {
                optionName: "JOAO NEIVA",
                selected: false
            },
        ],
        [strInReqLan.didYouPreviouslyWarned]: [
            {
                optionName: "NO, I DID NOT",
                selected: false
            },
            {
                optionName: "YES, CARLOS",
                selected: false
            },
            {
                optionName: "YES, DOUGLAS",
                selected: false
            },
            {
                optionName: "YES, RODRIGO",
                selected: false
            }
        ],
        [strInReqLan.reasonOfTheAbsence]: [

            {
                optionName: "MEDICAL CERTIFICATE",
                selected: false
            },
            {
                optionName: "SURGERY",
                selected: false
            },
            {
                optionName: "DENTIST",
                selected: false
            },
            {
                optionName: "RELATIVE DEATH",
                selected: false
            },
            {
                optionName: "ATTEND THE JUDGE",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }
        ],
        [strInReqLan.howManyDaysOfAbscence]: [
            {
                optionName: "1 DAY",
                selected: false
            },
            {
                optionName: "2 DAY",
                selected: false
            },
            {
                optionName: "5 DAY",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }
        ],
        [strInReqLan.askFor]: [
            {
                optionName: "WATER",
                selected: false
            },
            {
                optionName: "LIGHT",
                selected: false
            },
            {
                optionName: "FUEL",
                selected: false
            },
        ],
        [strInReqLan.reportThat]: [
            {
                optionName: "LACK LOADING CARD",
                selected: false
            },
            {
                optionName: "LACK OF SPACE",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }
        ],
        [strInReqLan.requestThat]: [
            {
                optionName: "BE REVISED PAYMENT",
                selected: false
            },
            {
                optionName: "THAT BE REVISED BALANCE ON FOOD CARD",
                selected: false
            },
            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }
        ],
        [strInReqLan.warningThat]: [

            {
                optionName: "ANIMALS IN THE WORK",
                selected: false
            },
            {
                optionName: "HOLES ON THE TRACK",
                selected: false
            },
            {
                optionName: "OPTION NOT LISTED",
                selected: false
            },
        ],

        [strInReqLan.requiresThat]: [
            {
                optionName: "TRAVEL DAY REVIEW",
                selected: false
            },

            {
                optionName: "CHANGE MY AIR TICKET",
                selected: false
            },

            {
                optionName: "ANOTHER OPTION NOT LISTED",
                selected: false
            }
        ],
    }
}


export function setDefaultPROptionsInStore(dropDownOptions, type, navigation) {
    return dispatch => {
        dispatch({ type: ActionTypes.SETDEFDROPDOWNOPTIONS, payload: dropDownOptions })
        if (type === "Administrative services" || type === "Serviços administrativos") {
            navigation.push("RegisterService")
        }
        else {
            navigation.push("Register")
        }

    }
}


