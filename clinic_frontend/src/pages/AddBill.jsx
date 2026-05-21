import { useEffect, useState } from 'react'
import axios from 'axios'

function AddBill() {

  const [appointments, setAppointments] = useState([])

  const [preview, setPreview] = useState({
    consultation_fee: '',
    medicine_charge: '',
    lab_charge: '',
    total_amount: ''
  })

  const [formData, setFormData] = useState({
    appointment: '',
    payment_status: 'Pending'
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/appointments/'
    )

    setAppointments(response.data)
  }

  const fetchBillPreview = async (appointmentId) => {
    if (!appointmentId) {
      setPreview({
        consultation_fee: '',
        medicine_charge: '',
        lab_charge: '',
        total_amount: ''
      })
      return
    }

    const response = await axios.get(
      `http://127.0.0.1:8000/api/bills/preview/?appointment=${appointmentId}`
    )

    setPreview(response.data)
  }

  const handleAppointmentChange = async (e) => {
    const appointmentId = e.target.value

    setFormData({
      ...formData,
      appointment: appointmentId
    })

    await fetchBillPreview(appointmentId)
  }

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      payment_status: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/bills/',
        formData
      )

      alert('Bill Generated Automatically')

      setFormData({
        appointment: '',
        payment_status: 'Pending'
      })

      setPreview({
        consultation_fee: '',
        medicine_charge: '',
        lab_charge: '',
        total_amount: ''
      })

    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Generate Bill</h2>

      <div className="alert alert-info">
        Doctor fee, pharmacy charges, and lab charges are calculated automatically from appointment records.
      </div>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Appointment</label>

          <select
            name="appointment"
            className="form-control"
            value={formData.appointment}
            onChange={handleAppointmentChange}
            required
          >
            <option value="">Select Appointment</option>

            {appointments.map((appointment) => (
              <option
                key={appointment.id}
                value={appointment.id}
              >
                {appointment.patient_name} - {appointment.doctor_name} - {appointment.appointment_date}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Doctor Consultation Fee</label>
          <input
            type="number"
            className="form-control"
            value={preview.consultation_fee}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Pharmacy / Medicine Charges</label>
          <input
            type="number"
            className="form-control"
            value={preview.medicine_charge}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Lab Charges</label>
          <input
            type="number"
            className="form-control"
            value={preview.lab_charge}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Total Amount</label>
          <input
            type="number"
            className="form-control"
            value={preview.total_amount}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Payment Status</label>

          <select
            name="payment_status"
            className="form-control"
            value={formData.payment_status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Generate Bill
        </button>

      </form>
    </div>
  )
}

export default AddBill