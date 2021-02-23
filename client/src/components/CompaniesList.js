import React from 'react';
import CompanyDetails from './CompanyDetails';
import {useDispatch, useSelector} from 'react-redux';


function CompaniesList() {

    const {status, companies} = useSelector((state) => state.company);
    return (
        <div>

            <div className='subContainer'>      
                {companies.map(company =>
                    <CompanyDetails 
                        className='prod'
                        key={company._id} 
                        company={company} 
                    /> 
                    )}

            </div>
            
        </div>
    )
}

export default CompaniesList
