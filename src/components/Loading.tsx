import React from 'react'
// CommonJS to allows image import more easily
const loader = require('../public/loader.gif')

const Loading = () => {
  return (
    <div>
      <img className="w-16" src={loader.default} />
    </div>
  )
}

export default Loading