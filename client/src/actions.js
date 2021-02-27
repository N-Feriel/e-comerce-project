export const requestProductstData = () => ({
    type: "REQUEST_PRODUCTS_DATA",
});

export const receiveProductstData = (data) => ({
    type: "RECEIVE_PRODUCTS_DATA",
    data,
    
});

export const updteProductData =(item, key, value) =>({
    type: "UPDATE_PRODUCT_DATA",
    item, 
    key,
    value
})

export const receiveProductsDataError = (error) => ({
    type: "RECEIVE_PRODUCTS_DATA_ERROR",
    error,
});

export const requestCompagniestData = () => ({
    type: "REQUEST_COMPAGNIES_DATA",
});

export const receiveCompaniesData = (data) => ({
    type: "RECEIVE_COMPAGNIES_DATA",
    data,
});


export const receiveCompaniesDataError = (error) => ({
    type: "RECEIVE_COMPAGNIES_DATA_ERROR",
    error,
});

export const addItemToCart = (item, value) => ({
    type: "ADD_ITEM_TO_CART",
    item,
    value
})

export const removeItemToCart = (item) => ({
    type: "REMOVE_ITEM_TO_CART",
    item,
})

export const updateQuantity = (item, key, value) =>({
    type: 'UPDATE_QUANTITY',
    item,
    key,
    value
})

export const clearCart = item => ({
    type: 'CLEAR_CART',
    item,
})

//Add research action 

export const requestReseachtData = (data) => ({
    type: "REQUEST_SEARCH_DATA",
    data,
});

export const receiveResultsData = (data) => ({
    type: "RECEIVE_RESULTS_DATA",
    data,
});

export const receiveResultsDataError = (error) => ({
    type: "RECEIVE_RESULTS_DATA_ERROR",
    error,
});