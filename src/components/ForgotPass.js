import React, { useContext } from 'react'
import axios from 'axios'
import '../styles/login.css'
import Message from './Message'
import { UrlContext } from '../contexts/Context'
import { useHistory } from 'react-router-dom'

function ForgotPass () {
  const { name, setName, popup, setPopUp, setResult } = useContext(UrlContext)

  const history = useHistory()
  // Reset the password
  const resetPassword = async () => {
    try {
      const res = await axios.post('https://server-urlshortener.herokuapp.com/reset-password', {
        email: name
      })
      setResult(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // handle any Change
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'userName':
        setName(e.target.value)
        break;

      default:
        break;
    }
  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    resetPassword()
    setPopUp(!popup)
  }
  return (
    <>
      <div className='containers'>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div className='titles'>
              <p className='welcome'> Reset your password</p>
            </div>

            <input
              className='form-control text'
              type='email'
              value={name}
              name='userName'
              placeholder='Enter your mail'
              required
              onChange={handleChange}
            />
            <br />
            <button
              type='submit'
              className='btn-lg btn-block btn btn-primary btns'
            >
              Send
            </button>
            <br />
            <p className='link link-btn' onClick={() => history.push('/')}>Back to Login</p>
          </form>
        </div>
      </div>
      {popup === true ? <Message /> : null}
    </>
  )
}

export default ForgotPass
