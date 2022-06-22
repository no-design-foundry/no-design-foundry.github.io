import React from 'react'
import { Link } from 'react-router-dom'

function Index(props) {
  const {data} = props
  return (
   <div>{data.map(entry => <Link to={entry.route}><h1>{entry.title}</h1></Link>)}</div>
  )
}

export default Index