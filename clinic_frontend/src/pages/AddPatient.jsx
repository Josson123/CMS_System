import { useState } from 'react'
import axios from 'axios'

function AddPatient() {

  const [formData, setFormData] = useState({
    patient_name: '',
    date_of_birth: '',
    gender: 'Male',
    mobile_number: '',
    address: '',
    membership: 1,
    is_active: true
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/patients/',
        formData
      )

      alert('Patient Added Successfully')

      setFormData({
        patient_name: '',
        date_of_birth: '',
        gender: 'Male',
        mobile_number: '',
        address: '',
        membership: 1,
        is_active: true
      })

    } catch (error) {

      console.log(error.response.data)

        alert(JSON.stringify(error.response.data))

    }
  }

  return (

    <div>

      <h2 className="mb-4">Add Patient</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Patient Name</label>

          <input
            type="text"
            name="patient_name"
            className="form-control"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>

          <input
            type="date"
            name="date_of_birth"
            className="form-control"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>

          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>

          <input
            type="text"
            name="mobile_number"
            className="form-control"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>

          <textarea
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Patient
        </button>

      </form>

    </div>

  )
}

export default AddPatient