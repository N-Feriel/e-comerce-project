import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductItem from './ProductItem';

const Products = () => {

    const {status, products} = useSelector((state) => state.product)

    console.log('items', products)

    if(status == 'loading'){
        return <div>
            ...Loading
        </div>
    }

    else if(status == 'error'){
        return <div>
            ...error
        </div>
    }

    else if(status == 'idle'){

        return(
            <Wrapper>
                {products.map(item =>
                    <ProductItem 
                        key={item._id} 
                        item={item} 
                /> 
                )}
            </Wrapper>
        )
    }

}

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    flex-wrap: wrap

`

export default Products;