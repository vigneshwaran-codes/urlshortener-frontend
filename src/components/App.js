import { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../styles/App.css'

function App () {
  const [longURL, setLongURL] = useState('')
  const [newURL, setNewURL] = useState('')
  const [list, setList] = useState([])
  const [state, setState] = useState(true)

  // setting Token -> Header

  const authToken = window.localStorage.getItem('auth-key')
  const instance = axios.create({
    baseURL: 'https://server-urlshortener.herokuapp.com',
    headers: {
      'auth-token': authToken
    }
  })

  // create new Url
  const generateURL = async () => {
    try {
      const res = await instance.post('/create-url', {
        url: longURL
      })
      setNewURL(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // get api list
  const getList = async () => {
    try {
      const res = await axios.get('https://server-urlshortener.herokuapp.com/getUrls')
      setList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // handle changes in Form

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'longURL':
        setLongURL(e.target.value)
        break

      default:
        break
    }
  }

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    generateURL()
    setLongURL('')
  }

  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 optionCol'>
            <button
              onClick={() => setState(true)}
              className='btn btn-primary btn-block btnss'
            >
              Generate URL
            </button>
            <br />
            <button
              onClick={() => {
                setState(!state)
                getList()
              }}
              className='btn btn-primary btn-block'
            >
              All URLS
            </button>
          </div>
          <div className='col-lg-10 dataCol'>
            <div>
              {state === true
                ? (
                  <form onSubmit={handleSubmit} className='forms'>
                    <p className='title'>URL Shortener</p>
                    <input
                      type='text'
                      className='urlText form-control'
                      name='longURL'
                      placeholder='Enter Url'
                      value={longURL}
                      onChange={handleChange}
                    />
                    <br />
                    <button
                      className='btn btn-primary'
                      type='submit'
                    >
                      Get URL
                    </button>
                    <br />
                    <p style={{ marginTop: '14px' }}>
                      copy and paste the below provided short link in new tab of your browser
                    </p>
                    <p className='link'>{newURL}</p>
                  </form>
                  )
                : (
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        <td>
                          {' '}
                          Use BASE URL :
                          https://server-urlshortener.herokuapp.com/redirect/V2_XCP#OR + {' '}
                          <span
                            style={{ color: 'rgb(0. 138, 192)' }}
                          >
                            Short_id{' '}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>LongURL</td>
                        <td>Short_id for URL</td>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td style={{ color: 'rgb(0,138,192' }}>
                              {item.url}
                            </td>
                            <td style={{ color: 'rgb(0,138,192' }}>
                              {item.shortURL}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
