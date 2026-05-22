import { useEffect, useState } from 'react'
import axios from 'axios'

function AddMedicineStock() {

  const [medicines, setMedicines] = useState([])

  const [formData, setFormData] = useState({
    medicine: '',
    stock_in_hand: '',
    reorder_level: '',
    purchase: '',
    issuance: ''
  })

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/medicines/?active=true')
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
      await axios.post('http://127.0.0.1:8000/api/medicine-stocks/', {
        ...formData,
        stock_in_hand: Number(formData.stock_in_hand),
        reorder_level: Number(formData.reorder_level),
        purchase: Number(formData.purchase || 0),
        issuance: Number(formData.issuance || 0)
      })

      alert('Medicine stock added')

      setFormData({
        medicine: '',
        stock_in_hand: '',
        reorder_level: '',
        purchase: '',
        issuance: ''
      })
    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Add Medicine Stock</h2>

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

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Stock In Hand</label>
            <input
              type="number"
              name="stock_in_hand"
              className="form-control"
              value={formData.stock_in_hand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Reorder Level</label>
            <input
              type="number"
              name="reorder_level"
              className="form-control"
              value={formData.reorder_level}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Purchase</label>
            <input
              type="number"
              name="purchase"
              className="form-control"
              value={formData.purchase}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Issuance</label>
            <input
              type="number"
              name="issuance"
              className="form-control"
              value={formData.issuance}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Save Stock</button>
      </form>
    </div>
  )
}

export default AddMedicineStock