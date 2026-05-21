import { useEffect, useState } from 'react'
import axios from 'axios'

function AddLabPrescription() {

  const [appointments, setAppointments] = useState([])
  const [labtests, setLabtests] = useState([])

  const [formData, setFormData] = useState({
    appointment: '',
    lab_test: '',
    lab_test_value: '',
    remarks: '',
    is_active: true
  })

  useEffect(() => {
    fetchAppointments()
    fetchLabTests()
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

  const fetchLabTests = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/labtests/')
    setLabtests(response.data)
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
        'http://127.0.0.1:8000/api/labtest-prescriptions/',
        formData
      )

      alert('Lab Test Prescription Added')

      setFormData({
        appointment: '',
        lab_test: '',
        lab_test_value: '',
        remarks: '',
        is_active: true
      })

    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Add Lab Test Prescription</h2>

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
          <label>Lab Test</label>
          <select
            name="lab_test"
            className="form-control"
            value={formData.lab_test}
            onChange={handleChange}
            required
          >
            <option value="">Select Lab Test</option>

            {labtests.map((labtest) => (
              <option key={labtest.id} value={labtest.id}>
                {labtest.test_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Remarks</label>
          <textarea
            name="remarks"
            className="form-control"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save Lab Prescription
        </button>

      </form>
    </div>
  )
}

export default AddLabPrescription