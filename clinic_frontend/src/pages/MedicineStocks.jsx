import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function MedicineStocks() {

  const [stocks, setStocks] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    stock_in_hand: '',
    reorder_level: '',
    purchase: '',
    issuance: '',
    is_active: true
  })

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicine-stocks/'
      )

      setStocks(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const startEdit = (stock) => {
    setEditingId(stock.id)
    setEditForm({
      stock_in_hand: stock.stock_in_hand || '',
      reorder_level: stock.reorder_level || '',
      purchase: stock.purchase || '',
      issuance: stock.issuance || '',
      is_active: stock.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/medicine-stocks/${editingId}/`, editForm)
    setEditingId(null)
    fetchStocks()
  }

  const filteredStocks = stocks.filter((stock) => matchesSearch(stock, searchTerm))

  return (

    <div>

      <h2 className="mb-4">Medicine Stock</h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search stock records"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-2">
                <input className="form-control" type="number" name="stock_in_hand" value={editForm.stock_in_hand} onChange={handleEditChange} placeholder="Stock" />
              </div>
              <div className="col-md-2">
                <input className="form-control" type="number" name="reorder_level" value={editForm.reorder_level} onChange={handleEditChange} placeholder="Reorder" />
              </div>
              <div className="col-md-2">
                <input className="form-control" type="number" name="purchase" value={editForm.purchase} onChange={handleEditChange} placeholder="Purchase" />
              </div>
              <div className="col-md-2">
                <input className="form-control" type="number" name="issuance" value={editForm.issuance} onChange={handleEditChange} placeholder="Issuance" />
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
            <th>Medicine</th>
            <th>Stock In Hand</th>
            <th>Reorder Level</th>
            <th>Purchase</th>
            <th>Issuance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredStocks.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>No stock records found.</td>
            </tr>
          ) : filteredStocks.map((stock) => (

            <tr key={stock.id}>

              <td>{stock.id}</td>

              <td>{stock.medicine_name}</td>

              <td>{stock.stock_in_hand}</td>

              <td>{stock.reorder_level}</td>

              <td>{stock.purchase}</td>

              <td>{stock.issuance}</td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(stock)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default MedicineStocks