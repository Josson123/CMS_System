import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function LabTestCategories() {

  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/labtest-categories/')
    setCategories(response.data)
  }

  const filteredCategories = categories.filter((category) => matchesSearch(category, searchTerm))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      return
    }

    if (editingId) {
      await axios.put(`http://127.0.0.1:8000/api/labtest-categories/${editingId}/`, {
        lab_test_category_name: name
      })
      alert('Category updated')
    } else {
      await axios.post('http://127.0.0.1:8000/api/labtest-categories/', {
        lab_test_category_name: name
      })
      alert('Category added')
    }

    setName('')
    setEditingId(null)
    fetchCategories()
  }

  const startEdit = (category) => {
    setEditingId(category.id)
    setName(category.lab_test_category_name)
  }

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) {
      return
    }

    await axios.delete(`http://127.0.0.1:8000/api/labtest-categories/${id}/`)
    fetchCategories()
  }

  return (
    <div>
      <h2 className="mb-4">Lab Test Categories</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 text-end">
              {editingId && (
                <button type="button" className="btn btn-secondary me-2" onClick={() => {
                  setEditingId(null)
                  setName('')
                }}>
                  Cancel
                </button>
              )}
              <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Add'} Category</button>
            </div>
          </form>
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
        placeholder="Search categories"
      />

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCategories.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={3}>No categories found.</td>
            </tr>
          ) : filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.lab_test_category_name}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(category)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LabTestCategories