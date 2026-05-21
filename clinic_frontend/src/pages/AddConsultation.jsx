import { useEffect, useState } from 'react'
import axios from 'axios'

function AddConsultation() {
  const [appointments, setAppointments] = useState([])

  const [formData, setFormData] = useState({
    appointment: '',
    symptoms: '',
    diagnosis: '',
    notes: '',
    is_active: true
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    let url = 'http://127.0.0.1:8000/api/appointments/'

    if (user.role === 'Doctor' && user.doctor_id) {
      url = `http://127.0.0.1:8000/api/appointments/?doctor_id=${user.doctor_id}`
    }

    const response = await axios.get(url)
    setAppointments(response.data)
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
        'http://127.0.0.1:8000/api/consultations/',
        formData
      )

      alert('Consultation Added Successfully')

      setFormData({
        appointment: '',
        symptoms: '',
        diagnosis: '',
        notes: '',
        is_active: true
      })

    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Add Consultation</h2>

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
            <option value="">Select Appointment</option>

            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.patient_name} - {appointment.appointment_date}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Symptoms</label>
          <textarea
            name="symptoms"
            className="form-control"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Diagnosis</label>
          <textarea
            name="diagnosis"
            className="form-control"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Notes</label>
          <textarea
            name="notes"
            className="form-control"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save Consultation
        </button>

      </form>
    </div>
  )
}

export default AddConsultation