import React from 'react'

const activate = () => {
  //define the url. since the https version fails
  //sometimes, retry with the http version when 
  //necessary
  return (
    <form>
      <label>Enter the activation code:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default activate