import { useEffect, useState } from 'react'
import axios from 'axios'

function UpdateLabResult() {

  const [prescriptions, setPrescriptions] = useState([])

  const [formData, setFormData] = useState({
    prescription_id: '',
    lab_test_value: '',
    remarks: ''
  })

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/labtest-prescriptions/'
    )

    setPrescriptions(response.data)
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

      await axios.put(
        `http://127.0.0.1:8000/api/labtest-prescriptions/${formData.prescription_id}/result/`,
        {
          lab_test_value: formData.lab_test_value,
          remarks: formData.remarks
        }
      )

      alert('Lab Result Updated')

      setFormData({
        prescription_id: '',
        lab_test_value: '',
        remarks: ''
      })

    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Update Lab Result</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Lab Prescription</label>
          <select
            name="prescription_id"
            className="form-control"
            value={formData.prescription_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Prescription</option>

            {prescriptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.patient_name} - {item.lab_test_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Lab Test Result</label>
          <input
            type="text"
            name="lab_test_value"
            className="form-control"
            value={formData.lab_test_value}
            onChange={handleChange}
            required
          />
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
          Update Result
        </button>

      </form>
    </div>
  )
}

export default UpdateLabResult