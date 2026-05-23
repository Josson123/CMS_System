import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    appointment_date: '',
    consultation_status: 'Scheduled',
    is_active: true
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      let url = 'http://127.0.0.1:8000/api/appointments/'

      if (user.role === 'Doctor' && user.doctor_id) {
        url = `http://127.0.0.1:8000/api/appointments/?doctor_id=${user.doctor_id}`
      }

      const response = await axios.get(url)

      setAppointments(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const startEdit = (appointment) => {
    setEditingId(appointment.id)
    setEditForm({
      appointment_date: appointment.appointment_date || '',
      consultation_status: appointment.consultation_status || 'Scheduled',
      is_active: appointment.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/appointments/${editingId}/`, editForm)
    setEditingId(null)
    fetchAppointments()
  }

  const filteredAppointments = appointments.filter((appointment) => matchesSearch(appointment, searchTerm))

  return (

    <div>

      <h2 className="mb-4">Appointments</h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search appointments"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label>Appointment Date</label>
                <input className="form-control" type="date" name="appointment_date" value={editForm.appointment_date} onChange={handleEditChange} />
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <select className="form-control" name="consultation_status" value={editForm.consultation_status} onChange={handleEditChange}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="d-block">
                  <input type="checkbox" name="is_active" checked={editForm.is_active} onChange={handleEditChange} /> Active
                </label>
              </div>
              <div className="col-md-2 text-end">
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
            <th>Date</th>
            <th>Token</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredAppointments.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>No appointments found.</td>
            </tr>
          ) : filteredAppointments.map((appointment) => (

            <tr key={appointment.id}>

              <td>{appointment.id}</td>

              <td>{appointment.patient_name}</td>

              <td>{appointment.doctor_name}</td>

              <td>{appointment.appointment_date}</td>

              <td>{appointment.token_number}</td>

              <td>{appointment.consultation_status}</td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(appointment)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Appointments