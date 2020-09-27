import React from 'react'
const logoBbc = require('../public/logo-bbc.png')
const logoGuardian = require('../public/logo-guardian.png')
import '../tailwind.output.css'

interface LogoProps {
  route: string
}

const LogoDisplay = (props: LogoProps) => {
  const switcher = (): string => {
    switch (props.route) {
      case '/bbc':
        return logoBbc.default
      case '/guardian':
        return logoGuardian.default
      default:
        return 'test'
    }
  }
  return (
    <>
      <img
        className="h-full"
        src={switcher()}
      />
    </>
  )
}

export default LogoDisplay