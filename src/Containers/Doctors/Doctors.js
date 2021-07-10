import React, { useState } from 'react'
import { doctors } from '../../mockData'
import Cards from '../../Components/Cards/Cards'

const Doctors = () => {
  const [doctorList, setDoctorList] = useState(doctors)
  const allDoctors = doctorList.map(doctor => {
    return(
      <Cards
      id={doctor.id}
      key={doctor.id}
      firstName={doctor.attributes.first_name}
      lastName={doctor.attributes.last_name}
      street={doctor.attributes.street}
      unit={doctor.attributes.unit}
      city={doctor.attributes.city}
      state={doctor.attributes.state}
      zip={doctor.attributes.zip}
      phone={doctor.attributes.phone}
      vetted={doctor.attributes.vetted}
      specialty={doctor.attributes.specialty}
      insurance={doctor.attributes.insurance}
      />
    )
  })
  return(
    <h2>Doctors here</h2>
  )
}

export default Doctors
