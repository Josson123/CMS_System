import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function Consultations() {
  const [consultations, setConsultations] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    symptoms: '',
    diagnosis: '',
    notes: '',
    is_active: true
  })

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      let url = 'http://127.0.0.1:8000/api/consultations/'

      if (user.role === 'Doctor' && user.doctor_id) {
        url = `http://127.0.0.1:8000/api/consultations/?doctor_id=${user.doctor_id}`
      }

      const response = await axios.get(url)
      setConsultations(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const filteredConsultations = consultations.filter((consultation) => matchesSearch(consultation, searchTerm))

  const startEdit = (consultation) => {
    setEditingId(consultation.id)
    setEditForm({
      symptoms: consultation.symptoms || '',
      diagnosis: consultation.diagnosis || '',
      notes: consultation.notes || '',
      is_active: consultation.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/consultations/${editingId}/`, editForm)
    setEditingId(null)
    fetchConsultations()
  }

  return (
    <div>
      <h2 className="mb-4">Consultations</h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search consultations"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Symptoms</label>
                <textarea className="form-control" name="symptoms" value={editForm.symptoms} onChange={handleEditChange} />
              </div>
              <div className="col-md-6">
                <label>Diagnosis</label>
                <textarea className="form-control" name="diagnosis" value={editForm.diagnosis} onChange={handleEditChange} />
              </div>
              <div className="col-12">
                <label>Notes</label>
                <textarea className="form-control" name="notes" value={editForm.notes} onChange={handleEditChange} />
              </div>
              <div className="col-md-3">
                <label className="d-block">
                  <input type="checkbox" name="is_active" checked={editForm.is_active} onChange={handleEditChange} /> Active
                </label>
              </div>
              <div className="col-md-9 text-end">
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
            <th>Symptoms</th>
            <th>Diagnosis</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredConsultations.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>No consultations found.</td>
            </tr>
          ) : filteredConsultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{consultation.id}</td>
              <td>{consultation.patient_name}</td>
              <td>{consultation.doctor_name}</td>
              <td>{consultation.symptoms}</td>
              <td>{consultation.diagnosis}</td>
              <td>{consultation.notes}</td>
              <td>{consultation.created_date}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(consultation)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Consultations