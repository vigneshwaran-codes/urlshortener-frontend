import React, { useEffect } from 'react'
import axios from 'axios'

function Redirect (props) {
  const authToken = window.localStorage.getItem('auth-key')
  const instance = axios.create({
    baseURL: 'https://server-urlshortener.herokuapp.com',
    headers: {
      'auth-token': authToken
    }
  })

  useEffect(() => {
    async function Short () {
      try {
        const res = await instance.get(`/redirect/${props.match.params.id}`)
          .then(res => window.location.replace(res.data)).catch(err => { console.log(err) })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }

    Short()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h4>Loading...</h4>
    </>
  )
}

export default Redirect
