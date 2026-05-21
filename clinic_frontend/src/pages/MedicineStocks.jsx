import { useEffect, useState } from 'react'
import axios from 'axios'

function MedicineStocks() {

  const [stocks, setStocks] = useState([])

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {

    try {

      const response = await axios.get(
        'http://127.0.0.1:8000/api/medicine-stocks/'
      )

      setStocks(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <h2 className="mb-4">Medicine Stock</h2>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Stock In Hand</th>
            <th>Reorder Level</th>
            <th>Purchase</th>
            <th>Issuance</th>
          </tr>
        </thead>

        <tbody>

          {stocks.map((stock) => (

            <tr key={stock.id}>

              <td>{stock.id}</td>

              <td>{stock.medicine_name}</td>

              <td>{stock.stock_in_hand}</td>

              <td>{stock.reorder_level}</td>

              <td>{stock.purchase}</td>

              <td>{stock.issuance}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default MedicineStocks