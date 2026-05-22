import { useEffect, useState } from 'react'
import axios from 'axios'

function AddLabTest() {

  const [categories, setCategories] = useState([])

  const [categoryForm, setCategoryForm] = useState({
    lab_test_category_name: ''
  })

  const [testForm, setTestForm] = useState({
    test_name: '',
    amount: '',
    reference_min_range: '',
    reference_max_range: '',
    sample_required: '',
    lab_test_category: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/labtest-categories/')
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryChange = (e) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value
    })
  }

  const handleTestChange = (e) => {
    setTestForm({
      ...testForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://127.0.0.1:8000/api/labtest-categories/', categoryForm)
      alert('Lab category added')
      setCategoryForm({ lab_test_category_name: '' })
      await fetchCategories()
    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  const handleTestSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://127.0.0.1:8000/api/labtests/', testForm)
      alert('Lab test added')
      setTestForm({
        test_name: '',
        amount: '',
        reference_min_range: '',
        reference_max_range: '',
        sample_required: '',
        lab_test_category: ''
      })
    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
  }

  return (
    <div>
      <h2 className="mb-4">Manage Lab Tests</h2>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-3">Add Category</h4>

              <form onSubmit={handleCategorySubmit}>
                <div className="mb-3">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="lab_test_category_name"
                    className="form-control"
                    value={categoryForm.lab_test_category_name}
                    onChange={handleCategoryChange}
                    required
                  />
                </div>

                <button className="btn btn-primary" type="submit">Save Category</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-3">Add Lab Test</h4>

              <form onSubmit={handleTestSubmit}>
                <div className="mb-3">
                  <label>Test Name</label>
                  <input
                    type="text"
                    name="test_name"
                    className="form-control"
                    value={testForm.test_name}
                    onChange={handleTestChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      name="amount"
                      className="form-control"
                      value={testForm.amount}
                      onChange={handleTestChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Sample Required</label>
                    <input
                      type="text"
                      name="sample_required"
                      className="form-control"
                      value={testForm.sample_required}
                      onChange={handleTestChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Minimum Safe Range</label>
                    <input
                      type="text"
                      name="reference_min_range"
                      className="form-control"
                      value={testForm.reference_min_range}
                      onChange={handleTestChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Maximum Safe Range</label>
                    <input
                      type="text"
                      name="reference_max_range"
                      className="form-control"
                      value={testForm.reference_max_range}
                      onChange={handleTestChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Category</label>
                  <select
                    name="lab_test_category"
                    className="form-control"
                    value={testForm.lab_test_category}
                    onChange={handleTestChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.lab_test_category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-primary" type="submit">Save Lab Test</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLabTest