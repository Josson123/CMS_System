import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        formData
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data)
      )

      alert('Login Successful')

        window.location.href = '/'

    } catch (error) {

      console.log(error.response.data)

      alert('Invalid Username or Password')

    }
  }

  return (

    <div
      className="login-screen"
    >

      <div
        className="card p-4 login-panel"
      >

        <h3 className="mb-4 text-center card-title">
          Clinic CMS Login
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label>Username</label>

            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  )
}

export default Login