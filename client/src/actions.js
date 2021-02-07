export const requestProductstData = () => ({
    type: "REQUEST_PRODUCTS_DATA",
});

export const receiveProductstData = (data) => ({
    type: "RECEIVE_PRODUCTS_DATA",
    data,
});

export const receiveProductstDataError = () => ({
    type: "RECEIVE_PRODUCTS_DATA_ERROR",
});

export const requestCompagniestData = () => ({
    type: "REQUEST_COMPAGNIES_DATA",
});

export const receiveCompaniestData = (data) => ({
    type: "RECEIVE_COMPAGNIES_DATA",
    data,
});

export const receiveCompaniestDataError = () => ({
    type: "RECEIVE_COMPAGNIES_DATA_ERROR",
});