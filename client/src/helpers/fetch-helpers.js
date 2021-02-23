
export function fetchProductsUpdate(item, quantity){

    let productId = item._id;
    
    console.log(item , productId)

    return fetch(`/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({quantity: quantity}),
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
    }).then(res => res.json())

}

