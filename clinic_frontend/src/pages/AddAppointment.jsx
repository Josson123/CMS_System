import { useEffect, useState } from 'react'
import axios from 'axios'

function AddAppointment() {

  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])

  const [formData, setFormData] = useState({
    appointment_date: '',
    token_number: '',
    consultation_status: 'Scheduled',
    patient: '',
    doctor: '',
    is_active: true
  })

  useEffect(() => {
    fetchPatients()
    fetchDoctors()
  }, [])

  const fetchPatients = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/patients/'
      )

      setPatients(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const fetchDoctors = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/doctors/'
      )

      setDoctors(response.data)

    } catch (error) {

      console.log(error)

    }
  }

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
        'http://127.0.0.1:8000/api/appointments/',
        formData
      )

      alert('Appointment Added Successfully')

      setFormData({
        appointment_date: '',
        token_number: '',
        consultation_status: 'Scheduled',
        patient: '',
        doctor: '',
        is_active: true
      })

    } catch (error) {

      console.log(error.response.data)

      alert(JSON.stringify(error.response.data))

    }
  }

  return (

    <div>

      <h2 className="mb-4">Add Appointment</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Appointment Date</label>

          <input
            type="date"
            name="appointment_date"
            className="form-control"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Token Number</label>

          <input
            type="text"
            name="token_number"
            className="form-control"
            value={formData.token_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Patient</label>

          <select
            name="patient"
            className="form-control"
            value={formData.patient}
            onChange={handleChange}
            required
          >

            <option value="">Select Patient</option>

            {patients.map((patient) => (

              <option
                key={patient.id}
                value={patient.id}
              >
                {patient.patient_name}
              </option>

            ))}

          </select>
        </div>

        <div className="mb-3">
          <label>Doctor</label>

          <select
            name="doctor"
            className="form-control"
            value={formData.doctor}
            onChange={handleChange}
            required
          >

            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (

              <option
                key={doctor.id}
                value={doctor.id}
              >
                {doctor.staff_name}
              </option>

            ))}

          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Appointment
        </button>

      </form>

    </div>

  )
}

export default AddAppointment