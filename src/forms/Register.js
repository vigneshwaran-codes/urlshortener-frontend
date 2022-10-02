import React, { useState, useContext } from 'react'
import { UrlContext } from '../contexts/Context'
import '../styles/login.css'
import axios from 'axios'
import Message from '../components/Message'
import { useHistory } from 'react-router-dom';

function Register () {
  const {
    name,
    setName,
    password,
    setPassword,
    setResult,
    popup,
    setPopUp
  } = useContext(UrlContext)
  const [firstName, setFirstName] = useState('')

  const history = useHistory()

  // add new user -> DB
  const registerUser = async () => {
    try {
      const res = await axios.post('https://server-urlshortener.herokuapp.com/user/register', {
        email: name,
        password: password,
        name: firstName
      })
      setResult(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // handle Change
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'firstName': {
        setFirstName(e.target.value)
        break;
      }
      case 'userName': {
        setName(e.target.value)
        break;
      }
      case 'password': {
        setPassword(e.target.value)
        break;
      }
      default:
        break
    }
  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
    setPopUp(!popup)
  }

  return (
    <>
      <div className='containers'>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div className='titles'>
              <p className='welcome'> Register </p>
            </div>
            <input
              type='text'
              className='form-control text'
              name='firstName'
              value={firstName}
              placeholder='Enter your first name'
              onChange={handleChange}
              required
            />
            <br />
            <input
              type='email'
              className='form-control text'
              name='email'
              value={name}
              placeholder='Enter your email'
              onChange={handleChange}
              required
            />
            <br />
            <input
              type='password'
              className='form-control text'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleChange}
              required
            />
            <br />
            <button
              className='btn-lg btn-block btn btn-primary btns'
              type='submit'
            >
              Register
            </button>
            <br />
            <p>Already have an account ? {' '}<span className='link link-btn' onClick={() => history.push('/')}>Sign-in</span></p>
          </form>
        </div>
      </div>
      {popup === true ? <Message /> : null}
    </>
  )
}

export default Register
