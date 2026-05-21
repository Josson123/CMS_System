import { Link } from 'react-router-dom'

function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'))

  const role = user?.role

  return (

    <div>

      <h2 className="mb-4">
        Clinic Management Dashboard
      </h2>

      <div className="row g-4">

        {(role === 'Receptionist' || role === 'Administrator') && (
          <>
            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Patients</h5>

                <Link
                  to="/patients"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Appointments</h5>

                <Link
                  to="/appointments"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Billing</h5>

                <Link
                  to="/bills"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>
          </>
        )}

        {(role === 'Doctor' || role === 'Administrator') && (
          <>
            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>My Appointments</h5>

                <Link
                  to="/appointments"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Consultations</h5>

                <Link
                  to="/consultations"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Add Consultation</h5>

                <Link
                  to="/add-consultation"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>
          </>
        )}

        {(role === 'Pharmacist' || role === 'Administrator') && (
          <>
            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Medicines</h5>

                <Link
                  to="/medicines"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Medicine Stock</h5>

                <Link
                  to="/medicine-stocks"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>
          </>
        )}

        {(role === 'Lab Technician' || role === 'Administrator') && (
          <>
            <div className="col-md-3">
              <div className="card p-3 shadow text-center">
                <h5>Lab Tests</h5>

                <Link
                  to="/labtests"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>
          </>
        )}

      </div>

    </div>

  )
}

export default Dashboard