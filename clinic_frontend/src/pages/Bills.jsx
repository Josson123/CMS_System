import { useEffect, useState } from 'react'
import axios from 'axios'

function Bills() {

  const [bills, setBills] = useState([])

  useEffect(() => {
    fetchBills()
  }, [])

  const fetchBills = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/bills/'
      )

      setBills(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <h2 className="mb-4">
        Consultation Bills
      </h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Consultation Fee</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
          </tr>

        </thead>

        <tbody>

          {bills.map((bill) => (

            <tr key={bill.id}>

              <td>{bill.id}</td>

              <td>{bill.patient_name}</td>

              <td>{bill.doctor_name}</td>

              <td>{bill.consultation_fee}</td>

              <td>{bill.total_amount}</td>

              <td>{bill.payment_status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Bills