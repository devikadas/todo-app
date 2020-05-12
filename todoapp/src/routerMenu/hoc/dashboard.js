import React from 'react'

import AccountSettings from './AccountSettings'
import LocationSettings from './LocationSettings'
import PrivacySettings from './PrivacySettings'
import SecuritySettings from './SecuritySettings'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='widget-list'>
          <AccountSettings name="ACCOUNT" />
          <LocationSettings name="LOCATION" />
          <PrivacySettings name="PRIVACY" />
          <SecuritySettings name="SECURITY" />
      </div>
    )
  }
}

export default Dashboard
