import { Link } from 'react-router-dom'

function Dashboard() {

  const user = JSON.parse(localStorage.getItem('user'))

  const role = user?.role

  return (

    <div>

      <h2 className="mb-4">
        Clinic Management Dashboard
      </h2>

      <div className="row g-4 dashboard-grid">

        {(role === 'Receptionist' || role === 'Administrator') && (
          <>
            <div className="col-md-3">
              <div className="dashboard-tile tile-reception">
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
              <div className="dashboard-tile tile-reception">
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
              <div className="dashboard-tile tile-reception">
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
              <div className="dashboard-tile tile-doctor">
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
              <div className="dashboard-tile tile-doctor">
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
              <div className="dashboard-tile tile-doctor">
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
              <div className="dashboard-tile tile-pharmacy">
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
              <div className="dashboard-tile tile-pharmacy">
                <h5>Medicine Stock</h5>

                <Link
                  to="/medicine-stocks"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-tile tile-pharmacy">
                <h5>Add Stock</h5>

                <Link
                  to="/add-medicine-stock"
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
              <div className="dashboard-tile tile-lab">
                <h5>Lab Tests</h5>

                <Link
                  to="/labtests"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-tile tile-lab">
                <h5>Lab Categories</h5>

                <Link
                  to="/lab-test-categories"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-tile tile-lab">
                <h5>Add Lab Test</h5>

                <Link
                  to="/add-lab-test"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>
          </>
        )}

        {role === 'Administrator' && (
          <>
            <div className="col-md-3">
              <div className="dashboard-tile tile-admin">
                <h5>Manage Staff</h5>

                <Link
                  to="/admin/staff"
                  className="btn btn-primary mt-2"
                >
                  Open
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="dashboard-tile tile-admin">
                <h5>Manage Doctors</h5>

                <Link
                  to="/admin/doctors"
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