import { useContext } from 'react'
import '../styles/message.css'
import { UrlContext } from '../contexts/Context'
import { Link } from 'react-router-dom'

function Message () {
  const { result, setResult, popup, setPopUp } = useContext(UrlContext)
  const { setName } = useContext(UrlContext)
  const { setPassword } = useContext(UrlContext)

  return (
    <div className='parentdiv'>
      <div className='child'>
        {result.message
          ? (
            <h3 style={{ color: 'green' }}>{result.message}</h3>
            )
          : (
            <h3 style={{ color: 'rgb(231, 230, 230' }}>Loading...</h3>
            )}
        <Link to='/'>
          <button
            className='btn btn-primary btn-sm'
            style={{ marginTop: '25px', padding: '4px 15px' }}
            onClick={() => {
              setPopUp(!popup)
              setName('')
              setPassword('')
              setResult('')
            }}
          >
            OK
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Message
