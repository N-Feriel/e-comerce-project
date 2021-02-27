import React from 'react';
import styled from 'styled-components';
import { useHistory , Link} from "react-router-dom";

import { FiExternalLink } from 'react-icons/fi';
import logo from './watch.svg'

import { themeVars } from "../GlobalStyles";


const CompanyDetails = ({company}) => {

    const history = useHistory();

    const handleItemDetail = (companyId)=>{

        history.push(`/companies/${companyId}`)

    }

    return (
        <Wrapper onClick={()=> handleItemDetail(company._id)}>
            <img src={company.imageSrc || logo} alt='imageProduct' />
            <div style={{marginTop: '10px'}}>
                <strong>{company.name}</strong>
                <p>Country: <strong>{company.country}</strong></p>
                <a exact href={company.url} 
                    onClick={(ev) => ev.stopPropagation()}
                >
                    site: <FiExternalLink  style={{color: `${themeVars.middleRedColor}`}}/>
                </a>

            </div>

        </Wrapper>
    )
}



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 200px;
    justify-content: space-around;
    margin : 50px 10px;

    &:hover{
        cursor: pointer;
    }

    & a{
        color: ${themeVars.darkBlue};
        text-decoration: none
    }
    & a:hover, a:visited{
        color: ${themeVars.middleRedColor};

    }


    & img{
        border: solid 1px ${themeVars.middleRedColor}; 
        border-radius: 50%;
        width: 150px;

        overflow-x: hidden; 
    }
`
export default CompanyDetails
