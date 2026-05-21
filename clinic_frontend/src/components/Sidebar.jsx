import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: '250px',
        minHeight: '100vh'
      }}
    >
      <h4 className="mb-4">Clinic CMS</h4>

      <p>
        Welcome,<br />
        <strong>{user?.full_name}</strong>
      </p>

      <hr />

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>
        </li>

        {(role === 'Receptionist' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/patients">
                Patients
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-patient">
                Add Patient
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/appointments">
                Appointments
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-appointment">
                Add Appointment
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/bills">
                Billing
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-bill">
                Add Bill
              </Link>
            </li>
          </>
        )}

        {(role === 'Doctor' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/appointments">
                My Appointments
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/consultations">
                Consultations
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-consultation">
                Add Consultation
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/medicine-prescriptions">
                Medicine Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-medicine-prescription">
                Add Medicine Prescription
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/lab-prescriptions">
                Lab Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/add-lab-prescription">
                Add Lab Prescription
              </Link>
            </li>
          </>
        )}

        {(role === 'Pharmacist' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/medicines">
                Medicines
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/medicine-stocks">
                Medicine Stock
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/medicine-prescriptions">
                Medicine Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/dispense-medicine">
                Dispense Medicine
              </Link>
            </li>
          </>
        )}

        {(role === 'Lab Technician' || role === 'Administrator') && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/labtests">
                Lab Tests
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/lab-prescriptions">
                Lab Prescriptions
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/update-lab-result">
                Update Lab Result
              </Link>
            </li>
          </>
        )}
      </ul>

      <button
        className="btn btn-danger mt-4 w-100"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar