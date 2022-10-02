import React, { useContext } from 'react'
import axios from 'axios'
import { UrlContext } from '../contexts/Context'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import App from '../components/App'

function Login () {
  const {
    name,
    setName,
    password,
    setPassword,
    result,
    setResult,
    popup,
    setPopUp
  } = useContext(UrlContext)
  // Login
  const getData = async () => {
    try {
      const res = await axios.post('https://server-urlshortener.herokuapp.com/user/login', {
        email: name,
        password: password
      })
      setResult(res.data)
      window.localStorage.setItem('auth-key', res.data.authToken)
    } catch (err) {
      console.log(err)
    }
  }

  // handle Change
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'userName': {
        setName(e.target.value)
        break;
      }
      case 'password': {
        setPassword(e.target.value)
        break;
      }
      default: {
        break;
      }
    }
  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    getData()
    setPopUp(!popup)
  }
  return (
    <>
      {
      result.length === 0
        ? (
          <div className='containers'>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <div className='titles'>
                  <p className='welcome'>Please Login to use shortener</p>
                </div>

                <input
                  className='form-control text'
                  type='email'
                  value={name}
                  name='userName'
                  placeholder='Enter your email'
                  required
                  onchange={handleChange}
                />
                <br />
                <input
                  className='form-control text'
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Enter your password'
                  required
                  onChange={handleChange}
                />
                <br />
                <button
                  type='submit'
                  className='btn-lg btn-block btn btn-primary buttons'
                >
                  Login
                </button>
                <hr />
                <div className='resetDiv'>
                  <Link
                    to='/forgot-password'
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    Forgot Password ? {' '}
                  </Link>
                  <br />
                  <p className='mb-2 p-2'>Don't have an account ?</p>
                  <Link to='/register' style={{ marginBottom: '0' }}>
                    SignUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
          )
        : result.length !== 0 && result.message === 'Logged in Successfully'
          ? (
            <App />
            )
          : (
            <Message />
            )}
    </>
  )
}

export default Login
