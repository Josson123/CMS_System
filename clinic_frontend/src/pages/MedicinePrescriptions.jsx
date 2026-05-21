import { useEffect, useState } from 'react'
import axios from 'axios'

function MedicinePrescriptions() {

  const [prescriptions, setPrescriptions] = useState([])

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicine-prescriptions/'
      )

      setPrescriptions(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <h2 className="mb-4">
        Medicine Prescriptions
      </h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Duration</th>
          </tr>

        </thead>

        <tbody>

          {prescriptions.map((prescription) => (

            <tr key={prescription.id}>

              <td>{prescription.id}</td>

              <td>
                {prescription.patient_name}
              </td>

              <td>
                {prescription.doctor_name}
              </td>

              <td>
                {prescription.medicine_name}
              </td>

              <td>
                {prescription.dosage}
              </td>

              <td>
                {prescription.duration}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default MedicinePrescriptions