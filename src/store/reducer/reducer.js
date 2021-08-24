import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    isLoader: false,
    isError: false,
    errorMessage: '',
    jobListArr: [],
    allJobListArr: [],
    jobkeys:[],
    allJobkeys:[],
    allReportsArr:[],
    reportJobkeys:[],
    objPreRegistration: {},
    objAllPreRegistration: {},
    index: null,
    dropDownOptions: {},
    selectedJob: {},
    prAdditionalData: {}

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOADER:
            return ({
                ...state,
                isLoader: !state.isLoader
            })
        case ActionTypes.SHOWERROR:
            return ({
                ...state,
                isLoader: !state.isLoader,
                isError: !state.isError,
                errorMessage: action.payload
            })
        case ActionTypes.HIDEERROR:
            return ({
                ...state,
                isError: false,
                errorMessage: ''
            })
        case ActionTypes.POSTJOBS:
            return ({
                ...state,

                jobListArr: action.payload

            })
        case ActionTypes.ALLJOBS:
            return ({
                ...state,

                allJobListArr: action.payload

            })
        case ActionTypes.JOBKEYS:
            return ({
                ...state,

                jobkeys: action.payload

            })
        case ActionTypes.ALLJOBKEYS:
            return ({
                ...state,

                allJobkeys: action.payload

            })
        case ActionTypes.ALLREPORTS:
            return ({
                ...state,

                allReportsArr: action.payload

            })
        case ActionTypes.REPORTJOBKEYS:
            return ({
                ...state,

                reportJobkeys: action.payload

            })
        case ActionTypes.PREREGISTRATION:
            return ({
                ...state,

                objPreRegistration: action.payload

            })
        case ActionTypes.ALLPREREGISTRATION:
            return ({
                ...state,

                objAllPreRegistration: action.payload

            })
        case ActionTypes.INDEX:
            return ({
                ...state,

                index: action.payload

            })
        case ActionTypes.SETDEFDROPDOWNOPTIONS:
            return ({
                ...state,

                dropDownOptions: action.payload

            })
        case ActionTypes.SELECTEDJOB:
            return ({
                ...state,

                selectedJob: action.payload

            })
        case ActionTypes.PRADDIONALDATA:
            return ({
                ...state,

                prAdditionalData: action.payload

            })
        default:
            return state;
    }

}