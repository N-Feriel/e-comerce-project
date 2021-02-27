import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import CompanyDetails from './CompanyDetails';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import {receiveProductstData} from "../actions";
import {IoReturnUpBackOutline} from 'react-icons/io5';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

import Pagination from './Pagination';
import {paginate} from "../helpers/pagination";

function CompanyPage({getProductsData}) {

    const {companyId} = useParams();

    const dispatch = useDispatch();

    const {products, status} = useSelector(state=> state.product);

    const [pageSize, setPageSize]= useState(6);
    const [currentPage, setCurrentPage] = useState(1);



    

    const [company, setCompany] = useState({})

    const history = useHistory();

    const [companyStatus, setCompanyStatus]= useState('idle');

    const handlePageChange =(page) =>{
        setCurrentPage(page)
    }



    const getCompanyDetails = async(companyId) =>{
        try{
            setCompanyStatus('loading')

            const res = await fetch(`/companies/${companyId}`)
            const json = await res.json()

            if(res.status == 200 && status){
                setCompanyStatus('idle')
                setCompany(json.data)
            }else{
                throw(json)
            }
        } catch(error){
            setCompanyStatus('error')
            console.log(error)
        }
    }

    const getCompanyProductsData = (products)=>{

        if(!products){
            return []
        }else{

            return products.filter(product => (product.companyId == companyId))
        }
    }

    useEffect(() =>{
        getCompanyDetails(companyId);

    }, [companyId])

    const handleGoBackHome = (ev) =>{
        ev.stopPropagation()

        history.push('/')
    }


    if(companyStatus === 'loading'){
        return <div>
            <LoadingPage />
        </div>
    }
    
    else if(companyStatus === 'error'){
        return <div>
            <ErrorPage />
        </div>
    }
    


    if(companyStatus === 'idle' ){

        const companyProducts= getCompanyProductsData(products);
        let companyProductsPaginate = paginate(companyProducts, currentPage, pageSize);


        return ( <Container>

            <CompanyDetails company={company}/>
            <div>
                <button
                    onClick={(ev)=> handleGoBackHome(ev)}
                >
                    <IoReturnUpBackOutline /> Home </button>
                < h3 style={{textAlign:'center'}}> Welcome to <em>{company.name} </em>page</h3>

                {companyProducts.length > 0 && 
                
                    <div className='listProducts'>

                        {companyProductsPaginate.map(item =>(
                            <ProductItem 
                                key={item._id}
                                item= {item}/>
                    ))}</div>
                
                }

                <Pagination className='paginate'
                    itemsCount= {companyProducts.length} 
                    currentPage={currentPage}
                    pageSize ={pageSize}
                    onPageChange= {handlePageChange}/>

            </div>
        </Container>
    )
        }
}


const Container = styled.div`

    display: flex;
    color: ${themeVars.darkBlue};
    



    & .listProducts{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 30px;
    }

    & button{
        background-color: ${themeVars.lavender};
        color: ${themeVars.darkBlue};
        border: none;
        font-size: 1.2rem;
        cursor: pointer;

    }


`

export default CompanyPage;
