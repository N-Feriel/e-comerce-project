import React, {useState} from 'react';
import CompanyDetails from './CompanyDetails';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from './Pagination';
import styled from 'styled-components'
import {paginate} from "../helpers/pagination";
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { ImDisplay } from 'react-icons/im';


function CompaniesList() {

    const {status, companies} = useSelector((state) => state.company);

    
    const [pageSize, setPageSize]= useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange =(page) =>{
        setCurrentPage(page)
    }
    

    if(status === 'loading'){
        return <div>
            <LoadingPage />
        </div>
    }
    
    else if(status === 'error'){
        return <div>
            <ErrorPage />
        </div>
    }
    
    else if(status === 'idle'){

        let companiesPaginate = paginate(companies, currentPage, pageSize);

        return(
        <Wrapper style={{display:"flex"}} >

            <div className='subContainer'>      
                {companiesPaginate.map(company =>
                    <CompanyDetails 
                        className='prod'
                        key={company._id} 
                        company={company} 
                    /> 
                    )}

            </div>

            <Pagination className='paginate'
                        itemsCount= {companies.length} 
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

`



export default CompaniesList
