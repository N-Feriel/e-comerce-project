const initialState = {
    searchTerm: '',
    results: null,
    status: "loading",
    error: null,
};


export default function searchReducer(state = initialState, action) {
switch (action.type) {
    case "REQUEST_SEARCH_DATA": {
        return {
            ...state,
            searchTerm: action.data,
            status: 'loading'
        }
    }
    case "RECEIVE_RESULTS_DATA":{
        return {
            ...state,
            status: 'idle',
            results: [
                ...action.data
            ]
        }
    }

    case "RECEIVE_RESULTS_DATA_ERROR": {
        return{
            ...state,
            status: 'error',
            error:{
                ...state.error,
                error: action.error.message
            }
        
        }
    }
    default:{
        return state;
    }
}
}