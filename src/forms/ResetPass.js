import React, { useContext, useState } from 'react'
import { UrlContext } from '../contexts/Context'
import axios from 'axios'
import Message from '../components/Message'

function ResetPass (props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { setResult, setPopUp, popup } = useContext(UrlContext)

  // change the password
  const resetPassword = async () => {
    try {
      const res = await axios.post('https://server-urlshortener.herokuapp.com/reset-password', {
        token: props.match.params.id,
        newPassword: password
      })
      setResult(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // handle change

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'createPassword':
        setPassword(e.target.value)
        break;
      case 'reEnterPassword':
        setConfirmPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      resetPassword()
      setPopUp(!popup)
    } else {
      return;
    }
  }

  return (
    <>
      <div className='containers'>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div className='titles'>
              <p className='welcome'> Create new password</p>
            </div>

            <input
              className='form-control text'
              type='password'
              value={password}
              name='createPassword'
              placeholder='Enter new password'
              required
              onChange={handleChange}
            />
            <br />
            <input
              className='form-control text'
              type='password'
              value={confirmPassword}
              name='reEnterPassword'
              placeholder='Re-enter your password'
              onChange={handleChange}
              required
            />
            <br />
            <hr />
            <button
              type='submit'
              className='btn-lg btn-block btn btn-primary btns'
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      {popup === true ? <Message /> : null}
    </>
  )
}

export default ResetPass
