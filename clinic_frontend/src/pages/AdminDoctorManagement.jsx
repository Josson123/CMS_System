import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminDoctorManagement() {

  const emptyForm = {
    staff: '',
    consultation_fee: '',
    specialization: '',
    is_active: true
  }

  const [staffOptions, setStaffOptions] = useState([])
  const [specializations, setSpecializations] = useState([])
  const [doctors, setDoctors] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [specializationName, setSpecializationName] = useState('')

  useEffect(() => {
    fetchStaffOptions()
    fetchSpecializations()
    fetchDoctors()
  }, [])

  const fetchStaffOptions = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/?role=Doctor')
    setStaffOptions(response.data)
  }

  const fetchSpecializations = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/specializations/')
    setSpecializations(response.data)
  }

  const fetchDoctors = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/doctors/')
    setDoctors(response.data)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  const createSpecialization = async (e) => {
    e.preventDefault()

    if (!specializationName.trim()) {
      return
    }

    await axios.post('http://127.0.0.1:8000/api/specializations/', {
      specialization_name: specializationName
    })

    setSpecializationName('')
    fetchSpecializations()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/doctors/${editingId}/`, formData)
        alert('Doctor updated')
      } else {
        await axios.post('http://127.0.0.1:8000/api/doctors/', formData)
        alert('Doctor created')
      }

      resetForm()
      fetchDoctors()
    } catch (error) {
      alert(JSON.stringify(error.response?.data || error.message))
    }
  }

  const startEdit = (doctor) => {
    setEditingId(doctor.id)
    setFormData({
      staff: doctor.staff,
      consultation_fee: doctor.consultation_fee,
      specialization: doctor.specialization,
      is_active: doctor.is_active
    })
  }

  const deleteDoctor = async (id) => {
    if (!window.confirm('Delete this doctor profile?')) {
      return
    }

    await axios.delete(`http://127.0.0.1:8000/api/doctors/${id}/`)
    fetchDoctors()
  }

  return (
    <div>
      <h2 className="mb-4">Admin: Doctors</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add Specialization</h5>

          <form className="row g-2" onSubmit={createSpecialization}>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Specialization Name"
                value={specializationName}
                onChange={(e) => setSpecializationName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <button className="btn btn-outline-primary w-100" type="submit">Save Specialization</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Update Doctor' : 'Create Doctor'}</h5>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Staff (Doctor Role)</label>
                <select className="form-control" name="staff" value={formData.staff} onChange={handleChange} required>
                  <option value="">Select Staff</option>
                  {staffOptions.map((staff) => (
                    <option key={staff.id} value={staff.id}>{staff.full_name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>Specialization</label>
                <select className="form-control" name="specialization" value={formData.specialization} onChange={handleChange} required>
                  <option value="">Select Specialization</option>
                  {specializations.map((specialization) => (
                    <option key={specialization.id} value={specialization.id}>
                      {specialization.specialization_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>Consultation Fee</label>
                <input
                  className="form-control"
                  type="number"
                  step="0.01"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <label>
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} /> Active
              </label>

              <div>
                {editingId && (
                  <button type="button" className="btn btn-secondary me-2" onClick={resetForm}>Cancel</button>
                )}
                <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Create'} Doctor</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Doctor Profiles</h5>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Consultation Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.staff_name}</td>
                  <td>{doctor.specialization_name}</td>
                  <td>{doctor.consultation_fee}</td>
                  <td>{doctor.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(doctor)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteDoctor(doctor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDoctorManagement