import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function Bills() {

  const [bills, setBills] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    payment_status: 'Pending',
    is_active: true
  })

  useEffect(() => {
    fetchBills()
  }, [])

  const fetchBills = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/bills/'
      )

      setBills(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const startEdit = (bill) => {
    setEditingId(bill.id)
    setEditForm({
      payment_status: bill.payment_status || 'Pending',
      is_active: bill.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/bills/${editingId}/`, editForm)
    setEditingId(null)
    fetchBills()
  }

  const filteredBills = bills.filter((bill) => matchesSearch(bill, searchTerm))

  return (

    <div>

      <h2 className="mb-4">
        Consultation Bills
      </h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search bills"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-6">
                <label>Payment Status</label>
                <select className="form-control" name="payment_status" value={editForm.payment_status} onChange={handleEditChange}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="d-block">
                  <input type="checkbox" name="is_active" checked={editForm.is_active} onChange={handleEditChange} /> Active
                </label>
              </div>
              <div className="col-md-3 text-end">
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
            <th>Consultation Fee</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredBills.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>No bills found.</td>
            </tr>
          ) : filteredBills.map((bill) => (

            <tr key={bill.id}>

              <td>{bill.id}</td>

              <td>{bill.patient_name}</td>

              <td>{bill.doctor_name}</td>

              <td>{bill.consultation_fee}</td>

              <td>{bill.total_amount}</td>

              <td>{bill.payment_status}</td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(bill)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Bills