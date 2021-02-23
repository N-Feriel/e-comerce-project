import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { themeVars } from "../GlobalStyles";
import CompanyDetails from './CompanyDetails';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import {receiveProductstData} from "../actions";
import {IoReturnUpBackOutline} from 'react-icons/io5';
import logo from './logo192.png';
import {device} from '../device';

function CompanyProducts({getProductsData, companyId, productId}) {

    // const {companyId} = useParams();



    console.log('compPage', companyId)
    const dispatch = useDispatch();

    const {products, status} = useSelector(state=> state.product);

    const [company, setCompany] = useState({})

    const history = useHistory();

    const [companyStatus, setCompanyStatus]= useState('idle');


    const getCompanyDetails = async(id) =>{

        
        try{
            setCompanyStatus('loading')

            const res = await fetch(`/companies/${id}`)
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
            return products.filter(product => (product.companyId === companyId))
        }
    }

    useEffect(() =>{
        getCompanyDetails(companyId);

    }, [companyId])


    if(companyStatus === 'error'){
        return ( <div>
            ...Error
        </div> )
    }
    if(companyStatus === 'loading'){
        return ( <div>
            ...Waiting for data
        </div> )
    }


    if(companyStatus === 'idle' ){

        const companyProducts= getCompanyProductsData(products).filter(item => item._id !== productId)

        console.log('compPd', companyProducts)

        return ( <Container>
        
                < h3> Compagny Details : </h3>
                <div style={{display: 'flex'}}>
                    <img src={company.imageSrc || logo} alt='imageProduct' style={{width: '200px', margin: '50px '}}/>
                    <div >
                        <h4>
                            {company.name}
                        </h4>
                        <p>From:  <strong>{company.country}</strong></p>
                        <p> for more details <a exact href={company.url} 
                                onClick={(ev) => ev.stopPropagation()}
                            > visit
                        </a> 
                        </p>


                    </div>
                    
                </div>


                {companyProducts.length > 0 && 
                
                    <div className='listProducts'>

                        {companyProducts.map(item =>(
                            <div style={{ scrollSnapAlign: 'center'}}>
                                <ProductItem 
                                    key={item._id}
                                    item= {item}/>
                            </div>
                    ))}
                    </div>
                
                }

                


        
        </Container>
    )
        }
}


const Container = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    

    & .listProducts{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        scroll-snap-type: x mandatory;
        margin: 30px;
    }

    & button{
        background-color: ${themeVars.lavender};
        color: ${themeVars.darkBlue};
        border: none;
        font-size: 1.2rem;
        cursor: pointer;

    }

    @media ${device.tablet} {
        & .listProducts{
            flex-direction: row;
            flex-wrap: wrap;
            

        }

    }




`

export default CompanyProducts;
