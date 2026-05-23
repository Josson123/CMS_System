import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function LabTests() {

  const [labtests, setLabtests] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [editingId, setEditingId] = useState(null)

  const [editForm, setEditForm] = useState({
    test_name: '',
    amount: '',
    reference_min_range: '',
    reference_max_range: '',
    sample_required: '',
    is_active: true
  })

  useEffect(() => {
    fetchLabTests()
  }, [])

  const fetchLabTests = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/labtests/'
      )

      setLabtests(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const filteredLabTests = labtests.filter((labtest) => matchesSearch(labtest, searchTerm))

  const startEdit = (labtest) => {
    setEditingId(labtest.id)
    setEditForm({
      test_name: labtest.test_name,
      amount: labtest.amount,
      reference_min_range: labtest.reference_min_range || '',
      reference_max_range: labtest.reference_max_range || '',
      sample_required: labtest.sample_required,
      is_active: labtest.is_active
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
    try {
      await axios.put(`http://127.0.0.1:8000/api/labtests/${editingId}/`, editForm)
      setEditingId(null)
      fetchLabTests()
    } catch (error) {
      alert(JSON.stringify(error.response?.data || error.message))
    }
  }

  const deleteLabTest = async (id) => {
    if (!window.confirm('Delete this lab test?')) {
      return
    }

    await axios.delete(`http://127.0.0.1:8000/api/labtests/${id}/`)
    fetchLabTests()
  }

  return (

    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Lab Tests</h2>
        <a className="btn btn-primary" href="/add-lab-test">Add Lab Category/Test</a>
      </div>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search lab tests"
      />

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Category</th>
            <th>Safe Range</th>
            <th>Amount</th>
            <th>Sample Required</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredLabTests.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={8}>No lab tests found.</td>
            </tr>
          ) : filteredLabTests.map((labtest) => (

            <tr key={labtest.id}>

              <td>{labtest.id}</td>

              <td>
                {editingId === labtest.id ? (
                  <input
                    className="form-control form-control-sm"
                    name="test_name"
                    value={editForm.test_name}
                    onChange={handleEditChange}
                  />
                ) : (
                  labtest.test_name
                )}
              </td>

              <td>{labtest.lab_test_category_name}</td>

              <td>
                {editingId === labtest.id ? (
                  <div className="d-flex">
                    <input
                      className="form-control form-control-sm me-2"
                      name="reference_min_range"
                      value={editForm.reference_min_range}
                      onChange={handleEditChange}
                      placeholder="Min"
                    />
                    <input
                      className="form-control form-control-sm"
                      name="reference_max_range"
                      value={editForm.reference_max_range}
                      onChange={handleEditChange}
                      placeholder="Max"
                    />
                  </div>
                ) : (
                  `${labtest.reference_min_range || '-'} - ${labtest.reference_max_range || '-'}`
                )}
              </td>

              <td>
                {editingId === labtest.id ? (
                  <input
                    className="form-control form-control-sm"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  labtest.amount
                )}
              </td>

              <td>
                {editingId === labtest.id ? (
                  <input
                    className="form-control form-control-sm"
                    name="sample_required"
                    value={editForm.sample_required}
                    onChange={handleEditChange}
                  />
                ) : (
                  labtest.sample_required
                )}
              </td>

              <td>
                {editingId === labtest.id ? (
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={editForm.is_active}
                    onChange={handleEditChange}
                  />
                ) : (
                  labtest.is_active ? 'Active' : 'Inactive'
                )}
              </td>

              <td>
                {editingId === labtest.id ? (
                  <>
                    <button className="btn btn-sm btn-success me-2" onClick={saveEdit}>Save</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(labtest)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteLabTest(labtest.id)}>Delete</button>
                  </>
                )}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default LabTests