import { Link, useLocation, useNavigate } from 'react-router-dom'

const titleMap = [
  { path: '/', title: 'Dashboard' },
  { path: '/patients', title: 'Patients' },
  { path: '/appointments', title: 'Appointments' },
  { path: '/consultations', title: 'Consultations' },
  { path: '/medicines', title: 'Medicines' },
  { path: '/medicine-stocks', title: 'Medicine Stock' },
  { path: '/medicine-prescriptions', title: 'Medicine Prescriptions' },
  { path: '/labtests', title: 'Lab Tests' },
  { path: '/lab-test-categories', title: 'Lab Test Categories' },
  { path: '/lab-prescriptions', title: 'Lab Prescriptions' },
  { path: '/bills', title: 'Billing' },
  { path: '/admin/staff', title: 'Manage Staff' },
  { path: '/admin/doctors', title: 'Manage Doctors' }
]

function TopNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))

  const activeTitle =
    titleMap.find((item) => location.pathname === item.path) ||
    titleMap.find((item) => location.pathname.startsWith(item.path)) ||
    titleMap[0]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }

  return (
    <header className="app-navbar">
      <div className="navbar-brand-wrap">
        <Link to="/" className="navbar-brand-link">
          <span className="brand-mark">C</span>
          <span>
            <span className="brand-name">Clinic CMS</span>
            <span className="brand-subtitle">{activeTitle.title}</span>
          </span>
        </Link>

        <span className="navbar-date">{today}</span>
      </div>

      <div className="navbar-user-wrap">
        <div className="navbar-user-card">
          <span className="navbar-user-role">{user?.role}</span>
          <strong>{user?.full_name}</strong>
        </div>

        <button className="btn btn-danger navbar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default TopNavbar