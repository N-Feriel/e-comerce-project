export const requestProductstData = () => ({
    type: "REQUEST_PRODUCTS_DATA",
});

export const receiveProductstData = (data) => ({
    type: "RECEIVE_PRODUCTS_DATA",
    data,
    
});

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

export const addItemToCart = item => ({
    type: "ADD_ITEM_TO_CART",
    item,
})

export const removeItemToCart = item => ({
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