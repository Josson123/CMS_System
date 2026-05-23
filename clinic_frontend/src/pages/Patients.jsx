import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function Patients() {

  const [patients, setPatients] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    patient_name: '',
    gender: 'Male',
    mobile_number: '',
    address: '',
    is_active: true
  })

  useEffect(() => {
    fetchPatients()
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

  const startEdit = (patient) => {
    setEditingId(patient.id)
    setEditForm({
      patient_name: patient.patient_name || '',
      gender: patient.gender || 'Male',
      mobile_number: patient.mobile_number || '',
      address: patient.address || '',
      is_active: patient.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/patients/${editingId}/`, editForm)
    setEditingId(null)
    fetchPatients()
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const filteredPatients = patients.filter((patient) => matchesSearch(patient, searchTerm))

  return (
    <div>

      <h2 className="mb-4">Patients</h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search patients"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <input className="form-control" name="patient_name" value={editForm.patient_name} onChange={handleEditChange} placeholder="Patient name" />
              </div>
              <div className="col-md-2">
                <select className="form-control" name="gender" value={editForm.gender} onChange={handleEditChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="col-md-3">
                <input className="form-control" name="mobile_number" value={editForm.mobile_number} onChange={handleEditChange} placeholder="Mobile number" />
              </div>
              <div className="col-md-3">
                <label className="d-block">
                  <input type="checkbox" name="is_active" checked={editForm.is_active} onChange={handleEditChange} /> Active
                </label>
              </div>
              <div className="col-12">
                <textarea className="form-control" name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" />
              </div>
              <div className="col-12 text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={cancelEdit}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Membership</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredPatients.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>No patients found.</td>
            </tr>
          ) : filteredPatients.map((patient) => (

            <tr key={patient.id}>

              <td>{patient.id}</td>

              <td>{patient.patient_name}</td>

              <td>{patient.gender}</td>

              <td>{patient.mobile_number}</td>

              <td>{patient.address}</td>

              <td>{patient.membership_name}</td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(patient)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Patients