import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function AdminStaffManagement() {

  const emptyForm = {
    full_name: '',
    gender: 'Male',
    joining_date: '',
    mobile_number: '',
    username: '',
    password: '',
    role: '',
    is_active: true
  }

  const [roles, setRoles] = useState([])
  const [staffs, setStaffs] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRoles()
    fetchStaffs()
  }, [])

  const fetchRoles = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/roles/')
    setRoles(response.data)
  }

  const fetchStaffs = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setStaffs(response.data)
  }

  const filteredStaffs = staffs.filter((staff) => matchesSearch(staff, searchTerm))

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/staff/${editingId}/`, formData)
        alert('Staff updated')
      } else {
        await axios.post('http://127.0.0.1:8000/api/staff/', formData)
        alert('Staff created')
      }

      resetForm()
      fetchStaffs()
    } catch (error) {
      alert(JSON.stringify(error.response?.data || error.message))
    }
  }

  const startEdit = (staff) => {
    setEditingId(staff.id)
    setFormData({
      full_name: staff.full_name,
      gender: staff.gender,
      joining_date: staff.joining_date,
      mobile_number: staff.mobile_number,
      username: staff.username,
      password: staff.password,
      role: staff.role,
      is_active: staff.is_active
    })
  }

  const deleteStaff = async (id) => {
    if (!window.confirm('Delete this staff account?')) {
      return
    }

    await axios.delete(`http://127.0.0.1:8000/api/staff/${id}/`)
    fetchStaffs()
  }

  return (
    <div>
      <h2 className="mb-4">Admin: Staff Accounts</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Update Staff' : 'Create Staff'}</h5>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Full Name</label>
                <input className="form-control" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>

              <div className="col-md-3 mb-3">
                <label>Gender</label>
                <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Joining Date</label>
                <input className="form-control" type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Mobile Number</label>
                <input className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
              </div>

              <div className="col-md-4 mb-3">
                <label>Username</label>
                <input className="form-control" name="username" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="col-md-4 mb-3">
                <label>Password</label>
                <input className="form-control" name="password" value={formData.password} onChange={handleChange} required />
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-4 mb-3">
                <label>Role</label>
                <select className="form-control" name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.role_name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="d-block">Active</label>
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
              </div>

              <div className="col-md-5 mb-3 text-end">
                {editingId && (
                  <button type="button" className="btn btn-secondary me-2" onClick={resetForm}>Cancel</button>
                )}
                <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Create'} Staff</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Staff List</h5>

          <SearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSubmit={() => setSearchTerm(searchInput)}
            onClear={() => {
              setSearchInput('')
              setSearchTerm('')
            }}
            placeholder="Search staff"
          />

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Username</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStaffs.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan={7}>No staff accounts found.</td>
                </tr>
              ) : filteredStaffs.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td>{staff.full_name}</td>
                  <td>{staff.role_name}</td>
                  <td>{staff.username}</td>
                  <td>{staff.mobile_number}</td>
                  <td>{staff.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(staff)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteStaff(staff.id)}>Delete</button>
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

export default AdminStaffManagement