import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function Medicines() {

  const [medicines, setMedicines] = useState([])
  const [categories, setCategories] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [medicineForm, setMedicineForm] = useState({
    medicine_name: '',
    manufacturing_date: '',
    expiry_date: '',
    unit: '',
    price: '',
    medicine_category: '',
    is_active: true
  })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    medicine_name: '',
    manufacturing_date: '',
    expiry_date: '',
    unit: '',
    price: '',
    medicine_category: '',
    is_active: true
  })

  useEffect(() => {
    fetchCategories()
    fetchMedicines()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/medicine-categories/')
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMedicines = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicines/'
      )

      setMedicines(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const handleMedicineChange = (e) => {
    const { name, value, type, checked } = e.target
    setMedicineForm({
      ...medicineForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()

    if (!categoryName.trim()) {
      return
    }

    await axios.post('http://127.0.0.1:8000/api/medicine-categories/', {
      medicine_category_name: categoryName
    })

    setCategoryName('')
    fetchCategories()
  }

  const handleMedicineSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://127.0.0.1:8000/api/medicines/', medicineForm)

    setMedicineForm({
      medicine_name: '',
      manufacturing_date: '',
      expiry_date: '',
      unit: '',
      price: '',
      medicine_category: '',
      is_active: true
    })

    fetchMedicines()
  }

  const startEdit = (medicine) => {
    setEditingId(medicine.id)
    setEditForm({
      medicine_name: medicine.medicine_name || '',
      manufacturing_date: medicine.manufacturing_date || '',
      expiry_date: medicine.expiry_date || '',
      unit: medicine.unit || '',
      price: medicine.price || '',
      medicine_category: medicine.medicine_category || '',
      is_active: medicine.is_active
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
    await axios.put(`http://127.0.0.1:8000/api/medicines/${editingId}/`, editForm)
    setEditingId(null)
    fetchMedicines()
  }

  const filteredMedicines = medicines.filter((medicine) => matchesSearch(medicine, searchTerm))

  return (

    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Medicines</h2>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="card-title mb-3">Add Medicine Category</h5>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary w-100" type="submit">Save Category</button>
              </form>
            </div>

            <div className="col-lg-8">
              <h5 className="card-title mb-3">Add Medicine</h5>
              <form onSubmit={handleMedicineSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <input className="form-control" name="medicine_name" value={medicineForm.medicine_name} onChange={handleMedicineChange} placeholder="Medicine name" required />
                  </div>
                  <div className="col-md-4">
                    <select className="form-control" name="medicine_category" value={medicineForm.medicine_category} onChange={handleMedicineChange} required>
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.medicine_category_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <input className="form-control" type="date" name="manufacturing_date" value={medicineForm.manufacturing_date} onChange={handleMedicineChange} required />
                  </div>
                  <div className="col-md-2">
                    <input className="form-control" type="date" name="expiry_date" value={medicineForm.expiry_date} onChange={handleMedicineChange} required />
                  </div>
                  <div className="col-md-3">
                    <input className="form-control" name="unit" value={medicineForm.unit} onChange={handleMedicineChange} placeholder="Unit" required />
                  </div>
                  <div className="col-md-3">
                    <input className="form-control" type="number" step="0.01" name="price" value={medicineForm.price} onChange={handleMedicineChange} placeholder="Price" required />
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <label className="mb-0">
                      <input type="checkbox" name="is_active" checked={medicineForm.is_active} onChange={handleMedicineChange} /> Active
                    </label>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-primary w-100" type="submit">Add Medicine</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search medicines"
      />

      {editingId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <input className="form-control" name="medicine_name" value={editForm.medicine_name} onChange={handleEditChange} placeholder="Medicine name" />
              </div>
              <div className="col-md-4">
                <select className="form-control" name="medicine_category" value={editForm.medicine_category} onChange={handleEditChange}>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.medicine_category_name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <input className="form-control" type="date" name="manufacturing_date" value={editForm.manufacturing_date} onChange={handleEditChange} />
              </div>
              <div className="col-md-2">
                <input className="form-control" type="date" name="expiry_date" value={editForm.expiry_date} onChange={handleEditChange} />
              </div>
              <div className="col-md-2">
                <input className="form-control" name="unit" value={editForm.unit} onChange={handleEditChange} placeholder="Unit" />
              </div>
              <div className="col-md-2">
                <input className="form-control" type="number" step="0.01" name="price" value={editForm.price} onChange={handleEditChange} placeholder="Price" />
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
            <th>Medicine Name</th>
            <th>Category</th>
            <th>Manufacturing</th>
            <th>Expiry</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredMedicines.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>No medicines found.</td>
            </tr>
          ) : filteredMedicines.map((medicine) => (

            <tr key={medicine.id}>

              <td>{medicine.id}</td>

              <td>{medicine.medicine_name}</td>

              <td>{medicine.medicine_category_name}</td>

              <td>{medicine.manufacturing_date}</td>

              <td>{medicine.expiry_date}</td>

              <td>{medicine.unit}</td>

              <td>
                <button className="btn btn-sm btn-warning" onClick={() => startEdit(medicine)}>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Medicines