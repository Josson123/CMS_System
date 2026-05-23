import { Link } from 'react-router-dom'

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role

  return (
    <div
      className="cms-sidebar"
    >
      <h4 className="sidebar-title">Clinic CMS</h4>

      <p className="sidebar-user">
        Welcome,<br />
        <strong>{user?.full_name}</strong>
      </p>

      <hr className="sidebar-divider" />

      <ul className="sidebar-nav">
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>

        {(role === 'Receptionist' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/patients">
                Patients
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-patient">
                Add Patient
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/appointments">
                Appointments
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-appointment">
                Add Appointment
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/bills">
                Billing
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-bill">
                Add Bill
              </Link>
            </li>
          </>
        )}

        {(role === 'Doctor' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/appointments">
                My Appointments
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/consultations">
                Consultations
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-consultation">
                Add Consultation
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/medicine-prescriptions">
                Medicine Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-medicine-prescription">
                Add Medicine Prescription
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/lab-prescriptions">
                Lab Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-lab-prescription">
                Add Lab Prescription
              </Link>
            </li>
          </>
        )}

        {(role === 'Pharmacist' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/medicines">
                Medicines
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/medicine-stocks">
                Medicine Stock
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-medicine-stock">
                Add Medicine Stock
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/medicine-prescriptions">
                Medicine Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/dispense-medicine">
                Dispense Medicine
              </Link>
            </li>
          </>
        )}

        {(role === 'Lab Technician' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/labtests">
                Lab Tests
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/lab-test-categories">
                Lab Test Categories
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/add-lab-test">
                Add Lab Test
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/lab-prescriptions">
                Lab Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/update-lab-result">
                Update Lab Result
              </Link>
            </li>
          </>
        )}

        {role === 'Administrator' && (
          <>
            <li className="nav-item mb-2 mt-3">
              <span className="sidebar-section-label">Administration</span>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/admin/staff">
                Manage Staff
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link" to="/admin/doctors">
                Manage Doctors
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="sidebar-footer">
        <strong>Secure access</strong>
        <div>Signed in as {user?.role}</div>
      </div>
    </div>
  )
}

export default Sidebar