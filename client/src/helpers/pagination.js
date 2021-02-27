import _ from 'lodash';

export function paginate (items, pageNumber, pageSize){

    const startIndex = (pageNumber -1) * pageSize;

    return  _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();


}


export const getTotalPrice = (arr) =>{
    return arr.reduce((result, item) => (item.price.substring(1)) * (item.quantity || 0), 0)
}

export const getTotal = (arr, tax) =>{
    return (getTotalPrice(arr) + tax ).toFixed(2);
}




