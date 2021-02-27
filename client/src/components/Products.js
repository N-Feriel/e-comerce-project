import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Pagination from './Pagination';
import ProductItem from './ProductItem';
import {paginate} from "../helpers/pagination";
import { themeVars } from "../GlobalStyles";
import SideBar from './SideBar';
import {device} from '../device';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const Products = () => {

    const {status, products} = useSelector((state) => state.product)
    const [pageSize, setPageSize]= useState(18);
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
        return <Wrapper>
            <LoadingPage />
        </Wrapper>
    }
    
    else if(status === 'error'){
        return <div>
            <ErrorPage />
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
            
                <h2>Our Products</h2>

                <SideBar 
                        Categories ={Categories}
                        handleCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                />
            

                    <div className= 'containerScoll'>
                        <div className='subContainer'>
                            {productsPaginate.map(item =>
                                <ProductItem 
                                    className='prod'
                                    key={item._id} 
                                    item={item} 
                                /> 
                                )}

                        </div>
                    </div>


                    <Pagination className='paginate'
                            itemsCount= {filteredProducts.length} 
                            currentPage={currentPage}
                            pageSize ={pageSize}
                            onPageChange= {handlePageChange}/>
            
                

            </Wrapper>
        )
    }

}

const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 20px;

    & h2{
        $random-text: 'suitable villa';
        background: linear-gradient(90deg, rgba(7,97,125,1) 12%, rgba(249,168,40,1) 38%, rgba(236,236,235,1) 82%);
        font-size: 2rem;
        margin: 30px;
        text-transform: uppercase;
        font-family: 'Rancho', cursive;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
    & .subContainer{
            display: flex;
            
    }




    @media ${device.mobileS} and (max-width: 768px) { 
        justify-items: center;
        max-width: 700px;

        & .subContainer{
            flex-direction: column;
            align-items: center;
        }
        & .containerScoll{
            overflow-x: hidden;
            text-align: center;
            margin: 30px;
        }
        & .prod{
            align-self: center;
        }

        & .sideBar{
            display: none;
        }

    }


    @media ${device.tablet} {

        & .containerScoll{
            flex-wrap: wrap;
            align-self: center;
            justify-items: space-around;
            
        } 



        & .subContainer{
            margin: 20px;
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
        }
        

    }

`


export default Products;