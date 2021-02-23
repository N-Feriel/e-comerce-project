

const initialState = {
    companies: null,
    status: "loading",
    error: null,
};

export default function companyReducer(state = initialState, action) {
switch (action.type) {
    case "REQUEST_COMPAGNIES_DATA": {
        return {
            ...state,
            status: 'loading'
        }
    }
    case "RECEIVE_COMPAGNIES_DATA":{
        return {
            ...state,
            status: 'idle',
            companies: [
                ...action.data
            ]
            
        }
    }

    case "RECEIVE_COMPAGNIES_DATA_ERROR": {
        return{
            ...state,
            status: 'error',
        }
    }

    default:{
        return state;
    }
}
}