import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { matchesSearch } from '../utils/search'

function LabPrescriptions() {

  const [prescriptions, setPrescriptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      let url = 'http://127.0.0.1:8000/api/labtest-prescriptions/'

      if (user.role === 'Doctor' && user.doctor_id) {
        url = `http://127.0.0.1:8000/api/labtest-prescriptions/?doctor_id=${user.doctor_id}`
      }

      const response = await axios.get(url)

      setPrescriptions(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const filteredPrescriptions = prescriptions.filter((item) => matchesSearch(item, searchTerm))

  const editResult = (id) => {
    localStorage.setItem('labPrescriptionEditId', String(id))
    navigate('/update-lab-result')
  }

  return (
    <div>
      <h2 className="mb-4">Lab Test Prescriptions</h2>

      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={() => setSearchTerm(searchInput)}
        onClear={() => {
          setSearchInput('')
          setSearchTerm('')
        }}
        placeholder="Search prescriptions"
      />

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Lab Test</th>
            <th>Result</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPrescriptions.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={6}>No lab prescriptions found.</td>
            </tr>
          ) : filteredPrescriptions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.patient_name}</td>
              <td>{item.doctor_name}</td>
              <td>{item.lab_test_name}</td>
              <td>{item.lab_test_value}</td>
              <td>{item.remarks}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => editResult(item.id)}>Edit Result</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LabPrescriptions