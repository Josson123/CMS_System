import { useEffect, useState } from 'react'
import axios from 'axios'

function Patients() {

  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/patients/'
      )

      setPatients(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <div>

      <h2 className="mb-4">Patients</h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Membership</th>
          </tr>
        </thead>

        <tbody>

          {patients.map((patient) => (

            <tr key={patient.id}>

              <td>{patient.id}</td>

              <td>{patient.patient_name}</td>

              <td>{patient.gender}</td>

              <td>{patient.mobile_number}</td>

              <td>{patient.address}</td>

              <td>{patient.membership_name}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Patients