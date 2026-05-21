import { useEffect, useState } from 'react'
import axios from 'axios'

function Medicines() {

  const [medicines, setMedicines] = useState([])

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicines/'
      )

      setMedicines(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <h2 className="mb-4">Medicines</h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Medicine Name</th>
            <th>Category</th>
            <th>Manufacturing</th>
            <th>Expiry</th>
            <th>Unit</th>
          </tr>
        </thead>

        <tbody>

          {medicines.map((medicine) => (

            <tr key={medicine.id}>

              <td>{medicine.id}</td>

              <td>{medicine.medicine_name}</td>

              <td>{medicine.medicine_category_name}</td>

              <td>{medicine.manufacturing_date}</td>

              <td>{medicine.expiry_date}</td>

              <td>{medicine.unit}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default Medicines