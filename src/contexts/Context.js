import React, { useState } from 'react'
export const UrlContext = React.createContext()

export const ContextProvider = (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState([])
  const [popup, setPopUp] = useState(false)
  return (
    <UrlContext.Provider
      value={{
        name, setName, password, setPassword, result, setResult, popup, setPopUp
      }}
    >
      {props.children}
    </UrlContext.Provider>
  )
}
