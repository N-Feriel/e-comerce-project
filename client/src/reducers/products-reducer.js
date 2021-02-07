const initialState = {
    products: null,
    status: "loading",
    error: null,
};

export default function productReducer(state = initialState, action) {
switch (action.type) {
    case "REQUEST_PRODUCTS_DATA": {
        return {
            ...state,
            status: 'loading'
        }
    }
    case "RECEIVE_PRODUCTS_DATA":{
        return {
            ...state,
            status: 'idle',

            products: {
                ...state.products,
                data: action.data
            }
            
        }
    }

    case "RECEIVE_PRODUCTS_DATA_ERROR": {
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