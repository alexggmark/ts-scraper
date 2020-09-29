import React from 'react'
import LoadingCounter from './LoadingCounter'
// CommonJS to allows image import more easily
const loader = require('../public/loader.gif')

const Loading = () => {
  return (
    <div className="loading-trans">
      <img className="loading-trans__image w-16" src={loader.default} />
      <LoadingCounter />
      <div className="loading-trans__shape"></div>
      <div className="loading-trans__shape-background"></div>
    </div>
  )
}

export default Loading