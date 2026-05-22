import { useEffect, useState } from 'react'
import axios from 'axios'

function DispenseMedicine() {

  const [prescriptions, setPrescriptions] = useState([])

  const [formData, setFormData] = useState({
    prescription: '',
    medicine: '',
    quantity: ''
  })

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/medicine-prescriptions/?active=true'
    )

    setPrescriptions(response.data)
  }

  const handleChange = (e) => {
    if (e.target.name === 'prescription') {
      const selectedPrescription = prescriptions.find(
        (item) => String(item.id) === e.target.value
      )

      setFormData({
        ...formData,
        prescription: e.target.value,
        medicine: selectedPrescription?.medicine || ''
      })

      return
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/medicine-stocks/dispense/',
        {
          medicine: formData.medicine,
          quantity: Number(formData.quantity)
        }
      )

      alert('Medicine Dispensed Successfully')

      setFormData({
        prescription: '',
        medicine: '',
        quantity: ''
      })

    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Dispense Medicine</h2>

      {formData.prescription && (
        <div className="alert alert-info">
          <strong>Patient:</strong>{' '}
          {prescriptions.find((item) => String(item.id) === formData.prescription)?.patient_name || 'Unknown'}
          {' '}| <strong>Medicine:</strong>{' '}
          {prescriptions.find((item) => String(item.id) === formData.prescription)?.medicine_name || 'Unknown'}
          {' '}| <strong>Frequency:</strong>{' '}
          {prescriptions.find((item) => String(item.id) === formData.prescription)?.frequency || 'Unknown'}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Prescription</label>
          <select
            name="prescription"
            className="form-control"
            value={formData.prescription}
            onChange={handleChange}
            required
          >
            <option value="">Select Prescription</option>

            {prescriptions.map((prescription) => (
              <option key={prescription.id} value={prescription.id}>
                {prescription.patient_name} - {prescription.medicine_name} - {prescription.frequency}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Dispense
        </button>

      </form>
    </div>
  )
}

export default DispenseMedicine