import { useEffect, useState } from 'react'
import axios from 'axios'

function DispenseMedicine() {

  const [medicines, setMedicines] = useState([])

  const [formData, setFormData] = useState({
    medicine: '',
    quantity: ''
  })

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/medicines/'
    )

    setMedicines(response.data)
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
        'http://127.0.0.1:8000/api/medicine-stocks/dispense/',
        {
          medicine: formData.medicine,
          quantity: Number(formData.quantity)
        }
      )

      alert('Medicine Dispensed Successfully')

      setFormData({
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

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Medicine</label>
          <select
            name="medicine"
            className="form-control"
            value={formData.medicine}
            onChange={handleChange}
            required
          >
            <option value="">Select Medicine</option>

            {medicines.map((medicine) => (
              <option key={medicine.id} value={medicine.id}>
                {medicine.medicine_name}
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