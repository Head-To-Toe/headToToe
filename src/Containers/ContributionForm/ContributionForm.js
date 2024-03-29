import React, { useState, useEffect, useContext } from 'react';
import { addContribution } from '../../utils/apiCalls';
import { DropDown } from '../../Components/DropDown/DropDown';
import { Checkboxes } from '../../Components/Checkboxes/Checkboxes'
import { ThemeContext } from '../../contexts/ThemeContext';
import Error from '../../Components/Error/Error';
import './_contributionForm.scss';

function ContributionForm() {

  const [state, setState] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [specialties, setSpecialties] = useState([])
  const [insurances, setInsurances] = useState([])
  const [typedInsurances, setTypedInsurances] = useState('')
  const [modifiedInsurances, setModifiedInsurances] = useState([])
  const [cost, setCost] = useState('')
  const [profession, setProfession] = useState('')
  const [street, setStreet] = useState('')
  const [unit, setUnit] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [error, setError] = useState('')
  useEffect((modifiedInsurances) => {
    let mounted = false
    if (mounted || state) {
      makePostRequest()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modifiedInsurances])

  const handleClick = (event) => {
    event.preventDefault()
    handleTypedInsurance()
  }

  const sendRequest = (data) => {
    addContribution(data)
      .then(setSubmissionMessage('Thank you for your submission'))
      .then(setTimeout((()=>{
        window.location.reload()
      }), 2000))
      .catch(error => {
        setError(error.message)
      })
  }

  const makePostRequest = () => {
    let data = {
      first_name: firstName,
      last_name: lastName,
      profession: profession,
      specialties: specialties || null,
      insurance: modifiedInsurances.length ? modifiedInsurances : insurances,
      street: street || null,
      unit: unit || null,
      city: city || null,
      state: state,
      zip: zip || null,
      phone: phone || null
    }
    if(firstName &&
      lastName &&
      insurances &&
      state &&
      profession === 'doctor') {
        data.specialties = makeList()
        setError(null)
        sendRequest(data)
    } else if(firstName &&
      lastName &&
      insurances &&
      state &&
      profession === 'mhp') {
        data = {...data, cost}
        data.specialties = makeList()
        setError(null)
        sendRequest(data)
    } else {
      setError('Please fill out the First Name, Last Name, Profession, Insurance, and State fields for this provider, at minimum.')
      }
  }

  const handleTypedInsurance = () => {
    const isOtherChecked = insurances.find(insurance => insurance === 'Other')
    const insurancesToAdd = typedInsurances.split(', ')
    if (isOtherChecked) {
      let filteredInsurances = insurances.filter(insurance => insurance !== 'Other')
      const allInsurances = filteredInsurances.concat(insurancesToAdd)
      setModifiedInsurances(allInsurances)
    } else {
      makePostRequest()
    }
  }

  const handleChange = (setFunction, event) => {
    const value = event.target.value;
    setFunction(value)
  }

  const handleChangeCheckbox = (setFunction, event) => {
    if(insurances.includes(event.target.value)) {
      setFunction(
        insurances.filter(item => item !== event.target.value)
      )
    } else {
      setFunction(
        [...insurances, event.target.value]
      )
    }
  }

  const makeList = () => {
    if(specialties.length) {
      const splitList = specialties.split(', ')
      return splitList
    } else {
      return []
    }
  }

  const { darkMode, light, dark } = useContext(ThemeContext);
  const theme = darkMode ? dark : light;

    return (
      <>
        <section className='theme-wrapper' style={{ color: theme.color, background: theme.background }}>

          <form>
            <section className='contribution-title'>

              <h2>Contribution Form</h2>

              {submissionMessage &&
              <h2>{submissionMessage}</h2>}
            </section>

              <section className='contribution-form'>
                <article className='form-name-wrapper'>
                  <h3 className='form-directions'>Please Fill In Your Provider's First and Last Name</h3>
                    <input
                      className='form-input'
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                      value={firstName}
                      onChange={event => handleChange(setFirstName, event)}
                    />
                    <input
                      className='form-input'
                      type='text'
                      placeholder='Last Name'
                      name='lastName'
                      value={lastName}
                      onChange={event => handleChange(setLastName, event)}
                    />
                </article>
                <section className='form-drop-down-wrapper'>
                  <h3 className='form-directions'>Please Tell Us What Field Your Provider Works In</h3>
                  <div className='provider-menu'>
                  <DropDown
                    options={[
                        { endpoint:'mhp', text: 'Mental Health Professional' },
                        { endpoint: 'doctor', text: 'Doctor'}
                      ]}
                    label='profession'
                    value={profession}
                    handleChange={event => handleChange(setProfession, event)}
                  />
                  </div>
                  <h3 className='form-directions'>Tell Us Their Specialities</h3>
                  <input
                    className='drop-down-input'
                    type='text'
                    placeholder='Specialties (e.g. Transgender, Trauma and PTSD, ADHD)'
                    name='specialties'
                    value={specialties}
                    onChange={event => handleChange(setSpecialties, event)}
                  />
                  </section>
                <h3 className='form-directions'>This Next Section of the Form Has Two parts.</h3>
                <div className='form-ins-container'>
                  <section className='checkbox-selection'>
                  <Checkboxes
                    options={[
                      'Aetna', 'Anthem', 'Blue Cross BlueShield National', 'Blue Cross and Blue Shield of Nebraska', 'Bright Health', 'Cigna', 'Cigna HealthSpring', 'Colorado Access', 'Coventry', 'Denver Health',
                      'First Health', 'Friday Health Plans', 'Health First Colorado', 'Humana', 'Kaiser Permanente', 'Medicare Traditional', 'Multiplan', 'Oxford Health Plans', 'Rocky Mountain Health Plans', 'UnitedHealthcare',
                      'Out of Network', 'Other'
                    ]}
                    label='insurances'
                    value={insurances}
                    handleChange={event => handleChangeCheckbox(setInsurances, event)}
                  />
                  </section>
                    <h3>If you didn't see the insurance you were looking for, please list them for us, separated by commas.</h3>
                    <input
                      className='insurance-by-comma'
                      type='text'
                      placeholder='Insurances (Seperated by a comma)'
                      name='typedInsurances'
                      value={typedInsurances}
                      onChange={event => handleChange(setTypedInsurances, event)}
                    />
                </div>
                  <article className='provider-address-form'>
                    <h3 className='form-directions'>Please Fill In Your Suggested Provider's Office Address and Phone Number Below.</h3>
                    {profession === 'mhp' &&
                      <input
                      className='form-input'
                      type='text'
                      placeholder='Cost'
                      name='cost'
                      value={cost}
                      onChange={event => handleChange(setCost, event)}
                    />
                    }
                    <input
                      className='form-input'
                      type='text'
                      placeholder='Street'
                      name='street'
                      value={street}
                      onChange={event => handleChange(setStreet, event)}
                    />
                    <input
                      className='form-input'
                      type='text'
                      placeholder='Unit'
                      name='unit'
                      value={unit}
                      onChange={event => handleChange(setUnit, event)}
                    />
                    <input
                      className='form-input'
                      type='text'
                      placeholder='City'
                      name='city'
                      value={city}
                      onChange={event => handleChange(setCity, event)}
                    />
                  <DropDown
                    options={[
                      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
                      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
                      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
                      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
                      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                    ]}
                    label='state'
                    value={state}
                    handleChange={event => handleChange(setState, event)}
                  />
                  <input
                    className='form-input'
                    type='text'
                    placeholder='Zip Code'
                    name='zip'
                    value={zip}
                    onChange={event => handleChange(setZip, event)}
                  />
                  <input
                    className='form-input'
                    type='text'
                    placeholder='Phone Number'
                    name='phone'
                    value={phone}
                    onChange={event => handleChange(setPhone, event)}
                  />
                </article>
              </section>
            <article className='form-button-wrapper'>
              <button className='contribution-button' onClick={(event) => handleClick(event)}>Submit Your Suggestion</button>
              {error &&
                <Error error={error} />
              }

            </article>
            <h3 className='form-directions'>Thanks For Visiting Us Today</h3>
        </form>
      </section>
    </>
  )
}

export default ContributionForm;
