import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function MedicinePrescriptions() {

  const [prescriptions, setPrescriptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    dosage: '',
    frequency: '',
    duration: '',
    quantity: '',
    is_active: true
  })

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicine-prescriptions/'
      )

      setPrescriptions(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const startEdit = (prescription) => {
    setEditingId(prescription.id)
    setEditForm({
      dosage: prescription.dosage || '',
      frequency: prescription.frequency || '',
      duration: prescription.duration || '',
      quantity: prescription.quantity || '',
      is_active: prescription.is_active
    })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const saveEdit = async () => {
    await axios.put(`http://127.0.0.1:8000/api/medicine-prescriptions/${editingId}/`, editForm)
    setEditingId(null)
    fetchPrescriptions()
  }

  const filteredPrescriptions = prescriptions.filter((prescription) => matchesSearch(prescription, searchTerm))

  return (

    <div>

      <h2 className="mb-4">
        Medicine Prescriptions
      </h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search medicine prescriptions"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <input className="form-control" name="dosage" value={editForm.dosage} onChange={handleEditChange} placeholder="Dosage" />
              </div>
              <div className="col-md-3">
                <input className="form-control" name="frequency" value={editForm.frequency} onChange={handleEditChange} placeholder="Frequency" />
              </div>
              <div className="col-md-3">
                <input className="form-control" name="duration" value={editForm.duration} onChange={handleEditChange} placeholder="Duration" />
              </div>
              <div className="col-md-1">
                <input className="form-control" type="number" name="quantity" value={editForm.quantity} onChange={handleEditChange} placeholder="Qty" />
              </div>
              <div className="col-md-1">
                <label className="d-block">
                  <input type="checkbox" name="is_active" checked={editForm.is_active} onChange={handleEditChange} /> Active
                </label>
              </div>
              <div className="col-md-1 text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => setEditingId(null)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={saveEdit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredPrescriptions.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>No medicine prescriptions found.</td>
            </tr>
          ) : filteredPrescriptions.map((prescription) => (

            <tr key={prescription.id}>

              <td>{prescription.id}</td>

              <td>
                {prescription.patient_name}
              </td>

              <td>
                {prescription.doctor_name}
              </td>

              <td>
                {prescription.medicine_name}
              </td>

              <td>
                {prescription.dosage}
              </td>

              <td>
                {prescription.frequency}
              </td>

              <td>
                {prescription.duration}
              </td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(prescription)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default MedicinePrescriptions