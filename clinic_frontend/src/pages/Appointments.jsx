import { useEffect, useState } from 'react'
import axios from 'axios'

function Appointments() {

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      let url = 'http://127.0.0.1:8000/api/appointments/'

      if (user.role === 'Doctor' && user.doctor_id) {
        url = `http://127.0.0.1:8000/api/appointments/?doctor_id=${user.doctor_id}`
      }

      const response = await axios.get(url)

      setAppointments(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <h2 className="mb-4">Appointments</h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Token</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr key={appointment.id}>

              <td>{appointment.id}</td>

              <td>{appointment.patient_name}</td>

              <td>{appointment.doctor_name}</td>

              <td>{appointment.appointment_date}</td>

              <td>{appointment.token_number}</td>

              <td>{appointment.consultation_status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Appointments