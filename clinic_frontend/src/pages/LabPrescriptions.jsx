import { useEffect, useState } from 'react'
import axios from 'axios'

function LabPrescriptions() {

  const [prescriptions, setPrescriptions] = useState([])

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

  return (
    <div>
      <h2 className="mb-4">Lab Test Prescriptions</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Lab Test</th>
            <th>Result</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {prescriptions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.patient_name}</td>
              <td>{item.doctor_name}</td>
              <td>{item.lab_test_name}</td>
              <td>{item.lab_test_value}</td>
              <td>{item.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LabPrescriptions