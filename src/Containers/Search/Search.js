import React, { useContext } from 'react';
import { ProviderContext } from '../../contexts/ProviderContext';
import { useLocation } from 'react-router-dom';
import SearchByInsurance from '../../Components/SearchByInsurance/SearchByInsurance'
import './_search.scss';

const Search = () => {

  const { doctorList,
    setFilteredDoctorList,
    mentalHealthProsList,
    setFilteredMentalHealthProsList } = useContext(ProviderContext)

  const location = useLocation()
  const pathname = location.pathname
  let providerList;
  let setFilteredProviderList;

  if(pathname === '/doctors' ) {

    providerList = doctorList;

    setFilteredProviderList = setFilteredDoctorList
  } else if (pathname === '/mental_health_professionals') {

    providerList = mentalHealthProsList;
    setFilteredProviderList = setFilteredMentalHealthProsList;
  }

  return (
    <div className='search-container'>
      {(pathname === '/doctors' || pathname === '/mental_health_professionals') &&
        <article> <SearchByInsurance providerList={providerList} setFilteredProviderList={setFilteredProviderList}/>
        </article>
      }
    </div>
 )
}

export default Search;
