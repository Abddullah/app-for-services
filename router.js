// import { StackNavigator } from "react-navigation"
import {
    createSwitchNavigator,
    createStackNavigator,
    StackNavigator
} from "react-navigation";// import SignUp from "./src/component/signup"
import Signin from "./src/container/signin"
import SignUp from "./src/container/signup"
import ForGotYourPassword from "./src/container/forgotyourpassword"
import UserHome from "./src/container/userhome"
import CompanyHome from "./src/container/companyhome"
import Unsubscribe from "./src/container/unsubscribe"
import CreateJobs from "./src/container/createJob"
import FullCard from "./src/container/fullCard"
import userFullCard from "./src/container/userFullcard"
import EditPost from "./src/container/editPost"
import Canvas from "./src/component/canvas"
import preRegistration from "./src/container/preRegistration"
// import ModalTester from "./src/component/modal"
// import ModalTester from "./src/component/modal"
import Register from "./src/container/register"
import Report from "./src/container/report"
import RegisterService from "./src/container/registerService"
import AuthLoading from "./authloading"
import UserHomeLoader from "./src/component/userHomeLoading"
import * as firebase from 'firebase'





var config = {
    apiKey: "AIzaSyDqkBW7jcxpBIPquGjQcz3NlQsaCO3T6i0",
    authDomain: "app-for-services.firebaseapp.com",
    databaseURL: "https://app-for-services.firebaseio.com",
    projectId: "app-for-services",
    storageBucket: "app-for-services.appspot.com",
    messagingSenderId: "264152244740"
};
firebase.initializeApp(config);


//WARNING! To be deprecated in React v17. Use componentDidMount instead.
// firebase.auth().onAuthStateChanged((user) => {
//     // User is signed in.
//     let currentUid = user.uid
//     firebase.database().ref('/users/' + currentUid + '/').once('value', (Snapshot) => {
//         console.log(Snapshot.val().role, "Snapshot")
//         let role = Snapshot.val().role,
//     })

// });



const AppStackCompany = createStackNavigator(
    {

        UserHome: {
            screen: UserHome
        },


        CompanyHome: {
            screen: CompanyHome
        },


        CreateJobs: {
            screen: CreateJobs
        },
        FullCard: {
            screen: FullCard
        },
        userFullCard: {
            screen: userFullCard
        },
        EditPost: {
            screen: EditPost
        },

        Signin: {
            screen: Signin
        },

        preRegistration: {
            screen: preRegistration
        },

        Register: {
            screen: Register
        },
        RegisterService: {
            screen: RegisterService
        },
        Report: {
            screen: Report
        },

        UserHomeLoader: {
            screen: UserHomeLoader
        },

        ////////////////////////////////for testing rout/////////////
        // Canvas: {
        //     screen: Canvas
        // },


    },
    {
        initialRouteName: "UserHomeLoader",
        navigationOptions: {
            header: null
        }
    }
);

const AppStackUser = createStackNavigator(
    {

        UserHome: {
            screen: UserHome
        },


        CompanyHome: {
            screen: CompanyHome
        },


        CreateJobs: {
            screen: CreateJobs
        },
        FullCard: {
            screen: FullCard
        },
        userFullCard: {
            screen: userFullCard
        },
        EditPost: {
            screen: EditPost
        },

        Signin: {
            screen: Signin
        },

        preRegistration: {
            screen: preRegistration
        },

        Register: {
            screen: Register
        },
        RegisterService: {
            screen: RegisterService
        },
        Report: {
            screen: Report
        },
        UserHomeLoader: {
            screen: UserHomeLoader
        },



        ////////////////////////////////for testing rout/////////////
        // Canvas: {
        //     screen: Canvas
        // },


    },
    {
        initialRouteName: "UserHomeLoader",
        navigationOptions: {
            header: null
        }
    }
);



const AuthStack = createStackNavigator(
    {
        Signin: {
            screen: Signin
        },
        signup: {
            screen: SignUp
        },
        ForGotYourPassword: {
            screen: ForGotYourPassword
        },

        Unsubscribe: {
            screen: Unsubscribe
        },





        ////////////////////////////////for testing rout/////////////
        // Canvas: {
        //     screen: Canvas
        // },


    },
    {
        initialRouteName: "Signin",
        navigationOptions: {
            header: null
        }
    }
);


const MainNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        AppStackCompany: AppStackCompany,
        AppStackUser: AppStackUser,
        Auth: AuthStack
    },
    {
        initialRouteName: "AuthLoading",
        header: null
    }
);

export default MainNavigator
