import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import AddPatient from './pages/AddPatient'
import Appointments from './pages/Appointments'
import AddAppointment from './pages/AddAppointment'
import Consultations from './pages/Consultations'
import AddConsultation from './pages/AddConsultation'
import Medicines from './pages/Medicines'
import MedicineStocks from './pages/MedicineStocks'
import MedicinePrescriptions from './pages/MedicinePrescriptions'
import AddMedicinePrescription from './pages/AddMedicinePrescription'
import LabTests from './pages/LabTests'
import LabTestCategories from './pages/LabTestCategories'
import AddLabTest from './pages/AddLabTest'
import LabPrescriptions from './pages/LabPrescriptions'
import AddLabPrescription from './pages/AddLabPrescription'
import UpdateLabResult from './pages/UpdateLabResult'
import Bills from './pages/Bills'
import AddBill from './pages/AddBill'
import DispenseMedicine from './pages/DispenseMedicine'
import AddMedicineStock from './pages/AddMedicineStock'
import AdminStaffManagement from './pages/AdminStaffManagement'
import AdminDoctorManagement from './pages/AdminDoctorManagement'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="app-shell">
          <Sidebar />

          <div className="workspace-shell">
            <TopNavbar />

            <main className="workspace-main">
              <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/patients"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                    <Patients />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-patient"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                    <AddPatient />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/appointments"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Doctor', 'Administrator']}>
                    <Appointments />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-appointment"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                    <AddAppointment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bills"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                    <Bills />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-bill"
                element={
                  <ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}>
                    <AddBill />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/consultations"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Administrator']}>
                    <Consultations />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-consultation"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Administrator']}>
                    <AddConsultation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/medicines"
                element={
                  <ProtectedRoute allowedRoles={['Pharmacist', 'Administrator']}>
                    <Medicines />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/medicine-stocks"
                element={
                  <ProtectedRoute allowedRoles={['Pharmacist', 'Administrator']}>
                    <MedicineStocks />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-medicine-stock"
                element={
                  <ProtectedRoute allowedRoles={['Pharmacist', 'Administrator']}>
                    <AddMedicineStock />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/medicine-prescriptions"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Pharmacist', 'Administrator']}>
                    <MedicinePrescriptions />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-medicine-prescription"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Administrator']}>
                    <AddMedicinePrescription />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/labtests"
                element={
                  <ProtectedRoute allowedRoles={['Lab Technician', 'Administrator']}>
                    <LabTests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/lab-test-categories"
                element={
                  <ProtectedRoute allowedRoles={['Lab Technician', 'Administrator']}>
                    <LabTestCategories />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-lab-test"
                element={
                  <ProtectedRoute allowedRoles={['Lab Technician', 'Administrator']}>
                    <AddLabTest />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/lab-prescriptions"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Lab Technician', 'Administrator']}>
                    <LabPrescriptions />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-lab-prescription"
                element={
                  <ProtectedRoute allowedRoles={['Doctor', 'Administrator']}>
                    <AddLabPrescription />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/update-lab-result"
                element={
                  <ProtectedRoute allowedRoles={['Lab Technician', 'Administrator']}>
                    <UpdateLabResult />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dispense-medicine"
                element={
                  <ProtectedRoute allowedRoles={['Pharmacist', 'Administrator']}>
                    <DispenseMedicine />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/staff"
                element={
                  <ProtectedRoute allowedRoles={['Administrator']}>
                    <AdminStaffManagement />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/doctors"
                element={
                  <ProtectedRoute allowedRoles={['Administrator']}>
                    <AdminDoctorManagement />
                  </ProtectedRoute>
                }
              />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App