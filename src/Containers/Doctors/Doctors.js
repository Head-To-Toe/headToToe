import React, { useState, useEffect } from 'react';
import { retrievePageData } from '../../utils/apiCalls'
// import { doctors } from '../../mockData'
// import Cards from '../../Components/Cards/Cards'

const Doctors = () => {
  const [doctorList, setDoctorList] = useState([])

  useEffect(() => {
    let mounted = true;
    retrievePageData('doctor', 'Colorado')
      .then(doctors => {
        if(mounted) {
          setDoctorList(doctors.data.attributes.list)
        }
      })
    return () => mounted = false;
  }, [])
  // const allDoctors = doctorList.map(doctor => {
  //   return(
  //     <Cards
  //     id={doctor.id}
  //     key={doctor.id}
  //     firstName={doctor.first_name}
  //     lastName={doctor.last_name}
  //     street={doctor.street}
  //     unit={doctor.unit}
  //     city={doctor.city}
  //     state={doctor.state}
  //     zip={doctor.zip}
  //     phone={doctor.phone}
  //     vetted={doctor.vetted}
  //     specialties={doctor.specialties}
  //     insurances={doctor.insurances}
  //     />
  //   )
  // })

  //map over doctors and get first names to make sure data is coming correctly from backend
  //do not need this code once cards are in place
  const allDoctors = doctorList.map(doctor => {
    return(
      <>
        <p>{doctor.first_name}</p>
      </>
    )
  })

  return(
    <>
      <h2>Doctors here</h2>
      <section>{allDoctors}</section>
    </>
  )
}

export default Doctors
