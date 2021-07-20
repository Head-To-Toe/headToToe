import React, { useState, useEffect, useContext } from 'react';
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import SearchByInsurance from '../../Components/SearchByInsurance/SearchByInsurance';
import Error from '../../Components/Error/Error';
import DarkModeSwitch from '../../Components/DarkModeSwitch/DarkModeSwitch';
import { retrievePageData } from '../../utils/apiCalls';
import ThemeContextProvider from '../../contexts/ThemeContext';
import './_doctors.scss';

const Doctors = () => {
  const [doctorList, setDoctorList] = useState([])
  const [filteredDoctorList, setFilteredDoctorList] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true;
    retrievePageData('doctor', 'Colorado')
      .then(doctors => { console.log('doctors', doctors)

        if(mounted) {
          setDoctorList(doctors.data.attributes.doctors)
        }
      })
      .catch(error => setError('Oops, looks like our computer gnome is fixing something right now.  Please try again in a moment.'))
    return () => mounted = false;
  }, [])

  const doctorsToDisplay = filteredDoctorList.length ? filteredDoctorList : doctorList

  const allDoctors = doctorsToDisplay.map(doctor => {
    return(
      <Card
      id={doctor.id}
      key={doctor.id}
      firstName={doctor.first_name}
      lastName={doctor.last_name}
      street={doctor.street}
      unit={doctor.unit}
      city={doctor.city}
      state={doctor.state}
      zip={doctor.zip}
      phone={doctor.phone}
      specialties={doctor.specialties}
      insurances={doctor.insurances}
      />
    )
  })

  const { darkMode, light, dark } = useContext(ThemeContext);
  const theme = darkMode ? dark : light;

  return(
    <div className={'theme ' + (dark ? 'theme--dark' : 'theme--default')}
      style={{ color: theme.color, background: theme.background }}>

      <div className='bottom-dr-view'>

        <section className='dr-button-wrapper'>
          <div className='left-framing-line'>
            <article> <SearchByInsurance providerList={doctorList} setFilteredProviderList={setFilteredDoctorList}/>
            </article>

            <article className='dr-settings-buttons'>
              <DarkModeSwitch />
              <Link to='/'>
              <button className='dr-home-button'>Home</button>
              </Link>
            </article>
          </div>
        </section>

        <section className='bottom-right-container'>
          <div className='provider-subtitle'>
            <h2 className='dr-sub-title'>Informed Doctors</h2>
            {error &&
              <Error error={error} />
            }
          </div>
          <article className='all-drs'>
            {allDoctors}
          </article>
        </section>
      </div>
    </div>
  )
}

export default Doctors
