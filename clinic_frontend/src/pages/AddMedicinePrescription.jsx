import { useEffect, useState } from 'react'
import axios from 'axios'

function AddMedicinePrescription() {

  const [appointments, setAppointments] = useState([])
  const [medicines, setMedicines] = useState([])

  const [formData, setFormData] = useState({
    appointment: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    is_active: true
  })

  useEffect(() => {
    fetchAppointments()
    fetchMedicines()
  }, [])

  const fetchAppointments = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem('user')
      )

      let url =
        'http://127.0.0.1:8000/api/appointments/'

      if (
        user.role === 'Doctor' &&
        user.doctor_id
      ) {

        url =
          `http://127.0.0.1:8000/api/appointments/?doctor_id=${user.doctor_id}`

      }

      const response = await axios.get(url)

      setAppointments(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const fetchMedicines = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicines/'
      )

      setMedicines(response.data)

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
        'http://127.0.0.1:8000/api/medicine-prescriptions/',
        formData
      )

      alert('Medicine Prescription Added')

      setFormData({
        appointment: '',
        medicine: '',
        dosage: '',
        frequency: '',
        duration: '',
        is_active: true
      })

    } catch (error) {

      alert(JSON.stringify(error.response.data))

    }
  }

  return (

    <div>

      <h2 className="mb-4">
        Add Medicine Prescription
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>Appointment</label>

          <select
            name="appointment"
            className="form-control"
            value={formData.appointment}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Appointment
            </option>

            {appointments.map((appointment) => (

              <option
                key={appointment.id}
                value={appointment.id}
              >
                {appointment.patient_name} - {appointment.appointment_date}
              </option>

            ))}

          </select>

        </div>

        <div className="mb-3">

          <label>Medicine</label>

          <select
            name="medicine"
            className="form-control"
            value={formData.medicine}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Medicine
            </option>

            {medicines.map((medicine) => (

              <option
                key={medicine.id}
                value={medicine.id}
              >
                {medicine.medicine_name}
              </option>

            ))}

          </select>

        </div>

        <div className="mb-3">

          <label>Dosage</label>

          <input
            type="text"
            name="dosage"
            className="form-control"
            value={formData.dosage}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>Frequency</label>

          <input
            type="text"
            name="frequency"
            className="form-control"
            value={formData.frequency}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>Duration</label>

          <input
            type="text"
            name="duration"
            className="form-control"
            value={formData.duration}
            onChange={handleChange}
            required
          />

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Save Prescription
        </button>

      </form>

    </div>

  )
}

export default AddMedicinePrescription