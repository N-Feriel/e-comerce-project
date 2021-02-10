import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Pagination from './Pagination';
import ProductItem from './ProductItem';
import {paginate} from "../helpers/pagination";
import { themeVars } from "../GlobalStyles";
import SideBar from './SideBar';

const Products = () => {

    const {status, products} = useSelector((state) => state.product)
    const [pageSize, setPageSize]= useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    let BodyLocationCategorie = [];
    let Categories =[];

    const [selectedCategory, setSelectedCategory] = useState('All Categories')

    const handleCategorySelect =(category) =>{
        console.log(category)
        setSelectedCategory(category)
    }

    const handlePageChange =(page) =>{
        setCurrentPage(page)
    }

    
    
    if(status === 'loading'){
        return <div>
            ...Loading
        </div>
    }
    
    else if(status === 'error'){
        return <div>
            ...error
        </div>
    }
    
    else if(status === 'idle'){
        
        products.map(item =>{
    
            BodyLocationCategorie = [...new Set([...BodyLocationCategorie, item.body_location])]
            Categories = [...new Set([...Categories, item.category])]
        })
    
        const filteredProducts = (selectedCategory && !(selectedCategory === 'All Categories') ) ? 
            products.filter(item => item.category === selectedCategory) : products
        
        let productsPaginate = paginate(filteredProducts, currentPage, pageSize);
        
        
        return(
            <Wrapper>

                <SideBar Categories ={Categories}
                        handleCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                />
                
                <Container>

                    <h2>Our Products</h2>
                    <SubContainer>
                        {productsPaginate.map(item =>
                            <ProductItem 
                            key={item._id} 
                            item={item} 
                            /> 
                            )}

                    </SubContainer>

                    <Pagination 
                            itemsCount= {filteredProducts.length} 
                            currentPage={currentPage}
                            pageSize ={pageSize}
                            
                            onPageChange= {handlePageChange}/>
                </Container>

            </Wrapper>
        )
    }

}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    text-align: center;
    justify-content: space-between;

    & h2{
        $random-text: 'suitable villa';
        background: linear-gradient(90deg, rgba(7,97,125,1) 12%, rgba(249,168,40,1) 38%, rgba(236,236,235,1) 82%);
        font-size: 48px;
        margin: 50px 0;
        text-transform: uppercase;
        position: relative;
        font-family: 'Rancho', cursive;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;

`

const SubContainer = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`


export default Products;