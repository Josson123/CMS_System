import { useEffect, useState } from 'react'
import axios from 'axios'

function LabTests() {

  const [labtests, setLabtests] = useState([])

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

  return (

    <div>

      <h2 className="mb-4">Lab Tests</h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Sample Required</th>
          </tr>
        </thead>

        <tbody>

          {labtests.map((labtest) => (

            <tr key={labtest.id}>

              <td>{labtest.id}</td>

              <td>{labtest.test_name}</td>

              <td>{labtest.lab_test_category_name}</td>

              <td>{labtest.amount}</td>

              <td>{labtest.sample_required}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default LabTests