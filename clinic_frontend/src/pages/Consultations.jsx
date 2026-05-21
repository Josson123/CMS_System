import { useEffect, useState } from 'react'
import axios from 'axios'

function Consultations() {
  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      let url = 'http://127.0.0.1:8000/api/consultations/'

      if (user.role === 'Doctor' && user.doctor_id) {
        url = `http://127.0.0.1:8000/api/consultations/?doctor_id=${user.doctor_id}`
      }

      const response = await axios.get(url)
      setConsultations(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className="mb-4">Consultations</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Symptoms</th>
            <th>Diagnosis</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{consultation.id}</td>
              <td>{consultation.patient_name}</td>
              <td>{consultation.doctor_name}</td>
              <td>{consultation.symptoms}</td>
              <td>{consultation.diagnosis}</td>
              <td>{consultation.notes}</td>
              <td>{consultation.created_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Consultations