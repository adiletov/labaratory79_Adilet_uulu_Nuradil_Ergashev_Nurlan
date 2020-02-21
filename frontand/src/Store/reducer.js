import {OFFICE_TOOLS_CATEGORY, OFFICE_TOOLS_LOCATION, OFFICE_TOOLS_SUCCESS, ONE_TOOLS_SUCCESS} from "./actionOrder";

const initialState = {
    category: '',
    location: '',
    officeTools: null,
    oneTools: null,
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case OFFICE_TOOLS_CATEGORY:
            return {...state, category: action.category};
        case OFFICE_TOOLS_LOCATION:
            return {...state, location: action.location};
        case OFFICE_TOOLS_SUCCESS:
            return {...state, officeTools: action.tools};
        case ONE_TOOLS_SUCCESS:
            return {...state, oneTools: action.oneTools};
        default:
            return state
    }
};

export default reducer;